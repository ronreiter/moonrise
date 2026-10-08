import { Pool, type QueryResultRow } from "pg";

declare global {
  var __moonrisePool: Pool | undefined;
}

function getPool(): Pool {
  if (!globalThis.__moonrisePool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL is not set");
    }
    const isLocal = /localhost|127\.0\.0\.1/.test(connectionString);
    globalThis.__moonrisePool = new Pool({
      connectionString,
      ssl: isLocal ? undefined : { rejectUnauthorized: false },
      max: 5,
    });
  }
  return globalThis.__moonrisePool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<T[]> {
  const result = await getPool().query<T>(text, params);
  return result.rows;
}
