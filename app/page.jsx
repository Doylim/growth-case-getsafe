"use client";

import Link from "next/link";
import Image from "next/image";
import { track } from "../lib/track";

// Case-Seite: Klammer der Bewerbungsarbeit. These → Demos → System → Roadmap →
// Builder-Beweis → Making-of → Kontakt.

const C = {
  ink: "#111210",
  inkSoft: "#626762",
  green: "#12B76A",
  greenDark: "#0B7A4B",
  greenSoft: "#E9F9F1",
  card: "#F6F6F4",
  line: "#E8E8E4",
  paper: "#FFFFFF",
};

const KONTAKT_EMAIL = "n.sommer@invilus.com";

function Chip({ children }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
      style={{ background: C.greenSoft, color: C.greenDark }}
    >
      <span className="rounded-full" style={{ width: 7, height: 7, background: C.green }} />
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: C.paper,
        color: C.ink,
        letterSpacing: "-0.01em",
      }}
    >
      {/* ── HERO ── */}
      <header className="px-5 pt-14 pb-14 sm:pt-20 sm:pb-20" style={{ background: C.ink }}>
        <div className="mx-auto" style={{ maxWidth: 780 }}>
          <p
            className="text-xs font-semibold uppercase mb-5"
            style={{ color: "#7CE0B3", letterSpacing: "0.14em" }}
          >
            Bewerbungsarbeit · (Senior) Growth Creative (AI-native) · Getsafe
          </p>
          <h1
            className="font-black leading-[1.1] text-white mb-6"
            style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)", letterSpacing: "-0.03em" }}
          >
            Ich habe kein Anschreiben geschrieben.
            <br />
            Ich habe euren Health-Funnel gebaut.
          </h1>
          <p className="text-base leading-relaxed mb-4" style={{ color: "#C9CCC9" }}>
            <strong style={{ color: "#fff" }}>Die These:</strong> Krankenversicherung
            als zweistufiger Growth-Funnel. Der{" "}
            <strong style={{ color: "#fff" }}>Kassen-Check</strong> gewinnt günstig
            Reichweite, der <strong style={{ color: "#fff" }}>PKV-Fit-Check</strong>{" "}
            qualifiziert wertvolle Leads für eure Beratung – aktiviert in
            Trigger-Momenten: Beitragserhöhung, Gehaltssprung, Jobwechsel. Gemessen
            bis zur aktivierten Police, nicht bis zum Klick.
          </p>
          <p className="text-sm" style={{ color: "#8A8F8A" }}>
            Beide Strecken sind unten live und klickbar. Gebaut an Abenden einer Woche,
            Gesamtkosten unter 20 €, AI als Betriebssystem.
          </p>
        </div>
      </header>

      {/* ── DEMOS ── */}
      <section className="px-5 py-14 sm:py-16">
        <div className="mx-auto" style={{ maxWidth: 780 }}>
          <h2 className="font-black text-2xl mb-6" style={{ letterSpacing: "-0.02em" }}>
            Die beiden Demos
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/kassen-check"
              onClick={() => track("home_demo_click", { ziel: "kassen-check" })}
              className="block rounded-[24px] p-6 no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(17,18,16,.10)]"
              style={{ background: C.card, border: `1px solid ${C.line}`, color: C.ink }}
            >
              <Chip>Volumen-Play</Chip>
              <p className="font-bold text-lg mt-3 mb-1">Kassen-Check (GKV)</p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.inkSoft }}>
                Sparpotenzial in 10 Sekunden, Live-Zähler „bereits verschenkt“,
                Übergabe in den Wechsel-Flow – der „Spare 1.440 €“-Moment vor der
                Registrierung.
              </p>
              <span
                className="inline-block rounded-full px-5 py-2.5 text-sm font-bold text-white"
                style={{ background: C.ink }}
              >
                Demo öffnen →
              </span>
            </Link>
            <Link
              href="/pkv-check"
              onClick={() => track("home_demo_click", { ziel: "pkv-check" })}
              className="block rounded-[24px] p-6 no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(17,18,16,.10)]"
              style={{ background: C.card, border: `1px solid ${C.line}`, color: C.ink }}
            >
              <Chip>Wert-Play</Chip>
              <p className="font-bold text-lg mt-3 mb-1">PKV-Fit-Check</p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.inkSoft }}>
                5 Fragen, ehrliche Fit-Logik mit Eligibility-Gate (77.400 €), sechs
                Ergebnispfade – filtert 20–40-€-Klicks, bevor eure Beratung Zeit
                investiert.
              </p>
              <span
                className="inline-block rounded-full px-5 py-2.5 text-sm font-bold text-white"
                style={{ background: C.ink }}
              >
                Demo öffnen →
              </span>
            </Link>
          </div>
          <p className="text-sm mt-4 leading-relaxed" style={{ color: C.inkSoft }}>
            Beide Strecken sind verzahnt: Gutverdiener sehen im Kassen-Check die
            PKV-Option, wer nicht in die PKV passt, landet im Kassen-Check. Kein
            Lead geht verloren.
          </p>
        </div>
      </section>

      {/* ── CREATIVES ── */}
      <section className="px-5 py-14 sm:py-16" style={{ background: C.ink }}>
        <div className="mx-auto" style={{ maxWidth: 780 }}>
          <p
            className="text-xs font-semibold uppercase mb-3"
            style={{ color: "#7CE0B3", letterSpacing: "0.14em" }}
          >
            Nicht nur konzipiert – produziert
          </p>
          <h2 className="font-black text-2xl mb-3 text-white" style={{ letterSpacing: "-0.02em" }}>
            Die Creatives zur Kampagne
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "#C9CCC9" }}>
            Alles hier ist im AI-Stack entstanden: Szenen als Code, Playwright als
            Kamera, ffmpeg als Schnittplatz, ElevenLabs als Sprecher. Jedes Asset
            in Minuten reproduzierbar – Copy ändern, neu rendern, testen.
          </p>

          {/* Videos */}
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <video
                controls
                playsInline
                preload="metadata"
                className="w-full rounded-2xl"
                style={{ aspectRatio: "9/16", background: "#000" }}
                src="/creatives/kassen-check-spot-vo.mp4"
              />
              <p className="text-xs mt-2 font-semibold text-white">Der Spot · 21 s</p>
              <p className="text-xs" style={{ color: "#8A8F8A" }}>
                5 Szenen nach Skript, Voiceover, Untertitel – Ton an!
              </p>
            </div>
            <div>
              <video
                controls
                playsInline
                preload="metadata"
                className="w-full rounded-2xl"
                style={{ aspectRatio: "9/16", background: "#000" }}
                src="/creatives/hook1-zaehler.mp4"
              />
              <p className="text-xs mt-2 font-semibold text-white">Hook „Der Zähler" · 11 s</p>
              <p className="text-xs" style={{ color: "#8A8F8A" }}>
                Paid-Social-Hook: Count-up auf den echten Seit-Januar-Wert
              </p>
            </div>
          </div>

          {/* Paid Social */}
          <p className="text-sm font-bold text-white mt-8 mb-3">
            Paid Social · drei Feed-Varianten
          </p>
          <div className="grid grid-cols-3 gap-3">
            <Image src="/creatives/meta-v1.png" alt="Meta-Anzeige: Zähler-Hook mit 428,10 € seit Januar" width={1080} height={1310} className="rounded-xl w-full h-auto" />
            <Image src="/creatives/meta-v2.png" alt="Meta-Anzeige: Vergleich zweier Kassen, 2,18 % vs. 4,39 %" width={1080} height={1270} className="rounded-xl w-full h-auto" />
            <Image src="/creatives/meta-v3.png" alt="Meta-Anzeige: PKV-Eligibility-Frage über 77.400 € Jahresbrutto" width={1080} height={1272} className="rounded-xl w-full h-auto" />
          </div>

          {/* Paid Search */}
          <p className="text-sm font-bold text-white mt-8 mb-3">
            Paid Search · RSA mit Eligibility-Filter vor dem teuren Klick
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <Image src="/creatives/rsa-gkv.png" alt="Google-Anzeige zur Suche 'krankenkasse zu teuer'" width={1304} height={634} className="rounded-xl w-full h-auto" />
            <Image src="/creatives/rsa-pkv.png" alt="Google-Anzeige zur Suche 'gkv pkv wechseln' mit 77.400-Euro-Filter" width={1304} height={634} className="rounded-xl w-full h-auto" />
          </div>

          {/* CRM */}
          <p className="text-sm font-bold text-white mt-8 mb-3">
            Bestand &amp; CRM · 500.000+ Kund:innen, Media-Kosten null
          </p>
          <div className="grid grid-cols-3 gap-3 items-start">
            <Image src="/creatives/crm-inapp.png" alt="In-App-Karte: Zahlst du zu viel für deine Krankenkasse?" width={800} height={1120} className="rounded-xl w-full h-auto" />
            <Image src="/creatives/crm-push.png" alt="Push-Nachricht zur Januar-Beitragserhöhung mit Sonderkündigungsrecht" width={800} height={762} className="rounded-xl w-full h-auto" />
            <Image src="/creatives/crm-email.png" alt="E-Mail an das PKV-Segment: Eine Option, die die meisten nie prüfen" width={1184} height={1408} className="rounded-xl w-full h-auto" />
          </div>

          <p className="text-xs mt-8 leading-relaxed" style={{ color: "#8A8F8A" }}>
            Und alles ist verkabelt: Die Demos tragen ein cookieloses Event-Tracking
            entlang der KPI-Kette – vom Rechner-Start über die PKV-Weiche bis zum
            Beratungs-Klick. Kein Consent-Banner nötig, keine personenbezogenen
            Daten, aber jede Conversion-Frage beantwortbar.
          </p>
        </div>
      </section>

      {/* ── SYSTEM ── */}
      <section className="px-5 py-14" style={{ background: C.card }}>
        <div className="mx-auto" style={{ maxWidth: 780 }}>
          <h2 className="font-black text-2xl mb-6" style={{ letterSpacing: "-0.02em" }}>
            Das System dahinter
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                t: "Trigger statt Dauerfeuer",
                d: "Januar-Erhöhungswelle (Sonderkündigungsrecht), Gehaltsrunden, Jobwechsel, 2027-Grenzwert-Reform als News-Aufhänger.",
              },
              {
                t: "Vier Kanäle, klare Rollen",
                d: "Paid Search mit Eligibility-Filter, Paid Social mit dem Zähler als Hook, SEO-Cluster mit Freshness-Updates. Schnellster ROI: 500.000+ Bestandskund:innen per In-App-Karte – Media-Kosten null.",
              },
              {
                t: "Messung bis zur Police",
                d: "GKV: CTR → Rechner → Antrag → aktivierte Police → CAC/Deckungsbeitrag. PKV: plus Show-up-Rate und Annahmequote. Wer nur bis zum Lead misst, optimiert die falsche Stelle.",
              },
              {
                t: "90-Tage-Plan",
                d: "0–30: Tracking, CRM-Test, Kassen-Check-MVP. 31–60: Paid-Tests, PKV-Strecke, Framing-Experiment. 61–90: Gewinner skalieren, SEO live, Wirtschaftlichkeit je Kanal.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-[24px] p-6"
                style={{ background: C.paper, border: `1px solid ${C.line}` }}
              >
                <p className="font-bold mb-1.5">{s.t}</p>
                <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>
                  {s.d}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4 leading-relaxed" style={{ color: C.inkSoft }}>
            Das vollständige Konzept – Anzeigentexte, Creative-Hooks, Videoskript,
            KPI-Ketten, Compliance-Checkliste – liegt als Dokument bei und ist Teil
            dieser Bewerbung.
          </p>
        </div>
      </section>

      {/* ── BUILDER-BEWEIS ── */}
      <section className="px-5 py-14">
        <div className="mx-auto" style={{ maxWidth: 780 }}>
          <h2 className="font-black text-2xl mb-2" style={{ letterSpacing: "-0.02em" }}>
            Warum ich das kann
          </h2>
          <p className="text-sm mb-6" style={{ color: C.inkSoft }}>
            Ich baue Dinge, die live sind – nicht Konzepte, die in Schubladen liegen.
          </p>
          <div className="space-y-4">
            <div className="rounded-[24px] p-6" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              <p className="font-bold mb-1">
                Fight Evolution Heidelberg e.V.{" "}
                <a
                  href="https://fight-evolution.de"
                  className="text-sm font-semibold underline underline-offset-2"
                  style={{ color: C.greenDark }}
                >
                  fight-evolution.de
                </a>
              </p>
              <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>
                Kampfsportverein, über 15 Jahre Geschichte, 2024 neu aufgestellt – ich
                ehrenamtlich als Vorstand und Trainer. Marke, Logo und Website von
                null: Next.js auf Vercel, Botschutz vorm Probetraining-Formular, KI
                schreibt auf jede Anfrage eine persönliche Antwortmail. AI in
                Produktion – mit Kostenbewusstsein, denn jede automatisierte Mail
                kostet Geld.
              </p>
            </div>
            <div className="rounded-[24px] p-6" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              <p className="font-bold mb-1">Eigene E-Commerce-Marke</p>
              <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>
                Nachhaltige Produkte, eigener Shop plus Amazon. Amazon Ads steuere
                ich selbst: Budget weg von Keywords, die Geld verbrennen, hin zu
                denen, die konvertieren. Learning: Jede Kreatividee braucht eine Zahl
                dahinter.
              </p>
            </div>
            <div className="rounded-[24px] p-6" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              <p className="font-bold mb-1">Self-Publishing & Hauptberuf Operations/Lean</p>
              <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>
                Mehrere Buchprojekte von Idee bis Verkauf im AI-Workflow – nicht
                alles hat funktioniert, genau das ist der Punkt: veröffentlichen,
                messen, lernen. Hauptberuflich verschlanke ich Prozesse in der
                Industrie – dieselbe Disziplin wie Growth: testen, messen, iterieren.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAKING-OF ── */}
      <section className="px-5 py-14" style={{ background: C.card }}>
        <div className="mx-auto" style={{ maxWidth: 780 }}>
          <h2 className="font-black text-2xl mb-4" style={{ letterSpacing: "-0.02em" }}>
            Making-of
          </h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: C.inkSoft }}>
            Recherche, Wettbewerbsanalyse, Funnel-Konzept: im Sparring mit Claude –
            entschieden und verantwortet von mir. App-Analyse: selbst durchgespielt.
            Code, Copy und Design: AI-gestützt gebaut, von Hand nachgeschärft.
            Hosting: Vercel.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: C.ink }}>
            Unter 20 € Gesamtkosten, Abende einer Woche – neben Vollzeitjob,
            Vereinsvorstand und Familie.{" "}
            <strong>
              AI ist kein Trend in meinem Werkzeugkasten. Es ist der Werkzeugkasten.
            </strong>
          </p>
        </div>
      </section>

      {/* ── KONTAKT ── */}
      <footer className="px-5 py-16" style={{ background: C.ink }}>
        <div className="mx-auto text-center" style={{ maxWidth: 560 }}>
          <div
            className="mx-auto mb-5 rounded-full flex items-center justify-center font-black text-2xl text-white"
            style={{ width: 88, height: 88, background: C.greenDark }}
          >
            NS
          </div>
          <p className="font-bold text-xl text-white mb-1">Norbert Sommer</p>
          <p className="text-sm mb-7" style={{ color: "#C9CCC9" }}>
            Heidelberg · Builder · AI-native · Deutsch & Englisch
          </p>
          <a
            href={`mailto:${KONTAKT_EMAIL}?subject=Growth%20Creative%20%E2%80%93%20lass%20uns%20sprechen`}
            className="inline-block rounded-full px-8 py-4 font-bold no-underline mb-8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(11,122,75,.35)]"
            style={{ background: C.greenDark, color: "#fff" }}
          >
            Lass uns sprechen
          </a>
          <p className="text-xs leading-relaxed" style={{ color: "#8A8F8A" }}>
            Private Bewerbungsarbeit von Norbert Sommer, keine Verbindung zur
            Getsafe GmbH. Die Demos sind Konzept-Prototypen ohne Vermittlungs- oder
            Beratungsfunktion; es werden keine personenbezogenen Daten erhoben.
            Markennamen gehören ihren jeweiligen Inhabern. © 2026 Norbert Sommer
          </p>
        </div>
      </footer>
    </div>
  );
}
