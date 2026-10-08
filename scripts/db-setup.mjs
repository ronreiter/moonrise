import { existsSync, readFileSync } from "node:fs";
import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { promisify } from "node:util";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const scrypt = promisify(scryptCallback);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!match) continue;
    const value = match[2].replace(/^["']|["']$/g, "");
    if (process.env[match[1]] === undefined) process.env[match[1]] = value;
  }
}

loadEnvFile(join(root, ".env.local"));
loadEnvFile(join(root, ".env"));

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is not set — add it to .env.local first.");
  process.exit(1);
}

const client = new pg.Client({ connectionString: databaseUrl });
await client.connect();

await client.query(readFileSync(join(root, "db/schema.sql"), "utf8"));
console.log("Schema applied.");

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

if (adminEmail && adminPassword) {
  const salt = randomBytes(16).toString("hex");
  const hash = (await scrypt(adminPassword, salt, 64)).toString("hex");
  await client.query(
    `insert into users (name, email, password_hash, role)
     values ($1, $2, $3, 'admin')
     on conflict (email) do update
       set password_hash = excluded.password_hash, role = 'admin'`,
    [
      process.env.ADMIN_NAME ?? "Studio admin",
      adminEmail.toLowerCase(),
      `scrypt:${salt}:${hash}`,
    ],
  );
  console.log("Admin user created/updated:", adminEmail);
}

await client.end();
console.log("Done.");
