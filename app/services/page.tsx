import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { mediaUrl } from "@/lib/media";

export const metadata: Metadata = {
  title: "Services",
  description:
    "KAMguru's key account management services - consultancy, coaching, training and speaking.",
};

const services = [
  {
    title: "Consultancy",
    href: "/services/consultancy/",
    image: "/wp-content/uploads/Consultancy.jpg",
    blurb:
      "Work with a KAM implementation consultancy focused on getting your business the best results - boardroom to the field.",
  },
  {
    title: "Coaching",
    href: "/services/coaching/",
    image: "/wp-content/uploads/Coaching.jpg",
    blurb:
      "One-to-one and team coaching to sharpen the skills and confidence of your key account managers.",
  },
  {
    title: "Training",
    href: "/services/training/",
    image: "/wp-content/uploads/Training.jpg",
    blurb:
      "Practical, high-energy workshops that turn KAM strategies, systems and skills into everyday habits.",
  },
  {
    title: "Speaking",
    href: "/services/speaking/",
    image: "/wp-content/uploads/Speaking-003.jpg",
    blurb:
      "An interactive, engaging session on the principles of key account management for your event or team.",
  },
  {
    title: "The Book",
    href: "/top-10-tips-for-your-top-10-customers/",
    image: "/wp-content/uploads/Book.jpg",
    blurb:
      "Top 10 Tips For Your Top 10 Customers - practical advice you can put into practice today.",
  },
  {
    title: "Resources",
    href: "/resources/",
    image: "/wp-content/uploads/Resources-29.6.jpg",
    blurb:
      "Audits, frameworks and tools to help you understand and grow your most important customers.",
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
            The mission is simple - jump ahead of your competitors and look after
            your most important customers before someone else does. We tailor a
            blend of consulting, training, coaching and speaking to your business.
          </p>
          <div className="rule-orange mx-auto mt-5" />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.href} delay={i * 70} className="h-full">
              <Link
                href={s.href}
                className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white"
              >
                <div className="overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mediaUrl(s.image)}
                    alt={s.title}
                    loading="lazy"
                    className="aspect-[625/446] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-lg font-bold text-ink group-hover:text-brand">
                    {s.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-ink-soft">{s.blurb}</p>
                  <span className="mt-3 text-sm font-semibold text-brand-dark">
                    Learn more →
                  </span>
                </div>
              </Link>
            </Reveal>
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
