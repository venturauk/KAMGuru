import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "KAMguru's key account management services — consultancy, coaching, training and speaking.",
};

const services = [
  {
    title: "Consultancy",
    href: "/services/consultancy/",
    blurb:
      "Work with a KAM implementation consultancy that focuses on getting your business the best results — from boardroom strategy through to the field.",
  },
  {
    title: "Coaching",
    href: "/services/coaching/",
    blurb:
      "One-to-one and team coaching that builds the relationship skills and confidence your key account managers need to deliver.",
  },
  {
    title: "Training",
    href: "/services/training/",
    blurb:
      "Practical, high-energy workshops that turn KAM strategies, systems and skills into everyday habits across your business.",
  },
  {
    title: "Speaking",
    href: "/services/speaking/",
    blurb:
      "An interactive, engaging and effective session on the principles of key account management for your event or team.",
  },
];

const more = [
  {
    title: "The Book",
    href: "/top-10-tips-for-your-top-10-customers/",
    blurb: "Top 10 Tips For Your Top 10 Customers — practical advice you can apply today.",
  },
  {
    title: "Resources",
    href: "/resources/",
    blurb: "Audits, frameworks and tools to help you understand and grow your key accounts.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Services"
        subtitle="Providing key account management support"
        eyebrow="How we help"
      />

      <section className="container-x py-14">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-lg text-ink-soft">
            The mission is simple — jump ahead of your competitors and look after
            your most important customers before someone else does. We tailor a
            blend of consulting, training, coaching and speaking to your business.
          </p>
          <div className="rule-orange mx-auto mt-5" />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.href} delay={i * 80} className="h-full">
              <Link
                href={s.href}
                className="group card-lift flex h-full flex-col rounded-2xl border border-line bg-white p-7 hover:border-brand"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-ink group-hover:text-brand">{s.title}</h2>
                  <span className="text-brand transition group-hover:translate-x-1">→</span>
                </div>
                <p className="mt-3 text-ink-soft">{s.blurb}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {more.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group card-lift block rounded-2xl border border-line bg-[var(--bg-soft)] p-7 hover:border-brand"
            >
              <h2 className="text-lg font-bold text-ink group-hover:text-brand">{s.title}</h2>
              <p className="mt-2 text-sm text-ink-soft">{s.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="rounded-3xl bg-ink px-8 py-14 text-center text-white">
          <h2 className="text-3xl font-bold">Not sure where to start?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Book a discovery call and we&apos;ll help you find the right blend of
            support for your key accounts.
          </p>
          <Link href="/contact/" className="btn mt-8">Book a discovery call</Link>
        </div>
      </section>
    </>
  );
}
