import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Testimonials from "@/components/Testimonials";
import Reveal from "@/components/Reveal";
import { getClientLogos } from "@/lib/content";
import { mediaUrl } from "@/lib/media";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "KAMguru has worked with leading organisations across many sectors - from Michelin and Unilever to the NHS and Grant Thornton.",
};

export default function ClientsPage() {
  const logos = getClientLogos();
  return (
    <>
      <PageHero
        title="Clients"
        subtitle="Trusted by leading organisations across many sectors"
        eyebrow="Our clients"
      />

      <section className="container-x py-14">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-lg text-ink-soft">
            For more than twenty years, over 95% of our business has come from
            referrals and recommendations from happy customers. Here are just some
            of the organisations we have worked with.
          </p>
          <div className="rule-orange mx-auto mt-5" />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
          {logos.map((src) => (
            <div
              key={src}
              className="flex items-center justify-center bg-white p-6"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mediaUrl(src)}
                alt="Client logo"
                loading="lazy"
                className="max-h-12 w-auto max-w-full object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </section>

      <Reveal>
        <Testimonials />
      </Reveal>

      <section className="container-x pb-20">
        <div className="rounded-3xl bg-ink px-8 py-14 text-center text-white">
          <h2 className="text-3xl font-bold">Could your key accounts work harder?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Let&apos;s talk about how a clear KAM approach could transform your most
            important customer relationships.
          </p>
          <a href="/contact/" className="btn mt-8">Get in touch</a>
        </div>
      </section>
    </>
  );
}
