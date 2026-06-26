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

        {/* Front&Centre rebrand invitation */}
        <a
          href="https://frontandcentre.com/the-learning-centre"
          target="_blank"
          rel="noopener"
          className="card-lift mt-10 grid items-center gap-6 overflow-hidden rounded-2xl border border-line bg-[var(--bg-soft)] p-6 sm:grid-cols-[200px_1fr]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mediaUrl("/wp-content/uploads/Rebrand.jpg")}
            alt="KAMguru is now Front&Centre"
            loading="lazy"
            className="w-full rounded-xl"
          />
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-brand">
              We&apos;ve rebranded
            </div>
            <h2 className="mt-2 text-xl font-bold text-ink">
              KAMguru is now Front&amp;Centre&reg;
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Enjoyed the episode? All of our latest KAM thinking, tools and
              training now live in the all-new Front&amp;Centre&reg; Learning
              Centre. Come and explore what&apos;s next.
            </p>
            <span className="mt-3 inline-block text-sm font-semibold text-brand-dark">
              Visit the Learning Centre &rarr;
            </span>
          </div>
        </a>
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
