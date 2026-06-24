import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEpisode, getEpisodes } from "@/lib/content";
import { mediaUrl } from "@/lib/media";
import Html from "@/components/Html";

export const dynamicParams = false;

export function generateStaticParams() {
  return getEpisodes().map((e) => ({ slug: e.slug }));
}

const excerpt = (html: string) =>
  html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ep = getEpisode(slug);
  if (!ep) return { title: "Episode" };
  return {
    title: `Ep ${ep.number}: ${ep.title}`,
    description: excerpt(ep.html),
    openGraph: {
      title: `Ep ${ep.number}: ${ep.title}`,
      description: excerpt(ep.html),
      images: ep.image ? [{ url: mediaUrl(ep.image) }] : undefined,
    },
  };
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ep = getEpisode(slug);
  if (!ep) notFound();

  const episodes = getEpisodes();
  const idx = episodes.findIndex((e) => e.slug === ep.slug);
  const prev = episodes[idx - 1];
  const next = episodes[idx + 1];

  const shareUrl = `https://www.kamguru.com/podcast/${ep.slug}/`;
  const shareText = `KAMCast Ep ${ep.number}: ${ep.title}`;
  const shares = [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`,
    },
  ];

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

        {/* share */}
        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-6">
          <span className="text-sm font-semibold text-ink">Share this episode:</span>
          {shares.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-line px-4 py-1.5 text-sm font-medium text-ink-soft transition hover:border-brand hover:text-brand"
            >
              {s.label}
            </a>
          ))}
        </div>
      </article>

      {/* prev / next */}
      <nav className="border-t border-line bg-[var(--bg-soft)]">
        <div className="container-x grid gap-4 py-8 sm:grid-cols-2">
          {prev ? (
            <Link href={`/podcast/${prev.slug}/`} className="card-lift rounded-xl border border-line bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">← Previous</div>
              <div className="mt-1 font-bold text-ink">Ep {prev.number}: {prev.title}</div>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/podcast/${next.slug}/`} className="card-lift rounded-xl border border-line bg-white p-5 text-right sm:text-right">
              <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Next →</div>
              <div className="mt-1 font-bold text-ink">Ep {next.number}: {next.title}</div>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>
    </>
  );
}
