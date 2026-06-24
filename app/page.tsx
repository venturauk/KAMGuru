import Link from "next/link";
import { getEpisodes } from "@/lib/content";
import { mediaUrl } from "@/lib/media";
import Testimonials from "@/components/Testimonials";

const pillars = [
  {
    title: "Strategies",
    icon: "M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10c.6.6 1 1.4 1 2.2V16h6v-.8c0-.8.4-1.6 1-2.2A6 6 0 0 0 12 3Z",
    points: [
      "Standing out from competitors rather than just standing up to them",
      "Becoming an exceptional business partner, rather than a supplier",
      "Being seen as a value-creator not a cost-creator",
    ],
  },
  {
    title: "Systems",
    icon: "M10.3 3.3a1 1 0 0 1 1-.8h1.4a1 1 0 0 1 1 .8l.3 1.6a7 7 0 0 1 1.5.9l1.6-.6a1 1 0 0 1 1.2.4l.7 1.2a1 1 0 0 1-.2 1.3l-1.2 1a7 7 0 0 1 0 1.8l1.2 1a1 1 0 0 1 .2 1.3l-.7 1.2a1 1 0 0 1-1.2.4l-1.6-.6a7 7 0 0 1-1.5.9l-.3 1.6a1 1 0 0 1-1 .8h-1.4a1 1 0 0 1-1-.8l-.3-1.6a7 7 0 0 1-1.5-.9l-1.6.6a1 1 0 0 1-1.2-.4l-.7-1.2a1 1 0 0 1 .2-1.3l1.2-1a7 7 0 0 1 0-1.8l-1.2-1a1 1 0 0 1-.2-1.3l.7-1.2a1 1 0 0 1 1.2-.4l1.6.6a7 7 0 0 1 1.5-.9l.3-1.6ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
    points: [
      "Understanding “where you are starting from” through effective KAM audits",
      "Developing simple and effective “KAMplans” for each key account",
      "Building one-page strategic plans for each key account",
    ],
  },
  {
    title: "Skills",
    icon: "M14.7 6.3a4 4 0 0 1-5 5l-6 6a1.5 1.5 0 0 0 2.1 2.1l6-6a4 4 0 0 1 5-5l-2.4 2.4-1.7-.4-.4-1.7 2.3-2.4Z",
    points: [
      "Improving relationships by becoming an expert in the customer’s world",
      "Developing KAM as a “team sport” across the business",
      "Improving internal customer service and reducing “friendly fire”",
    ],
  },
];

const services = [
  { title: "Consultancy", href: "/services/consultancy/", blurb: "Strategic guidance to design and embed a KAM approach that fits your business." },
  { title: "Coaching", href: "/services/coaching/", blurb: "One-to-one and team coaching to sharpen your key account managers." },
  { title: "Training", href: "/services/training/", blurb: "Practical, high-energy workshops that turn KAM theory into everyday habits." },
  { title: "Speaking", href: "/services/speaking/", blurb: "Engaging keynotes on key account management, partnership and sales leadership." },
];

export default function Home() {
  const latest = getEpisodes().slice(-3).reverse();

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__wedge" />
        <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div className="text-white">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
              UK&apos;s leading key account management
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Jump ahead of your competitors
            </h1>
            <div className="rule-orange mt-5" />
            <p className="mt-5 max-w-xl text-lg text-white/85">
              KAMguru helps you develop profitable partnerships with your most
              important customers — often the 20% who produce 80% of the business.
              Stand out from competitors, don&apos;t just stand up to them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact/" className="btn">Book a discovery call</Link>
              <Link href="/services/" className="btn btn-outline !border-white !text-white hover:!bg-white hover:!text-ink">
                Explore our services
              </Link>
            </div>
          </div>
          <div className="relative hidden justify-self-end lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mediaUrl("/wp-content/uploads/david-v.jpg")}
              alt="David Ventura, KAMguru"
              className="h-80 w-80 rounded-2xl object-cover shadow-2xl ring-4 ring-white/20"
            />
          </div>
        </div>
      </section>

      {/* Strategies / Systems / Skills */}
      <section className="container-x py-16">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-ink">
            We help important client relationships thrive through clear&nbsp;
            <span className="text-brand">strategies, systems and skills</span>
          </h2>
          <div className="rule-orange mx-auto mt-4" />
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title}>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d={p.icon} />
                  </svg>
                </span>
                <h3 className="text-xl font-bold uppercase tracking-wide text-ink">{p.title}</h3>
              </div>
              <ul className="mt-4 space-y-3">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2 text-sm text-ink-soft">
                    <span className="mt-1 text-brand">▸</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-[var(--bg-soft)] py-16">
        <div className="container-x">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-ink">How we help</h2>
            <div className="rule-orange mx-auto mt-4" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group rounded-2xl border border-line bg-white p-6 transition hover:border-brand hover:shadow-md"
              >
                <h3 className="text-lg font-bold text-ink group-hover:text-brand">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{s.blurb}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-brand-dark">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Podcast */}
      <section className="bg-[var(--bg-soft)] py-16">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-ink">The KAMCast podcast</h2>
              <p className="mt-2 max-w-xl text-ink-soft">
                Key account management strategies for business leaders, hosted by David Ventura.
              </p>
            </div>
            <Link href="/podcast/" className="btn btn-outline">All episodes</Link>
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
                  <img src={mediaUrl(e.image)} alt={e.fullTitle} className="aspect-square w-full object-cover" />
                )}
                <div className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-brand">Episode {e.number}</div>
                  <h3 className="mt-1 line-clamp-2 font-bold text-ink group-hover:text-brand">{e.title}</h3>
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
            honed skills can transform your most important customer relationships.
          </p>
          <Link href="/contact/" className="btn mt-8">Get in touch</Link>
        </div>
      </section>
    </>
  );
}
