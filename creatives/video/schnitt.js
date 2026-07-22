// Schnitt: pro Szene die Ladezeit am Anfang wegschneiden (letzte N Sekunden
// behalten), auf 1080x1920 hochskalieren, nachschaerfen, zu einem MP4 fuegen.
const { execFileSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const FF = require("ffmpeg-static");

const DIR = path.join(__dirname, "aufnahmen");
const PLAN = [
  { name: "szene1", dauer: 3 },
  { name: "szene2", dauer: 5 },
  { name: "szene3", dauer: 7 },
  { name: "szene4", dauer: 6 },
  { name: "szene5", dauer: 4 },
];

// 1. Jede Szene: letzte N Sekunden behalten, hochskalieren, als MP4-Zwischenclip
for (const s of PLAN) {
  execFileSync(FF, [
    "-y",
    "-sseof", `-${s.dauer}`,
    "-i", path.join(DIR, `${s.name}.webm`),
    "-t", String(s.dauer),
    "-vf",
    "scale=1080:1920:flags=lanczos,unsharp=5:5:0.6:5:5:0.0,fps=25",
    "-c:v", "libx264", "-preset", "slow", "-crf", "20",
    "-pix_fmt", "yuv420p",
    path.join(DIR, `${s.name}_clip.mp4`),
  ]);
  console.log(`${s.name}: auf ${s.dauer}s getrimmt + skaliert`);
}

// 2. Clips verlustfrei zusammenfuegen
const liste = path.join(DIR, "liste.txt");
fs.writeFileSync(
  liste,
  PLAN.map((s) => `file '${s.name}_clip.mp4'`).join("\n")
);
execFileSync(FF, [
  "-y", "-f", "concat", "-safe", "0",
  "-i", liste,
  "-c", "copy", "-movflags", "+faststart",
  path.join(__dirname, "kassen-check-spot-25s.mp4"),
]);
console.log("kassen-check-spot-25s.mp4 fertig");
