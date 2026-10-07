import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-x flex min-h-[75svh] flex-col items-center justify-center py-40 text-center">
      <p className="label text-stone">404</p>
      <h1 className="mt-6 font-serif text-[clamp(2.5rem,6vw,4rem)] font-light leading-tight">
        This page has drifted off.
      </h1>
      <p className="mt-4 text-sm text-stone">The moon moved on — let&rsquo;s get you back.</p>
      <Link
        href="/"
        className="label mt-10 rounded-full border border-ink px-6 py-3.5 text-ink transition-colors hover:bg-ink hover:text-ivory"
      >
        Back home
      </Link>
    </main>
  );
}
