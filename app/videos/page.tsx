import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import VideoCard from "@/components/VideoCard";
import { getVideos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Bite-size key account management videos from KAMguru - practical KAM insights from David Ventura.",
};

export default function VideosPage() {
  const videos = getVideos();
  return (
    <>
      <PageHero
        title="Videos"
        subtitle="Bite-size key account management insights from KAMguru"
      />
      <section className="container-x pt-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-lg text-ink-soft">
            A little nostalgia. These are our original KAMguru videos - a
            slightly younger David Ventura included - covering key account
            management fundamentals that are every bit as relevant today. We have
            since rebranded to{" "}
            <a
              href="https://frontandcentre.com/kamguru/"
              className="font-semibold text-brand-dark hover:underline"
            >
              Front&amp;Centre&reg;
            </a>
            , but these classics still earn their place. Enjoy them for old
            times&apos; sake.
          </p>
          <div className="rule-orange mx-auto mt-5" />
        </div>
      </section>
      <section className="container-x py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <VideoCard key={v.muse} video={v} />
          ))}
        </div>
      </section>
    </>
  );
}
