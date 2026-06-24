// Extracts the public KAMguru site from the WordPress export into clean JSON.
// Run: node scripts/extract.mjs
// Input:  .source/export.xml   (raw WP eXtended RSS, not committed — contains PII)
// Output: data/*.json          (cleaned, committed)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { XMLParser } from "fast-xml-parser";

const SRC = ".source/export.xml";
const OUT = "data";
mkdirSync(OUT, { recursive: true });

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  cdataPropName: "__cdata",
  trimValues: false,
});
const doc = parser.parse(readFileSync(SRC, "utf8"));
const items = doc.rss.channel.item;

// fast-xml-parser puts CDATA text under __cdata; normalise field access.
const txt = (v) => {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "object" && "__cdata" in v) return v.__cdata ?? "";
  if (typeof v === "object" && "#text" in v) return String(v["#text"]);
  return String(v);
};
const asArr = (v) => (Array.isArray(v) ? v : v == null ? [] : [v]);

const post = (it) => ({
  id: String(txt(it["wp:post_id"])),
  type: txt(it["wp:post_type"]),
  status: txt(it["wp:status"]),
  title: txt(it.title).trim(),
  slug: txt(it["wp:post_name"]),
  parent: String(txt(it["wp:post_parent"])),
  content: txt(it["content:encoded"]),
  excerpt: txt(it["excerpt:encoded"]),
  attachmentUrl: txt(it["wp:attachment_url"]),
  meta: Object.fromEntries(
    asArr(it["wp:postmeta"]).map((m) => [txt(m["wp:meta_key"]), txt(m["wp:meta_value"])])
  ),
});
const all = items.map(post);
const byId = new Map(all.map((p) => [p.id, p]));

// ---- media -----------------------------------------------------------------
// Make every kamguru.com URL root-relative so a single MEDIA_BASE controls
// whether media is served from the live site (preview) or locally (final).
const HOSTS = /https?:\/\/(?:www\.)?kamguru\.com/gi;
const rootRel = (s) => (s || "").replace(HOSTS, "");

const attachments = {}; // id -> { src, alt, title }
for (const p of all) {
  if (p.type !== "attachment") continue;
  attachments[p.id] = {
    src: rootRel(p.attachmentUrl),
    alt: p.meta["_wp_attachment_image_alt"] || p.title || "",
    title: p.title || "",
  };
}
const mediaSrc = (id) => attachments[id]?.src || "";

// ---- shortcode / WPBakery cleaning ----------------------------------------
const attrs = (s) => {
  const o = {};
  for (const m of (s || "").matchAll(/([\w-]+)="([^"]*)"/g)) o[m[1]] = m[2];
  return o;
};
// WPBakery encodes btn links as: url:https%3A%2F%2F...|title:...|target:...
const decodeVcLink = (raw) => {
  const out = {};
  for (const part of (raw || "").split("|")) {
    const i = part.indexOf(":");
    if (i === -1) continue;
    out[part.slice(0, i)] = decodeURIComponent(part.slice(i + 1).replace(/\+/g, " "));
  }
  return out;
};
const esc = (s) => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Decode HTML entities for fields rendered as plain text (titles, names).
const NAMED = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  hellip: "…", mdash: "—", ndash: "–", lsquo: "‘", rsquo: "’",
  ldquo: "“", rdquo: "”",
};
const decodeEntities = (s) =>
  (s || "").replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e) => {
    if (e[0] === "#") {
      const n = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isNaN(n) ? m : String.fromCodePoint(n);
    }
    return NAMED[e.toLowerCase()] ?? m;
  }).replace(/\s*—\s*/g, " - "); // no em dashes

function videoEmbed(url) {
  if (!url) return "";
  let m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/);
  if (m) return `<div class="embed"><iframe src="https://www.youtube.com/embed/${m[1]}" loading="lazy" allowfullscreen></iframe></div>`;
  m = url.match(/vimeo\.com\/(\d+)/);
  if (m) return `<div class="embed"><iframe src="https://player.vimeo.com/video/${m[1]}" loading="lazy" allowfullscreen></iframe></div>`;
  return `<p><a href="${esc(url)}">${esc(url)}</a></p>`;
}

