// Voiceover-Schicht: erzeugt die 5 Sprecherzeilen via ElevenLabs-API und mischt
// sie zeitversetzt unter den Spot. Voraussetzung: ELEVENLABS_API_KEY gesetzt.
// Aufruf: node voiceover.js  →  kassen-check-spot-25s-vo.mp4
const { execFileSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const FF = require("ffmpeg-static");

const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) {
  console.error("ELEVENLABS_API_KEY ist nicht gesetzt – Abbruch.");
  process.exit(1);
}

// Deutsche Stimme, warm (ElevenLabs Multilingual v2)
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "EXAVITQu4vr4xnSDxMaL";

// Zeilen + Startzeitpunkte (Sekunden) nach dem Videoskript
const ZEILEN = [
  { t: 0.3, text: "Diese Abbuchung ist bei dir zu hoch. Vermutlich." },
  { t: 3.4, text: "Gleiche Grundleistungen. Bis zu 770 Euro Unterschied pro Jahr." },
  { t: 8.6, text: "Zieh zwei Regler. Sieh, was du verschenkst." },
  { t: 15.4, text: "Wechsel in fünf Minuten. Die neue Kasse kündigt die alte." },
  { t: 21.4, text: "Kassen-Check. Ohne Papierkram." },
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
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
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
  const inputs = ["-i", path.join(__dirname, "kassen-check-spot-25s.mp4")];
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
    "-t", "25", "-movflags", "+faststart",
    path.join(__dirname, "kassen-check-spot-25s-vo.mp4"),
  ]);
  console.log("kassen-check-spot-25s-vo.mp4 fertig");
})();
