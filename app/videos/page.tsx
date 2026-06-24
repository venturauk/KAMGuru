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
