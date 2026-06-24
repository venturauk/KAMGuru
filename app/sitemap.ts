import type { MetadataRoute } from "next";
import { pageRoutes, getEpisodes } from "@/lib/content";

const BASE = "https://www.kamguru.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "", // home
    ...pageRoutes().map((r) => `${r}/`),
    "podcast/",
    ...getEpisodes().map((e) => `podcast/${e.slug}/`),
  ];
  return paths.map((p) => ({
    url: `${BASE}/${p}`,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p.startsWith("podcast/episode") ? 0.5 : 0.7,
  }));
}

export const dynamic = "force-static";
