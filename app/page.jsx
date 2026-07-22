"use client";

import Link from "next/link";
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
