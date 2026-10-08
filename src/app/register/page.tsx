import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create an account",
  robots: { index: false },
};

export default function RegisterPage() {
  return (
    <main className="container-x flex min-h-[85svh] items-center justify-center py-36">
      <div className="w-full max-w-sm">
        <p className="label text-stone">New here</p>
        <h1 className="mt-5 font-serif text-4xl font-light leading-tight">
          Create your account.
        </h1>
        <RegisterForm />
      </div>
    </main>
  );
}
