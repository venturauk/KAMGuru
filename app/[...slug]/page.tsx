import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPage, pageRoutes } from "@/lib/content";
import Html from "@/components/Html";
import PageHero from "@/components/PageHero";

export const dynamicParams = false;

export function generateStaticParams() {
  return pageRoutes().map((route) => ({ slug: route.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug.join("/"));
  return { title: page?.title ?? "Page" };
}

const SERVICES = [
  { title: "Consultancy", href: "/services/consultancy/" },
  { title: "Coaching", href: "/services/coaching/" },
  { title: "Training", href: "/services/training/" },
  { title: "Speaking", href: "/services/speaking/" },
];

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const route = slug.join("/");
  const page = getPage(route);
  if (!page) notFound();

  const isService = slug[0] === "services" && slug.length > 1;

  if (isService) {
    return (
      <>
        <PageHero
          title={page.title}
          eyebrow="Services"
          subtitle={`Key account management ${page.title.toLowerCase()} from KAMguru`}
        />
        <section className="container-x grid gap-12 py-14 lg:grid-cols-[1fr_300px]">
          <article className="prose min-w-0">
            <Html html={page.html} className="" />
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-line bg-ink p-6 text-white">
              <h2 className="text-lg font-bold">Interested in {page.title}?</h2>
              <p className="mt-2 text-sm text-white/75">
                Book a no-obligation discovery call and we&apos;ll help you find
                the right approach for your key accounts.
              </p>
              <Link href="/contact/" className="btn mt-4 w-full text-center">
                Book a discovery call
              </Link>
              <a
                href="tel:+442037145363"
                className="mt-3 block text-center text-sm font-semibold text-brand"
              >
                +44 (0) 203 714 5363
              </a>
            </div>

            <div className="mt-6 rounded-2xl border border-line bg-white p-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
                Other services
              </h3>
              <ul className="mt-3 space-y-1">
                {SERVICES.filter((s) => s.href !== `/${route}/`).map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-ink transition hover:bg-[var(--bg-soft)] hover:text-brand"
                    >
                      {s.title}
                      <span className="text-brand">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        <section className="container-x pb-20">
          <div className="rounded-3xl bg-[var(--bg-soft)] px-8 py-12 text-center">
            <h2 className="text-2xl font-bold text-ink">
              Let&apos;s talk about your key accounts
            </h2>
            <Link href="/contact/" className="btn mt-6">Get in touch</Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero title={page.title} image={page.image} />
      <article className="container-x py-12">
        <Html html={page.html} />
      </article>
    </>
  );
}
