import pagesData from "@/data/pages.json";
import podcastData from "@/data/podcast.json";
import navData from "@/data/nav.json";
import testimonialsData from "@/data/testimonials.json";
import videosData from "@/data/videos.json";
import clientsData from "@/data/clients.json";

export type Testimonial = { name: string; role: string; quote: string };
export const testimonials = testimonialsData as Testimonial[];

export type Video = {
  title: string;
  muse: string;
  thumb: string;
  vimeo?: { id: string; hash?: string };
};

// Vimeo replacements, keyed by the original Skiv/Muse id. Add entries as the
// Vimeo links arrive; cards with a Vimeo entry play from Vimeo, the rest from Skiv.
const VIMEO: Record<string, { id: string; hash?: string }> = {
  LGdzUPQ: { id: "1204308167", hash: "a33b5ef33d" }, // A Story About Pareto
  kTdS8aT: { id: "1204308287", hash: "96db8b2e8c" }, // Why is KAM so important?
  M8pTx1Y: { id: "1204308280", hash: "019f991733" }, // Want More Revenue?
  "931X4gD": { id: "1204308237", hash: "8af9b2d8fb" }, // Exceeding Customer Expectations (KAM is like tennis)
  s6dqh9A: { id: "1204308201", hash: "633c12599b" }, // If Adding Value Was A Crime
  Q1PvPpf: { id: "1204308231", hash: "461ddd13b8" }, // Key Account Audits
  ZE1mCz6: { id: "1204308224", hash: "f94a1163ce" }, // Focus and KAM Clarity
};

export const getVideos = (): Video[] =>
  (videosData as Omit<Video, "vimeo">[]).map((v) => ({
    ...v,
    vimeo: VIMEO[v.muse],
  }));

export const getClientLogos = (): string[] => clientsData as string[];

export type Page = {
  id: string;
  route: string;
  title: string;
  slug: string;
  html: string;
  image: string;
};

export type Episode = {
  id: string;
  slug: string;
  number: number;
  title: string;
  fullTitle: string;
  banner: string;
  html: string;
  image: string;
  captivate: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const pages = pagesData as Record<string, Page>;

export const nav = navData as NavItem[];

export function getPage(route: string): Page | undefined {
  return pages[route];
}

/** Curated page routes for the generic [...slug] renderer.
 *  Excludes the home route ("") and routes with a dedicated page (videos). */
export function pageRoutes(): string[] {
  const dedicated = new Set([
    "",
    "videos",
    "contact",
    "services",
    "clients",
    "resources",
  ]);
  return Object.keys(pages).filter((r) => !dedicated.has(r));
}

export function getEpisodes(): Episode[] {
  return (podcastData as Episode[]).slice().sort((a, b) => a.number - b.number);
}

export function getEpisode(slug: string): Episode | undefined {
  return (podcastData as Episode[]).find((e) => e.slug === slug);
}
