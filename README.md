# Growth-Case Getsafe

Bewerbungsarbeit für die Position **(Senior) Growth Creative (AI-native)** bei Getsafe –
statt eines Anschreibens: ein klickbarer Health-Funnel.

**Live:** https://growth-case-getsafe.vercel.app

## Was hier liegt

- **Case-Seite** (`app/page.jsx`) – die Klammer der Bewerbung: These, Demos, Creatives, System, Making-of
- **Kassen-Check** (`app/kassen-check/`) – Volumen-Play: GKV-Sparrechner mit Live-Zähler im Getsafe-Look
- **PKV-Fit-Check** (`app/pkv-check/`) – Wert-Play: 5 Fragen, sechs ehrliche Ergebnispfade, hartes Eligibility-Gate
- **Cookieloses Tracking** (`app/api/track/`, `lib/track.js`) – 11 Funnel-Events, Allowlists, Rate-Limit, ohne Cookies und Nutzer-IDs
- **Creatives** (`creatives/`, `public/creatives/`) – Spot, Hook-Video, Meta-/RSA-/CRM-Assets; Szenen als Code, Playwright als Kamera, ffmpeg als Schnitt, ElevenLabs als Stimme
- **Konzept** (`growth_case_getsafe.md`, `messkonzept.md`) – Kampagnenlogik, KPI-Ketten, Messkonzept

## Wie es entstand

Gebaut in einer Woche, abends – AI-nativ mit Claude Code, ohne Web-Entwicklungs-Hintergrund
und ohne einen Euro Zusatzkosten (nur das bestehende Claude-Abo). Die Commit-Historie
dieses Repos ist Teil der Arbeit: Sie zeigt, wie das Projekt iterativ mit AI entstanden ist.

**Stack:** Next.js (App Router) · React · Vercel · Playwright · ffmpeg · ElevenLabs

## Rechtlicher Hinweis

Private Bewerbungsarbeit von Norbert Sommer, **keine Verbindung zur Getsafe GmbH**.
Die Demos sind Konzept-Prototypen ohne Vermittlungs- oder Beratungsfunktion.
Markennamen und Gestaltungselemente werden ausschließlich zu Demonstrationszwecken
referenziert und gehören ihren jeweiligen Inhabern.

© 2026 Norbert Sommer
