import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <main className="container-x flex min-h-[85svh] items-center justify-center py-36">
      <div className="w-full max-w-sm">
        <p className="label text-stone">Welcome back</p>
        <h1 className="mt-5 font-serif text-4xl font-light leading-tight">Sign in.</h1>
        <LoginForm />
      </div>
    </main>
  );
}
