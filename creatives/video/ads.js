// Produziert die Ad-Creatives: Hook-1-Video (11 s) + Screenshot-Mockups
// (Meta-Feed x3, Google-RSA x2). Ausgabe nach creatives/ads/.
const { chromium } = require("playwright");
const { execFileSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const FF = require("ffmpeg-static");

const SZENEN = path.join(__dirname, "szenen-ads");
const OUT = path.join(__dirname, "..", "ads");
const TMP = path.join(__dirname, "aufnahmen");
const HOOK_DAUER = 11;

const dateiUrl = (name) =>
  "file:///" + path.join(SZENEN, name).replace(/\\/g, "/");

// `node ads.js mockups` ueberspringt die Hook-Video-Aufnahme
const nurMockups = process.argv[2] === "mockups";

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  fs.mkdirSync(TMP, { recursive: true });
  const browser = await chromium.launch();

  // 1. Hook-1-Video aufnehmen (540x960 nativ, ffmpeg skaliert auf 1080x1920)
  if (!nurMockups) {
    const context = await browser.newContext({
      viewport: { width: 540, height: 960 },
      recordVideo: { dir: TMP, size: { width: 540, height: 960 } },
    });
    const page = await context.newPage();
    await page.goto(dateiUrl("hook1.html"), { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    await page.evaluate(() => window.startHook());
    await page.waitForTimeout(HOOK_DAUER * 1000);
    await page.close();
    await context.close();
    const neueste = fs
      .readdirSync(TMP)
      .filter((f) => f.endsWith(".webm") && !f.startsWith("szene"))
      .map((f) => ({ f, t: fs.statSync(path.join(TMP, f)).mtimeMs }))
      .sort((a, b) => b.t - a.t)[0];
    execFileSync(FF, [
      "-y",
      "-sseof", `-${HOOK_DAUER}`,
      "-i", path.join(TMP, neueste.f),
      "-t", String(HOOK_DAUER),
      "-vf", "scale=1080:1920:flags=lanczos,unsharp=5:5:0.6:5:5:0.0,fps=25",
      "-c:v", "libx264", "-preset", "slow", "-crf", "20",
      "-pix_fmt", "yuv420p", "-movflags", "+faststart",
      path.join(OUT, "hook1-zaehler.mp4"),
    ]);
    fs.unlinkSync(path.join(TMP, neueste.f));
    console.log("hook1-zaehler.mp4 fertig");
  }

  // 2. Statische Mockups als Element-Screenshots (Faktor 2 fuer Schaerfe)
  const MOCKUPS = [
    { datei: "meta-feed.html", elemente: ["meta-v1", "meta-v2", "meta-v3"] },
    { datei: "google-rsa.html", elemente: ["rsa-gkv", "rsa-pkv"] },
    { datei: "crm.html", elemente: ["crm-inapp", "crm-push", "crm-email"] },
  ];
  const context = await browser.newContext({
    viewport: { width: 760, height: 1200 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  for (const m of MOCKUPS) {
    await page.goto(dateiUrl(m.datei), { waitUntil: "networkidle" });
    for (const id of m.elemente) {
      await page
        .locator(`#${id}`)
        .screenshot({ path: path.join(OUT, `${id}.png`) });
      console.log(`${id}.png fertig`);
    }
  }
  await context.close();
  await browser.close();
})();
