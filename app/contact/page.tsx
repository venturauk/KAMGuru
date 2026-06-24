import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import HubSpotForm from "@/components/HubSpotForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with KAMguru to start your key account management journey.",
};

const PHONE = "+44 (0) 203 714 5363";
const PHONE_HREF = "tel:+442037145363";
const EMAIL = "info@kamguru.com";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        subtitle="Let's talk about jumping ahead of your competitors"
      />
      <section className="container-x grid gap-12 py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-2xl font-bold text-ink">Get in touch</h2>
          <div className="rule-orange mt-4" />
          <p className="mt-5 max-w-md text-ink-soft">
            We&apos;d love to support you to jump ahead of your competitors. Get
            in touch to start your KAM journey with KAMguru today.
          </p>
          <dl className="mt-8 space-y-5">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-brand">Call us</dt>
              <dd className="mt-1">
                <a href={PHONE_HREF} className="text-lg font-bold text-ink hover:text-brand">{PHONE}</a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-brand">Email us</dt>
              <dd className="mt-1">
                <a href={`mailto:${EMAIL}`} className="text-lg font-bold text-ink hover:text-brand">{EMAIL}</a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-brand">Social</dt>
              <dd className="mt-1">
                <a href="https://uk.linkedin.com/company/kamguru" target="_blank" rel="noopener" className="font-semibold text-ink hover:text-brand">
                  LinkedIn
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-5 text-xl font-bold text-ink">Send us a message</h2>
          <HubSpotForm portalId="144888725" formId="b324150e-fd6c-480e-ad0c-de2cf819fdab" region="eu1" />
        </div>
      </section>
    </>
  );
}
