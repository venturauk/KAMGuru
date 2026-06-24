import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Bite-size key account management videos from KAMguru - practical KAM insights from David Ventura.",
};

const SHOWCASE_ID = "12301386";

export default function VideosPage() {
  return (
    <>
      <PageHero
        title="Videos"
        subtitle="Bite-size key account management insights from KAMguru"
      />
      <section className="container-x py-12">
        <div className="mx-auto max-w-5xl">
          <div
            className="relative overflow-hidden rounded-2xl border border-line bg-ink"
            style={{ paddingTop: "56.25%" }}
          >
            <iframe
              src={`https://vimeo.com/showcase/${SHOWCASE_ID}/embed`}
              title="KAMguru videos"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
