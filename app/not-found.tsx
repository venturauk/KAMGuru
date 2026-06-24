import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x py-24 text-center">
      <p className="font-display text-7xl font-extrabold text-brand sm:text-8xl">404</p>
      <h1 className="mt-4 text-3xl font-bold text-ink">Page not found</h1>
      <p className="mx-auto mt-3 max-w-md text-ink-soft">
        Sorry, we couldn&apos;t find that page. It may have moved, or the link
        might be out of date.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn">Back to home</Link>
        <Link href="/contact/" className="btn btn-outline">Contact us</Link>
      </div>
      <p className="mt-10 text-sm text-ink-soft">
        Or try{" "}
        <Link href="/services/" className="font-semibold text-brand-dark hover:underline">Services</Link>,{" "}
        <Link href="/resources/" className="font-semibold text-brand-dark hover:underline">Resources</Link>{" "}
        or the{" "}
        <Link href="/podcast/" className="font-semibold text-brand-dark hover:underline">KAMCast podcast</Link>.
      </p>
    </section>
  );
}