function cleanContent(raw) {
  let s = raw || "";

  // WPBakery raw blocks are base64 of URL-encoded HTML/JS.
  s = s.replace(/\[vc_raw_html\]([\s\S]*?)\[\/vc_raw_html\]/g, (_, b64) => {
    try {
      return decodeURIComponent(Buffer.from(b64.trim(), "base64").toString("utf8"));
    } catch {
      return "";
    }
  });
  s = s.replace(/\[vc_raw_js\][\s\S]*?\[\/vc_raw_js\]/g, ""); // drop inline JS embeds

  s = rootRel(s);

  // Platform rename: muse.ai is now skiv.com (video IDs unchanged).
  s = s.replace(/muse\.ai/g, "skiv.com");

  // Resource CTAs now point to the Front & Centre learning centre.
  s = s.replace(
    /https?:\/\/learn\.kamguru\.com\/[^\s"')]*/gi,
    "https://frontandcentre.com/the-learning-centre"
  );


  // HubSpot forms are consolidated onto the Contact page — strip inline embeds.
  s = s.replace(/<script[^>]*(?:hsforms\.net|hs-scripts\.com|hbspt)[^>]*><\/script>/gi, "");
  s = s.replace(/<script\b[^>]*>[\s\S]*?hbspt\.forms\.create[\s\S]*?<\/script>/gi, "");
  s = s.replace(/<div[^>]*(?:hbspt-form|hubspotForm|hs-form-frame|id=["']hsForm)[^>]*>[\s\S]*?<\/div>/gi, "");

  // Self-closing / single shortcodes with payloads -> real HTML
  s = s.replace(/\[vc_single_image\b([^\]]*)\]/g, (_, a) => {
    const at = attrs(a);
    const src = at.image ? mediaSrc(at.image) : at.source === "external_link" ? rootRel(at.custom_src || "") : "";
    if (!src) return "";
    let img = `<img src="${esc(src)}" alt="${esc(attachments[at.image]?.alt || "")}" loading="lazy" />`;
    if (at.link) img = `<a href="${esc(rootRel(at.link))}">${img}</a>`;
    return `<figure class="wp-image">${img}</figure>`;
  });

  s = s.replace(/\[vc_custom_heading\b([^\]]*)\]/g, (_, a) => {
    const at = attrs(a);
    return at.text ? `<h2 class="vc-heading">${esc(at.text)}</h2>` : "";
  });

  s = s.replace(/\[stat_counter\b([^\]]*)\]/g, (_, a) => {
    const at = attrs(a);
    const val = at.counter_value || "";
    const suf = at.counter_suffix || "";
    const pre = at.counter_prefix || "";
    return `<div class="stat"><div class="stat-num">${esc(pre)}${esc(val)}<span class="stat-suffix">${esc(suf)}</span></div><div class="stat-title">${esc(at.counter_title || "")}</div></div>`;
  });

  s = s.replace(/\[vc_btn\b([^\]]*)\]/g, (_, a) => {
    const at = attrs(a);
    const link = decodeVcLink(at.link || "");
    const href = rootRel(link.url || "#");
    const target = link.target ? ` target="_blank" rel="noopener"` : "";
    return `<a class="btn" href="${esc(href)}"${target}>${esc(at.title || "Learn more")}</a>`;
  });

  // The7 theme button: [dt_button link="url"]LABEL[/dt_button]
  s = s.replace(/\[dt_button\b([^\]]*)\]([\s\S]*?)\[\/dt_button\]/g, (_, a, label) => {
    const at = attrs(a);
    const href = rootRel(at.link || "#");
    const target = at.target_blank === "true" ? ' target="_blank" rel="noopener"' : "";
    const text = label.replace(/<[^>]+>/g, "").trim() || "Learn more";
    return `<p style="text-align:center"><a class="btn" href="${esc(href)}"${target}>${esc(text)}</a></p>`;
  });

  s = s.replace(/\[vc_video\b([^\]]*)\]/g, (_, a) => videoEmbed(attrs(a).link));

  s = s.replace(/\[(?:vc_gallery|vc_images_carousel)\b([^\]]*)\]/g, (_, a) => {
    const ids = (attrs(a).images || "").split(",").map((x) => x.trim()).filter(Boolean);
    const imgs = ids
      .map((id) => mediaSrc(id) && `<img src="${esc(mediaSrc(id))}" alt="${esc(attachments[id]?.alt || "")}" loading="lazy" />`)
      .filter(Boolean)
      .join("");
    return imgs ? `<div class="gallery">${imgs}</div>` : "";
  });

  s = s.replace(/\[vc_separator\b[^\]]*\]/g, "<hr />");
  s = s.replace(/\[vc_empty_space\b[^\]]*\]/g, "");
  s = s.replace(/\[\/?vc_message\b[^\]]*\]/g, (m) => (m.startsWith("[/") ? "</div>" : '<div class="note">'));

  // Strip all remaining wrapper/unknown shortcodes, keep inner content.
  s = s.replace(/\[\/?[\w-]+(?:[^\]]*)\]/g, "");

  // Remove near-white inline text colours (invisible on white background).
  s = s.replace(
    /color:\s*#(?:fff(?:fff)?|f[0-9a-f]f[0-9a-f]f[0-9a-f]|fafafa|f5f5f5|f7f7f7|eee(?:eee)?|e5e5e5|ddd(?:ddd)?)\s*;?/gi,
    ""
  );

  // No em dashes — replace with a spaced hyphen.
  s = s.replace(/\s*—\s*/g, " - ");

  // The source over-uses <h3>/<h4> for body copy (whole bold paragraphs).
  // Convert long heading tags that are really sentences back into paragraphs.
  s = s.replace(/<(h3|h4)([^>]*)>([\s\S]*?)<\/\1>/gi, (m, tag, attr, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const limit = tag.toLowerCase() === "h4" ? 45 : 70;
    const isBody = /[.!?]$/.test(text) || text.length > limit;
    return isBody ? `<p${attr}>${inner}</p>` : m;
  });

  // Consistent Front&Centre(R) brand mark wherever it appears as text.
  s = s.replace(/Front\s*&amp;\s*Centre\s*(?:®|&reg;)?/gi, "Front&amp;Centre&reg;");

  // Keep the designed Front & Centre rebrand banner; make it a full-width
  // linked banner (tagged so CSS can size it as intended).
  s = s.replace(
    /<figure[^>]*>(?:\s*<a[^>]*>)?\s*(<img[^>]*src="[^"]*(?:Banner\.png|Rebrand\.jpg)"[^>]*>)\s*(?:<\/a>)?\s*<\/figure>/gi,
    (_, img) =>
      `<figure class="rebrand-banner"><a href="https://frontandcentre.com/kamguru/" target="_blank" rel="noopener">${img}</a></figure>`
  );

  // Fix internal links (after shortcodes have become real <a> tags):
  // service children live under /services/, and the discovery-call CTA
  // consolidates into the Contact page.
  s = s.replace(/href="\/(consultancy|coaching|training|speaking)\/"/g, 'href="/services/$1/"');
  s = s.replace(/href="\/discoverycall\/?"/g, 'href="/contact/"');

  return autop(s).trim();
}

