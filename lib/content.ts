import pagesData from "@/data/pages.json";
import podcastData from "@/data/podcast.json";
import navData from "@/data/nav.json";

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

/** All curated page routes except the home route (""), as path segments. */
export function pageRoutes(): string[] {
  return Object.keys(pages).filter((r) => r !== "");
}

export function getEpisodes(): Episode[] {
  return (podcastData as Episode[]).slice().sort((a, b) => a.number - b.number);
}

export function getEpisode(slug: string): Episode | undefined {
  return (podcastData as Episode[]).find((e) => e.slug === slug);
}
