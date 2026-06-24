import pagesData from "@/data/pages.json";
import podcastData from "@/data/podcast.json";
import navData from "@/data/nav.json";
import testimonialsData from "@/data/testimonials.json";
import videosData from "@/data/videos.json";
import clientsData from "@/data/clients.json";

export type Testimonial = { name: string; role: string; quote: string };
export const testimonials = testimonialsData as Testimonial[];

export type Video = { title: string; muse: string; thumb: string };
export const getVideos = (): Video[] => videosData as Video[];

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
  const dedicated = new Set(["", "videos", "contact", "services", "clients"]);
  return Object.keys(pages).filter((r) => !dedicated.has(r));
}

export function getEpisodes(): Episode[] {
  return (podcastData as Episode[]).slice().sort((a, b) => a.number - b.number);
}

export function getEpisode(slug: string): Episode | undefined {
  return (podcastData as Episode[]).find((e) => e.slug === slug);
}
