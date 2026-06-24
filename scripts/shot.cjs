const { chromium } = require("/opt/node22/lib/node_modules/playwright");

(async () => {
  const base = process.argv[2] || "http://localhost:8080";
  const routes = process.argv.slice(3);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1320, height: 900 } });
  // Don't hang on media that falls back to the (blocked) live site.
  await page.route("**/*", (route) =>
    route.request().url().includes("kamguru.com") ? route.abort() : route.continue()
  );
  for (const r of routes) {
    try {
      await page.goto(base + r, { waitUntil: "load", timeout: 20000 });
    } catch (e) {
      console.log("warn", r, e.message);
    }
    await page.waitForTimeout(600);
    const name = r === "/" ? "home" : r.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "");
    await page.screenshot({ path: `/tmp/shot-${name}.png`, fullPage: true });
    console.log("shot", r, "-> /tmp/shot-" + name + ".png");
  }
  await browser.close();
})();
