import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEpisode, getEpisodes } from "@/lib/content";
import Html from "@/components/Html";

export const dynamicParams = false;

export function generateStaticParams() {
  return getEpisodes().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ep = getEpisode(slug);
  return { title: ep ? `Ep ${ep.number}: ${ep.title}` : "Episode" };
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ep = getEpisode(slug);
  if (!ep) notFound();

  return (
    <>
      <section className="border-b border-line bg-[var(--bg-soft)]">
        <div className="container-x py-10">
          <Link
            href="/podcast/"
            className="text-sm font-semibold text-brand-dark hover:underline"
          >
            ← All episodes
          </Link>
          <div className="mt-3 text-sm font-semibold uppercase tracking-wide text-brand">
            Episode {ep.number}
          </div>
          <h1 className="mt-1 max-w-3xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {ep.title}
          </h1>
        </div>
      </section>

      <article className="container-x py-12">
        {ep.captivate && (
          <div className="mb-8 overflow-hidden rounded-xl border border-line">
            <iframe
              title={`KAMCast episode ${ep.number}`}
              src={`https://${ep.captivate}`}
              style={{ width: "100%", height: "170px" }}
              loading="lazy"
            />
          </div>
        )}
        <Html html={ep.html} />
      </article>
    </>
  );
}
