# KAMguru website

A static rebuild of [kamguru.com](https://www.kamguru.com), migrated off WordPress
to **Next.js** (App Router, static export) so it can be hosted anywhere — Vercel,
Netlify, S3/CloudFront, or any static web server.

## How it works

The content was migrated from a WordPress eXtended RSS (WXR) export:

```
.source/export.xml   ──>  scripts/extract.mjs  ──>  data/*.json  ──>  Next.js pages
```

- `scripts/extract.mjs` parses the WordPress export, resolves media references,
  and strips the WPBakery / Visual Composer shortcodes into clean HTML.
- The cleaned content is committed as `data/*.json`, so deploys don't need the
  raw export (which contains author emails and is **git-ignored** under `.source/`).
- Pages are rendered from that data through a few templates in `app/`.

To regenerate the content after updating the export, drop the new file at
`.source/export.xml` and run:

```bash
node scripts/extract.mjs
```

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export -> ./out
```

## Media (images, PDFs, audio)

Images currently load from the **live WordPress site** so the rebuild previews
correctly. To go fully independent of WordPress:

1. Copy the WordPress `wp-content/uploads` folder into `public/wp-content/uploads`.
2. Set `NEXT_PUBLIC_MEDIA_BASE=""` (e.g. in `.env.local` or the Vercel project
   env vars) so media is served locally.

The switch lives in `lib/media.ts`. Podcast audio is hosted on Captivate.fm and
is embedded directly, so it needs no migration.

## Structure

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Home page |
| `app/[...slug]/page.tsx` | All standard content pages (About, Services, Resources, …) |
| `app/podcast/` | KAMCast index + episode pages |
| `components/` | Header, footer, HTML renderer |
| `lib/` | Content + media helpers |
| `data/` | Cleaned content extracted from WordPress |
| `scripts/extract.mjs` | WordPress → JSON extractor |
