import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { mediaUrl } from "@/lib/media";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "The KAMguru resource library - audits, frameworks and tools - now lives in the Front&Centre Learning Centre.",
};

// Every resource now lives in the Front&Centre Learning Centre. The page is a
// shop window: each tile is a designed product card that links straight there.
const LEARNING_CENTRE = "https://frontandcentre.com/the-learning-centre";

const resources = [
  {
    title: "The Pareto Principle",
    image: "/wp-content/uploads/Pareto-Principle-29.6.jpg",
    blurb:
      "Understand the 80/20 rule and how to relate it to your business today.",
  },
  {
    title: "Key Account Audits",
    image: "/wp-content/uploads/Audits-29.6.jpg",
    blurb:
      "Reveal how the key accounts you work with really think and feel.",
  },
  {
    title: "Partnership Indicators",
    image: "/wp-content/uploads/Partnerships-29.6.jpg",
    blurb:
      "Check whether you have the traits of a true partner, not just a supplier.",
  },
  {
    title: "KASH Profile",
    image: "/wp-content/uploads/Kash-Profile-29.6.jpg",
    blurb:
      "A one-page tool to pinpoint the training and coaching needs of your KAMs.",
  },
  {
    title: "Probability Factors",
    image: "/wp-content/uploads/Probability-29.6.jpg",
    blurb:
      "Forecast the likely value of key account projects to your organisation.",
  },
  {
    title: "The Evolution of KAM",
    image: "/wp-content/uploads/Evolution-of-KAM-29.6.jpg",
    blurb:
      "A journey through 50 years of KAM and how to become a valued business partner.",
  },
  {
    title: "Top 10 Tips For Your Top 10 Customers",
    image: "/wp-content/uploads/Book-29.6.jpg",
    blurb:
      "Download a free chapter and learn how to work as a partner, not a supplier.",
  },
  {
    title: "KAM Video Series",
    image: "/wp-content/uploads/Videos-29.6.jpg",
    blurb:
      "Bite-size lessons on the best KAM principles and how to apply them.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        title="Resources"
        eyebrow="The KAM toolkit"
        subtitle="Audits, frameworks and tools to help you grow your most important customers."
      />

      {/* Rebrand hero - the whole library has moved to Front&Centre */}
      <section className="container-x pt-14">
        <Reveal>
          <a
            href={LEARNING_CENTRE}
            target="_blank"
            rel="noopener"
            className="group block overflow-hidden rounded-3xl shadow-[0_18px_50px_-18px_rgba(31,39,51,0.45)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mediaUrl("/wp-content/uploads/Rebrand.jpg")}
              alt="KAMguru is now Front&Centre - explore the new Learning Centre"
              className="w-full transition duration-500 group-hover:scale-[1.02]"
            />
          </a>
        </Reveal>
        <div className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-lg text-ink-soft">
            Every KAMguru resource now lives in the{" "}
            <span className="font-semibold text-ink">
              Front&amp;Centre&reg; Learning Centre
            </span>
            . Browse the shop window below, then click through to download the
            full toolkit.
          </p>
          <div className="rule-orange mx-auto mt-5" />
        </div>
      </section>

      {/* Shop window - every tile links straight through to Front&Centre */}
      <section className="container-x py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r, i) => (
            <Reveal key={r.title} delay={i * 60} className="h-full">
              <a
                href={LEARNING_CENTRE}
                target="_blank"
                rel="noopener"
                className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white"
              >
                <div className="overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mediaUrl(r.image)}
                    alt={r.title}
                    loading="lazy"
                    className="aspect-[625/446] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-base font-bold leading-snug text-ink group-hover:text-brand">
                    {r.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-ink-soft">{r.blurb}</p>
                  <span className="mt-3 text-sm font-semibold text-brand-dark">
                    Get it at Front&amp;Centre&reg; &rarr;
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Compact closing CTA - small logo, single link to Front&Centre */}
      <section className="container-x pb-20">
        <div className="flex flex-col items-center rounded-3xl bg-ink px-8 py-12 text-center text-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mediaUrl("/wp-content/uploads/logo_white_symbol_bg_500px-2.jpg")}
            alt="KAMguru"
            className="h-14 w-14 rounded-xl"
          />
          <h2 className="mt-5 text-2xl font-bold">
            Get the full toolkit at the Front&amp;Centre&reg; Learning Centre
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            All of the audits, frameworks and downloads have a new home. Head
            over to grab them and join the latest KAM thinking.
          </p>
          <a
            href={LEARNING_CENTRE}
            target="_blank"
            rel="noopener"
            className="btn mt-7"
          >
            Visit the Learning Centre
          </a>
        </div>
      </section>
    </>
  );
}
