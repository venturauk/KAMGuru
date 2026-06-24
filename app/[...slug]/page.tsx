import type { Metadata } from "next";
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

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = getPage(slug.join("/"));
  if (!page) notFound();

  return (
    <>
      <PageHero title={page.title} image={page.image} />
      <article className="container-x py-12">
        <Html html={page.html} />
      </article>
    </>
  );
}
