// Nimmt die 5 Szenen des 25s-Spots als WebM auf (540x960 Viewport, 1080x1920 Video).
// Szene 3 ist ein echtes Screenrecording des Kassen-Check-Rechners (Dev-Server Port 3000).
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const OUT = path.join(__dirname, "aufnahmen");
const SZENEN_DIR = path.join(__dirname, "szenen");
// Nativ im Viewport-Mass aufnehmen (Playwright skaliert nicht hoch);
// das Upscaling auf 1080x1920 macht ffmpeg beim Schnitt.
const VIEWPORT = { width: 540, height: 960 };
const VIDEO = { width: 540, height: 960 };

const dateiUrl = (name) =>
  "file:///" + path.join(SZENEN_DIR, name).replace(/\\/g, "/");

// Szenenplan: Quelle + Dauer (ms) nach dem Videoskript im Konzept
const PLAN = [
  { name: "szene1", url: dateiUrl("szene1.html"), dauer: 3000 },
  { name: "szene2", url: dateiUrl("szene2.html"), dauer: 5000 },
  { name: "szene3", url: "http://localhost:3000/kassen-check", dauer: 7000, live: true },
  { name: "szene4", url: dateiUrl("szene4.html"), dauer: 6000 },
  { name: "szene5", url: dateiUrl("szene5.html"), dauer: 4000 },
];

// Szene 3: Regler ziehen, Ergebnis live, Untertitel einblenden
async function szene3Regie(page) {
  // Untertitel im Look der anderen Szenen injizieren
  await page.evaluate(() => {
    const cap = document.createElement("div");
    cap.textContent = "Zieh zwei Regler. Sieh, was du verschenkst.";
    cap.style.cssText = [
      "position:fixed", "left:24px", "right:24px", "bottom:64px", "z-index:9999",
      "text-align:center", "font-size:29px", "line-height:1.25", "font-weight:900",
      "letter-spacing:-0.02em", "color:#111210", "background:rgba(255,255,255,.92)",
      "border-radius:20px", "padding:14px 18px",
      "box-shadow:0 12px 40px rgba(17,18,16,.14)",
      "opacity:0", "transition:opacity .4s ease",
    ].join(";");
    document.body.appendChild(cap);
    setTimeout(() => (cap.style.opacity = "1"), 600);
  });

  // Zum Rechner scrollen
  await page.evaluate(() => {
    document.querySelector("#rechner")?.scrollIntoView({ block: "center", behavior: "instant" });
  });
  await page.waitForTimeout(700);

  // Brutto-Slider animiert von 3500 auf 6600 ziehen, danach Zusatzbeitrag auf 3,9 %
  await page.evaluate(async () => {
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype, "value"
    ).set;
    const zieh = async (el, von, bis, schritte, pause) => {
      for (let i = 0; i <= schritte; i++) {
        setter.call(el, String(von + ((bis - von) * i) / schritte));
        el.dispatchEvent(new Event("input", { bubbles: true }));
        await new Promise((r) => setTimeout(r, pause));
      }
    };
    const brutto = document.getElementById("brutto-slider");
    const zusatz = document.getElementById("zusatz-slider");
    await new Promise((r) => setTimeout(r, 300));
    await zieh(brutto, 3500, 6600, 30, 55);   // ~1,7 s
    await new Promise((r) => setTimeout(r, 700));
    await zieh(zusatz, 3.13, 3.9, 18, 50);    // ~0,9 s
  });
  // Rest der Dauer: Ergebnis-Chip + tickender Zaehler stehen im Bild
}

// Optional: nur eine Szene neu aufnehmen, z. B. `node record.js szene5`
const nurSzene = process.argv[2];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();

  for (const szene of PLAN.filter((s) => !nurSzene || s.name === nurSzene)) {
    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: 2,
      recordVideo: { dir: OUT, size: VIDEO },
    });
    const page = await context.newPage();
    await page.goto(szene.url, { waitUntil: "networkidle" });
    const start = Date.now();
    if (szene.live) await szene3Regie(page);
    const rest = szene.dauer - (Date.now() - start);
    if (rest > 0) await page.waitForTimeout(rest);
    await page.close();
    await context.close();

    // Playwright vergibt Zufallsnamen – auf Szenennamen umbenennen
    const neueste = fs
      .readdirSync(OUT)
      .filter((f) => f.endsWith(".webm") && !f.startsWith("szene"))
      .map((f) => ({ f, t: fs.statSync(path.join(OUT, f)).mtimeMs }))
      .sort((a, b) => b.t - a.t)[0];
    fs.renameSync(path.join(OUT, neueste.f), path.join(OUT, `${szene.name}.webm`));
    console.log(`${szene.name}.webm aufgenommen (${szene.dauer} ms)`);
  }

  await browser.close();
})();
