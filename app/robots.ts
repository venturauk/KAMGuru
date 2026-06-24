import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.kamguru.com/sitemap.xml",
  };
}

export const dynamic = "force-static";