// Minimal wpautop: wrap loose text blocks in <p>, leave block-level HTML alone.
const BLOCK = /^\s*<(?:h[1-6]|ul|ol|li|div|figure|table|thead|tbody|tr|td|blockquote|p|hr|iframe|img|section|article|a class="btn"|a href|aside|pre|form|span style)/i;
function autop(s) {
  const blocks = s.split(/\n\s*\n+/);
  return blocks
    .map((b) => {
      const t = b.trim();
      if (!t) return "";
      if (BLOCK.test(t) || t.startsWith("<")) return t;
      return `<p>${t.replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");
}

// ---- curated public page set ----------------------------------------------
// id -> route (route "" === site root)
const PAGES = {
  "834": "",                 // Home
  "91": "about",
  "14942": "clients",
  "15666": "team",
  "15913": "services",
  "15999": "services/consultancy",
  "16024": "services/coaching",
  "16026": "services/training",
  "16096": "services/speaking",
  "15928": "resources",
  "15678": "resources/the-pareto-principle",
  "15990": "resources/key-account-audits",
  "15992": "resources/partnership-indicators",
  "15995": "resources/kash-profile",
  "15996": "resources/probability-factors",
  "15997": "resources/the-evolution-of-key-account-management",
  "15998": "resources/presentation-skills",
  "15321": "videos",
  "15849": "top-10-tips-for-your-top-10-customers", // David's book
  "15893": "contact",
  "15777": "privacy-policy",
  "15827": "terms-and-conditions",
};

// KAMguru is a privately owned brand (David Ventura) — scrub the old
// BMD Learning Ltd company name, registered address and VAT number.
function scrubLegal(html) {
  return html
    .replace(/<p[^>]*>\s*Registered address:[^<]*<\/p>\s*/gi, "")
    .replace(/<p[^>]*>\s*Postal Address:[^<]*<\/p>\s*/gi, "")
    .replace(/<p[^>]*>\s*VAT number:\s*\d[\d\s]*<\/p>\s*/gi, "")
    .replace(/\s*Our VAT number is\s*\d[\d\s]*\.?/gi, "")
    .replace(/BMD Learning LTD\s+T\/A\s+KAMGuru\./gi, "David Ventura. KAMguru is a privately owned brand.")
    .replace(/owned and operated by BMD Learning LTD,\s*whose address is[^.]*\./gi, "owned and operated by David Ventura. KAMguru is a privately owned brand.")
    .replace(/BMD Learning LTD/gi, "KAMguru")
    .replace(/the email or postal addresses shown/gi, "the email address shown")
    .replace(/email or postal address/gi, "email address");
}

const featuredImg = (p) => {
  const thumb = p.meta["_thumbnail_id"];
  return thumb ? mediaSrc(thumb) : "";
};

// Rogue images carried over from the old page builder (wrong image on a page).
const ROGUE_IMAGES = {
  "resources/key-account-audits": ["Consultancy.jpg"],
  "resources/presentation-skills": ["Audits.jpg"],
};
function stripRogue(html, route) {
  for (const file of ROGUE_IMAGES[route] || []) {
    const re = new RegExp(
      `<figure[^>]*>(?:\\s*<a[^>]*>)?\\s*<img[^>]*src="[^"]*${file.replace(/\./g, "\\.")}"[^>]*>\\s*(?:</a>)?\\s*</figure>`,
      "gi"
    );
    html = html.replace(re, "");
  }
  return html;
}

