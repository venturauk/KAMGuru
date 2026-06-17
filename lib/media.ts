// Single switch that controls where media is served from.
//  - Preview (default): the live WordPress site, so images render before the
//    `wp-content/uploads` folder has been localised into /public.
//  - Final: set NEXT_PUBLIC_MEDIA_BASE="" once the uploads folder is committed
//    under /public, so everything is served locally and WordPress can be retired.
export const MEDIA_BASE =
  process.env.NEXT_PUBLIC_MEDIA_BASE ?? "https://www.kamguru.com";

/** Resolve a root-relative media path (e.g. /wp-content/uploads/x.jpg). */
export function mediaUrl(path?: string): string {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${MEDIA_BASE}${path}`;
}

/** Rewrite media URLs inside a block of cleaned HTML. */
export function withMedia(html: string): string {
  if (!MEDIA_BASE) return html;
  return html.replaceAll("/wp-content/", `${MEDIA_BASE}/wp-content/`);
}
