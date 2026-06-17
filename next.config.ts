import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so the site can be hosted anywhere (Vercel, Netlify, S3, Nginx…)
  output: "export",
  // Keep old WordPress-style trailing-slash URLs (/about/ -> /about/index.html)
  trailingSlash: true,
  images: {
    // Required for `output: export` — no server-side image optimisation.
    unoptimized: true,
  },
};

export default nextConfig;