const pages = {};
for (const [id, route] of Object.entries(PAGES)) {
  const p = byId.get(id);
  if (!p) {
    console.warn("MISSING page", id);
    continue;
  }
  pages[route] = {
    id,
    route,
    title: decodeEntities(p.title.replace(/\s*\[(Copy|Old|BACKUP|test)[^\]]*\]/gi, "").trim()),
    slug: p.slug,
    html: stripRogue(scrubLegal(cleanContent(p.content)), route),
    image: featuredImg(p),
  };
}

// ---- podcast ---------------------------------------------------------------
const podcast = all
  .filter((p) => p.type === "podcast" && p.status === "publish")
  .map((p) => {
    const epNum = parseInt((p.title.match(/Ep\s*0*(\d+)/i) || [])[1] || "0", 10);
    return {
      id: p.id,
      slug: p.slug,
      number: epNum,
      title: decodeEntities(p.title.replace(/^EP?\s*0*\d+:\s*/i, "").trim()),
      fullTitle: decodeEntities(p.title.trim()),
      // Drop the inline Captivate player div — the episode template renders its own.
      html: cleanContent(p.content).replace(
        /<div[^>]*>\s*<iframe[^>]*player\.captivate\.fm[^>]*>\s*<\/iframe>\s*<\/div>/gi,
        ""
      ),
      image: featuredImg(p) || (p.content.match(/image="(\d+)"/) ? mediaSrc(p.content.match(/image="(\d+)"/)[1]) : ""),
      captivate: (p.content.match(/player\.captivate\.fm\/episode\/[\w-]+/) || [])[0] || "",
    };
  })
  .sort((a, b) => a.number - b.number);

// ---- videos (dt_portfolio with Muse.ai embeds) -----------------------------
const videos = all
  .filter((p) => p.type === "dt_portfolio" && p.status === "publish")
  .map((p) => {
    const cleaned = cleanContent(p.content);
    const muse = (cleaned.match(/data-video=["']([\w-]+)["']/) || [])[1] || "";
    const thumb = p.meta["_thumbnail_id"] ? mediaSrc(p.meta["_thumbnail_id"]) : "";
    return { title: decodeEntities(p.title.trim()), muse, thumb };
  })
  .filter((v) => v.muse);
writeFileSync(`${OUT}/videos.json`, JSON.stringify(videos, null, 2));

// ---- client logos (from the Clients page) ---------------------------------
const clientsPage = byId.get("14942");
const clientLogos = clientsPage
  ? [
      ...new Set(
        [...cleanContent(clientsPage.content).matchAll(/<img[^>]*src="([^"]+)"/g)].map(
          (m) => m[1]
        )
      ),
    ].filter((s) => !/logo_white_symbol_bg_500px|Banner\.png|Rebrand\.jpg/i.test(s))
  : [];
writeFileSync(`${OUT}/clients.json`, JSON.stringify(clientLogos, null, 2));

// ---- testimonials ----------------------------------------------------------
const stripTags = (s) => (s || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const testimonials = all
  .filter((p) => p.type === "dt_testimonials" && p.status === "publish")
  .map((p) => ({
    name: decodeEntities(p.title.trim()),
    role: decodeEntities(p.meta["_dt_testimonial_options_position"] || ""),
    quote: decodeEntities(stripTags(p.excerpt)).replace(/^[“"”]+|[“"”]+$/g, "").trim(),
  }))
  .filter((t) => t.quote);
writeFileSync(`${OUT}/testimonials.json`, JSON.stringify(testimonials, null, 2));

// ---- navigation ------------------------------------------------------------
// Flat top-level menu — matches the live kamguru.com structure (parent pages
// only). Sub-pages remain reachable from within Services / Resources.
const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Resources", href: "/resources/" },
  { label: "Videos", href: "/videos/" },
  { label: "Podcast", href: "/podcast/" },
  { label: "Contact", href: "/contact/" },
];

writeFileSync(`${OUT}/pages.json`, JSON.stringify(pages, null, 2));
writeFileSync(`${OUT}/podcast.json`, JSON.stringify(podcast, null, 2));
writeFileSync(`${OUT}/media.json`, JSON.stringify(attachments, null, 2));

writeFileSync(`${OUT}/nav.json`, JSON.stringify(nav, null, 2));

console.log(
  `Extracted ${Object.keys(pages).length} pages, ${podcast.length} podcast episodes, ${testimonials.length} testimonials, ${Object.keys(attachments).length} media items.`
);
