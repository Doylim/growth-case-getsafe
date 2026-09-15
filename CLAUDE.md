# CLAUDE.md – Getsafe-Bewerbung (Growth-Case Getsafe)

## Zweck und Status
Bewerbungsarbeit von Norbert für „(Senior) Growth Creative (AI-native)“ bei Getsafe:
Case-Seite plus zwei klickbare Funnel-Demos (`/kassen-check`, `/pkv-check`). Am
23.07.2026 versendet, Git-Tag `versandstand-v3` ist der versendete Stand. Das Projekt
ist abgeschlossen, die Live-Seite per `proxy.js` abgeschaltet.

Aktueller Stand und offene Entscheidungen: `C:\Projekte\STATUS.md` und die Protokolle
`C:\Projekte\_fundament\protokolle\*getsafe-bewerbung*`.

## Regeln
- Inhalt, Code und Repo nur auf ausdrücklichen Wunsch von Norbert ändern. Die
  Commit-Historie ist laut README Teil der Arbeitsprobe, also keine Aufräum-Commits.
- Keine Angleichung an den Webseiten-Standard (JSX statt TypeScript, kein `src/`,
  kein shadcn). Das Projekt bleibt, wie es versendet wurde.
- Das GitHub-Repo `Doylim/growth-case-getsafe` ist öffentlich einsehbar gewesen: keine
  internen Notizen und keine privaten Unterlagen committen. `public/*.docx` bleibt
  per `.gitignore` ausgeschlossen.
- Wer das Tracking ändert, zieht die Datenschutz-Hinweise auf der Seite und
  `messkonzept.md` mit. `app/api/track` schreibt Events nur als Log-Zeile in die
  Vercel-Runtime-Logs, ohne Cookies, IDs und Datenbank; die Seite sagt genau das.

## Demo-Schalter `proxy.js`
- `DEMO_ABGESCHALTET = true`: Jede Route inklusive `/api/track` und statischer Assets
  liefert 410 Gone mit Hinweisseite, `noindex` und `no-store`.
- Wiedereinschalten: auf `false` setzen, committen, pushen. Danach prüfen:
  `curl.exe -sI https://growth-case-getsafe.vercel.app/kassen-check` muss 200 liefern.
- Lokal prüfen mit `npm run build` und `npm run start`.

## Hosting und Deploy
- Vercel-Projekt `growth-case-getsafe`, deployt automatisch bei Push auf `main`
  (GitHub-Integration). Einen anderen Deploy-Weg gibt es nicht.
- Das Projekt liegt **nicht** im Vercel-Account der MCP-Tools (Team `doylims-projects`).
  Pausieren, Löschen oder Env-Änderungen per MCP scheitern mit 404.
- `vercel.json` ruft `scripts/vercel-build-noetig.sh` auf: Pushes, die nur `*.md`,
  `protokolle/`, `docs/`, `.claude/` oder `.github/` ändern, bauen nicht. Das Skript
  ist eine Kopie von `C:\Projekte\_fundament\templates\vercel\vercel-build-noetig.sh`
  und wird dort geändert.

## Creatives `creatives/video/`
- Eigenes Node-Paket (Playwright, `ffmpeg-static`) mit eigener `package.json`,
  unabhängig vom Next-Projekt.
- Spot: `node record.js` (Szene 3 braucht den Dev-Server auf Port 3000), dann
  `node schnitt.js`, dann `node voiceover.js`. Ad-Creatives: `node ads.js` nach
  `creatives/ads/`. Ausgeliefert werden die Kopien in `public/creatives/`.
- `voiceover.js` braucht `ELEVENLABS_API_KEY`, optional `ELEVENLABS_VOICE_ID`, aus der
  Umgebung oder aus `creatives/video/.env` (nicht im Repo).
