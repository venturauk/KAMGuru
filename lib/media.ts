// Media resolution with a progressive WordPress -> local migration.
//
// Every media reference is a root-relative `/wp-content/uploads/<file>` path.
// For each one we check the local manifest (files committed under
// public/wp-content/uploads): if present, it's served locally from the repo;
// if not, it falls back to the live WordPress site. This means the site never
// breaks while the media library is still being migrated in batches.
//
// Once every needed file is local, the fallback simply stops being used.
import manifest from "@/data/media-local.json";

const LOCAL = new Set(manifest as string[]);
const UPLOADS = "/wp-content/uploads/";

// Where to fetch media that hasn't been localised yet.
export const MEDIA_FALLBACK =
  process.env.NEXT_PUBLIC_MEDIA_BASE ?? "https://www.kamguru.com";

function resolveUpload(path: string): string {
  const i = path.indexOf(UPLOADS);
  if (i === -1) {
    return /^https?:\/\//.test(path) ? path : MEDIA_FALLBACK + path;
  }
  const rel = path.slice(i + UPLOADS.length);
  const basename = rel.split("/").pop()!.split(/[?#]/)[0];
  // Present locally -> serve from /public; otherwise fall back to live site.
  return LOCAL.has(basename) ? path.slice(i) : MEDIA_FALLBACK + path.slice(i);
}

/** Resolve a single media path (e.g. a page or episode image). */
export function mediaUrl(path?: string): string {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return resolveUpload(path);
}

/** Rewrite every media URL inside a block of cleaned HTML. */
export function withMedia(html: string): string {
  return html.replace(
    /(\/wp-content\/uploads\/[^"')\s]+)/g,
    (m) => resolveUpload(m)
  );
}
