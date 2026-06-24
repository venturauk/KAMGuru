// Generates data/media-local.json: the set of media filenames that are present
// locally under public/wp-content/uploads. The site serves these from the repo
// and falls back to the live WordPress site for anything not yet migrated.
// Run automatically before build (see vercel.json / package.json).
import { readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const DIR = "public/wp-content/uploads";
const names = new Set();

function walk(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else names.add(entry); // match by basename (uploads are flat)
  }
}

walk(DIR);
writeFileSync("data/media-local.json", JSON.stringify([...names].sort()));
console.log(`media-local.json: ${names.size} local media files`);
