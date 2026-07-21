# Growth-Case Getsafe – Deployment

Bewerbungsarbeit von Norbert Sommer. Drei Seiten, eine App:

- `/` – Case-Seite (These, Demos, System, Builder-Beweis, Kontakt)
- `/kassen-check` – Kampagne 1: GKV-Sparrechner (Getsafe-Look)
- `/pkv-check` – Kampagne 2: PKV-Fit-Check (Getsafe-Look)

## Deployment auf Vercel (ca. 10 Minuten)

**Weg A – über GitHub (empfohlen, wie bei fight-evolution.de):**
1. Neues GitHub-Repo anlegen (privat reicht), diesen Ordner pushen
2. vercel.com → "Add New Project" → Repo importieren
3. Framework wird automatisch als Vite erkannt – nichts ändern, "Deploy"
4. Eigene Domain unter Project → Settings → Domains verbinden

**Weg B – direkt per CLI:**
```bash
npm install
npx vercel        # Login + Projekt anlegen
npx vercel --prod # Produktiv-Deployment
```

## Vor dem Versand ausfüllen (Checkliste)

- [ ] `src/pages/Home.jsx`: `KONTAKT_EMAIL` durch echte Adresse ersetzen
- [ ] `src/pages/Home.jsx`: "NS"-Kreis optional durch Foto ersetzen
      (Bild nach `public/portrait.jpg`, dann `<img src="/portrait.jpg" .../>`)
- [ ] Domain entscheiden (persönlich, ohne "getsafe" im Namen)
- [ ] Einmal komplett durchklicken – beide Demos, alle Ergebnispfade des Fit-Checks
- [ ] Auf dem Handy testen (das Hiring-Team öffnet den Link mobil)

## Technische Hinweise

- `noindex, nofollow` ist in `index.html` gesetzt – die Seite taucht nicht in Google auf
- Es werden keine personenbezogenen Daten erhoben, keine Cookies, kein Tracking
- Tailwind läuft über CDN (bewusst: einfach, ausreichend für eine Demo)
- Kein Backend nötig – reines Static Hosting, Vercel-Free-Tier reicht

## Lokal testen

```bash
npm install
npm run dev   # http://localhost:5173
```
