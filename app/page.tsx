import Link from "next/link";
import { getEpisodes } from "@/lib/content";
import { mediaUrl } from "@/lib/media";

const services = [
  {
    title: "Consultancy",
    href: "/services/consultancy/",
    blurb:
      "Strategic guidance to design and embed a key account management approach that fits your business.",
  },
  {
    title: "Coaching",
    href: "/services/coaching/",
    blurb:
      "One-to-one and team coaching to sharpen the skills and confidence of your key account managers.",
  },
  {
    title: "Training",
    href: "/services/training/",
    blurb:
      "Practical, high-energy workshops and programmes that turn KAM theory into everyday habits.",
  },
  {
    title: "Speaking",
    href: "/services/speaking/",
    blurb:
      "Engaging keynotes and sessions on key account management, partnership and sales leadership.",
  },
];

const stats = [
  { num: "30", suffix: "yrs", label: "Key Account Management" },
  { num: "25", suffix: "yrs", label: "Sales Consulting" },
  { num: "80", suffix: "%", label: "of business from your top 20%" },
];

export default function Home() {
  const episodes = getEpisodes();
  const latest = episodes.slice(-3).reverse();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[var(--bg-soft)] to-white">
        <div className="container-x grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-sm font-semibold text-brand-dark">
              Key Account Management experts
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
              Jump ahead of your competitors
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-soft">
              KAMguru helps you develop profitable partnerships with your most
              important customers — often the 20% of customers who produce 80% of
              the business. Stand out from competitors, don&apos;t just stand up
              to them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact/" className="btn">
                Book a discovery call
              </Link>
              <Link href="/services/" className="btn btn-outline">
                Explore our services
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-white p-8 shadow-sm">
            <p className="text-xl font-bold text-ink">
              &ldquo;Look after your most important customers before someone else
              does.&rdquo;
            </p>
            <p className="mt-3 text-ink-soft">
              That&apos;s the first rule of business — and the principle every
              KAMguru engagement is built around. We help you work as an
              exceptional <strong>business partner</strong>, not just an efficient
              supplier.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-extrabold text-brand">
                    {s.num}
                    <span className="text-base">{s.suffix}</span>
                  </div>
                  <div className="mt-1 text-xs font-medium text-ink-soft">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-x py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-ink">How we help</h2>
          <p className="mt-3 text-ink-soft">
            A bespoke blend of consulting, training, coaching and speaking —
            delivered in person and virtually, tailored to your business
            challenge.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group rounded-2xl border border-line bg-white p-6 transition hover:border-brand hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-ink group-hover:text-brand">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-ink-soft">{s.blurb}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand-dark">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Podcast */}
      <section className="bg-[var(--bg-soft)] py-16">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-ink">The KAMCast podcast</h2>
              <p className="mt-2 max-w-xl text-ink-soft">
                Key account management strategies for business leaders, hosted by
                David Ventura.
              </p>
            </div>
            <Link href="/podcast/" className="btn btn-outline">
              All {episodes.length} episodes
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {latest.map((e) => (
              <Link
                key={e.slug}
                href={`/podcast/${e.slug}/`}
                className="group overflow-hidden rounded-2xl border border-line bg-white transition hover:shadow-md"
              >
                {e.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={mediaUrl(e.image)}
                    alt={e.fullTitle}
                    className="aspect-square w-full object-cover"
                  />
                )}
                <div className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-brand">
                    Episode {e.number}
                  </div>
                  <h3 className="mt-1 line-clamp-2 font-bold text-ink group-hover:text-brand">
                    {e.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-20">
        <div className="rounded-3xl bg-ink px-8 py-14 text-center text-white">
          <h2 className="text-3xl font-bold">Ready to grow your key accounts?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Let&apos;s talk about how a clear KAM strategy, the right systems and
            honed skills can transform your most important customer
            relationships.
          </p>
          <Link href="/contact/" className="btn mt-8">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
