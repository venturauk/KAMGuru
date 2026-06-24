import type { Metadata } from "next";
import Link from "next/link";
import { getEpisodes } from "@/lib/content";
import { mediaUrl } from "@/lib/media";

export const metadata: Metadata = {
  title: "KAMCast Podcast",
  description:
    "KAMCast — key account management strategies for business leaders, hosted by David Ventura.",
};

export default function PodcastIndex() {
  const episodes = getEpisodes().slice().reverse();

  return (
    <>
      <section className="border-b border-line bg-ink text-white">
        <div className="container-x py-16">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-semibold">
            The KAMCast Podcast
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Key account management, unpacked
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Strategies, stories and practical ideas for business leaders and key
            account managers — hosted by David Ventura. {episodes.length}{" "}
            episodes and counting.
          </p>
        </div>
      </section>

      <section className="container-x py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((e) => (
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
                  className="aspect-[3/2] w-full object-cover"
                />
              )}
              <div className="p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-brand">
                  Episode {e.number}
                </div>
                <h2 className="mt-1 line-clamp-3 font-bold text-ink group-hover:text-brand">
                  {e.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
