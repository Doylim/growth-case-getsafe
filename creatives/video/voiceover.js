// Voiceover-Schicht: erzeugt die 5 Sprecherzeilen via ElevenLabs-API und mischt
// sie zeitversetzt unter den Spot. Voraussetzung: ELEVENLABS_API_KEY gesetzt.
// Aufruf: node voiceover.js  →  kassen-check-spot-25s-vo.mp4
const { execFileSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const FF = require("ffmpeg-static");

// Key aus Umgebung oder lokaler .env-Datei (nicht im Repo) laden
let KEY = process.env.ELEVENLABS_API_KEY;
const envDatei = path.join(__dirname, ".env");
if (!KEY && fs.existsSync(envDatei)) {
  const m = fs
    .readFileSync(envDatei, "utf8")
    .match(/ELEVENLABS_API_KEY\s*=\s*"?([^"\r\n]+)"?/);
  if (m) KEY = m[1].trim();
}
if (!KEY) {
  console.error(
    "ELEVENLABS_API_KEY fehlt – als Umgebungsvariable setzen oder in creatives/video/.env ablegen."
  );
  process.exit(1);
}

// Maennliche Stimme, natuerlicher Erzaehlton (ElevenLabs "Daniel", Multilingual v2)
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "onwK4e9ZLuTAKqWW03F9";

// Zeilen + Startzeitpunkte (Sekunden) – Timeline der gestrafften Fassung:
// S1 0-2,8 · S2 2,8-7,0 · S3 7,0-12,5 · S4 12,5-17,2 · S5 17,2-20,7
const ZEILEN = [
  { t: 0.25, text: "Hier verlierst du jeden Monat Geld." },
  { t: 3.1, text: "Bis zu 770 Euro im Jahr – zurück in deine Tasche." },
  { t: 7.4, text: "Zwei Regler. Zehn Sekunden. Deine Ersparnis." },
  { t: 12.9, text: "Wechseln? Fünf Minuten. Den Rest übernimmt die neue Kasse." },
  { t: 17.5, text: "Kassen-Check. Hol dir dein Geld zurück." },
];

const DIR = path.join(__dirname, "voiceover");
fs.mkdirSync(DIR, { recursive: true });

(async () => {
  // 1. Zeilen als MP3 erzeugen
  for (let i = 0; i < ZEILEN.length; i++) {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: { "xi-api-key": KEY, "Content-Type": "application/json" },
        body: JSON.stringify({
          text: ZEILEN[i].text,
          model_id: "eleven_multilingual_v2",
          voice_settings: { stability: 0.4, similarity_boost: 0.8, style: 0.25 },
        }),
      }
    );
    if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);
    fs.writeFileSync(
      path.join(DIR, `zeile${i + 1}.mp3`),
      Buffer.from(await res.arrayBuffer())
    );
    console.log(`zeile${i + 1}.mp3 erzeugt`);
  }

  // 2. Zeitversetzt mischen und unter das Video legen
  const inputs = ["-i", path.join(__dirname, "kassen-check-spot.mp4")];
  ZEILEN.forEach((_, i) => inputs.push("-i", path.join(DIR, `zeile${i + 1}.mp3`)));
  const delays = ZEILEN.map(
    (z, i) => `[${i + 1}:a]adelay=${Math.round(z.t * 1000)}|${Math.round(z.t * 1000)}[a${i}]`
  ).join(";");
  const mix = ZEILEN.map((_, i) => `[a${i}]`).join("");
  execFileSync(FF, [
    "-y", ...inputs,
    "-filter_complex",
    `${delays};${mix}amix=inputs=${ZEILEN.length}:normalize=0,apad[aout]`,
    "-map", "0:v", "-map", "[aout]",
    "-c:v", "copy", "-c:a", "aac", "-b:a", "160k",
    "-t", "20.7", "-movflags", "+faststart",
    path.join(__dirname, "kassen-check-spot-vo.mp4"),
  ]);
  console.log("kassen-check-spot-vo.mp4 fertig");
})();
