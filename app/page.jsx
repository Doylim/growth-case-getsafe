"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Check,
  Zap,
  Megaphone,
  BarChart3,
  CalendarRange,
  ArrowLeftRight,
} from "lucide-react";
import { track } from "../lib/track";

// Case-Seite (visuelle Fassung): Klammer der Bewerbungsarbeit.
// Bulletpoints statt Absätze, Zahlen-Kacheln, Icons – Inhalte unverändert.

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
      <span className="rounded-full" style={{ width: 8, height: 8, background: C.green }} />
      {children}
    </span>
  );
}

// Bullet mit grünem Haken – Standardbaustein der visuellen Fassung
function Punkt({ children, hell }) {
  return (
    <li className="flex items-start gap-2.5 text-sm leading-relaxed">
      <Check
        size={16}
        strokeWidth={3}
        className="mt-0.5 shrink-0"
        style={{ color: C.green }}
        aria-hidden="true"
      />
      <span style={{ color: hell ? "#C9CCC9" : C.inkSoft }}>{children}</span>
    </li>
  );
}

// Zahlen-Kachel: große Zahl als Blickfang, kleines Label
function Kachel({ wert, label, dunkel }) {
  return (
    <div
      className="rounded-2xl px-4 py-4 text-center"
      style={
        dunkel
          ? { background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)" }
          : { background: C.paper, border: `1px solid ${C.line}` }
      }
    >
      <p
        className="font-black text-2xl mb-0.5"
        style={{ color: dunkel ? "#7CE0B3" : C.greenDark, letterSpacing: "-0.02em" }}
      >
        {wert}
      </p>
      <p className="text-xs font-semibold" style={{ color: dunkel ? "#8A8F8A" : C.inkSoft }}>
        {label}
      </p>
    </div>
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
      <header className="px-5 pt-14 pb-14 sm:pt-20 sm:pb-16" style={{ background: C.ink }}>
        <div className="mx-auto" style={{ maxWidth: 780 }}>
          <p
            className="text-xs font-semibold uppercase mb-5"
            style={{ color: "#7CE0B3", letterSpacing: "0.14em" }}
          >
            Bewerbungsarbeit · (Senior) Growth Creative (AI-native) · Getsafe
          </p>
          <h1
            className="font-black leading-[1.1] text-white mb-5 text-balance"
            style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)", letterSpacing: "-0.03em" }}
          >
            Ich habe kein Anschreiben geschrieben.
            <br />
            Ich habe euren Health-Funnel gebaut.
          </h1>
          <p className="text-base leading-relaxed mb-5" style={{ color: "#C9CCC9" }}>
            <strong style={{ color: "#fff" }}>Die These:</strong> Krankenversicherung
            als zweistufiger Growth-Funnel – gemessen bis zur aktivierten Police,
            nicht bis zum Klick.
          </p>
          <ul className="space-y-2 mb-8">
            <Punkt hell>
              <strong style={{ color: "#fff" }}>Kassen-Check</strong> gewinnt günstig
              Reichweite und Kund:innen
            </Punkt>
            <Punkt hell>
              <strong style={{ color: "#fff" }}>PKV-Fit-Check</strong> qualifiziert
              wertvolle Leads für eure Beratung
            </Punkt>
            <Punkt hell>
              Aktiviert in <strong style={{ color: "#fff" }}>Trigger-Momenten</strong>:
              Beitragserhöhung, Gehaltssprung, Jobwechsel
            </Punkt>
          </ul>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Kachel dunkel wert="2" label="Demos live & klickbar" />
            <Kachel dunkel wert="< 20 €" label="Gesamtkosten" />
            <Kachel dunkel wert="1 Woche" label="Abende, neben dem Job" />
            <Kachel dunkel wert="0" label="Seiten Anschreiben" />
          </div>
        </div>
      </header>

      {/* ── DEMOS ── */}
      <section className="px-5 py-14 sm:py-16">
        <div className="mx-auto" style={{ maxWidth: 780 }}>
          <h2 className="font-black text-2xl mb-6 text-balance" style={{ letterSpacing: "-0.02em" }}>
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
              <p className="font-bold text-lg mt-3 mb-2.5">Kassen-Check (GKV)</p>
              <ul className="space-y-1.5 mb-4">
                <Punkt>Sparpotenzial in 10 Sekunden</Punkt>
                <Punkt>Live-Zähler „bereits verschenkt“</Punkt>
                <Punkt>Übergabe direkt in den Wechsel-Flow</Punkt>
              </ul>
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
              <p className="font-bold text-lg mt-3 mb-2.5">PKV-Fit-Check</p>
              <ul className="space-y-1.5 mb-4">
                <Punkt>5 Fragen, sechs ehrliche Ergebnispfade</Punkt>
                <Punkt>Eligibility-Gate bei 77.400&thinsp;€</Punkt>
                <Punkt>Filtert 20–40-€-Klicks vor der Beratung</Punkt>
              </ul>
              <span
                className="inline-block rounded-full px-5 py-2.5 text-sm font-bold text-white"
                style={{ background: C.ink }}
              >
                Demo öffnen →
              </span>
            </Link>
          </div>

          {/* Verzahnungs-Diagramm statt Absatz */}
          <div
            className="mt-4 rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm font-bold"
            style={{ background: C.card, border: `1px solid ${C.line}` }}
          >
            <span className="rounded-full px-4 py-2 text-white" style={{ background: C.ink }}>
              Kassen-Check
            </span>
            <span className="flex items-center gap-2" style={{ color: C.greenDark }}>
              <ArrowLeftRight size={18} strokeWidth={2.5} aria-hidden="true" />
              <span className="text-xs font-bold uppercase" style={{ letterSpacing: "0.08em" }}>
                verzahnt
              </span>
              <ArrowLeftRight size={18} strokeWidth={2.5} className="sm:hidden" aria-hidden="true" />
            </span>
            <span className="rounded-full px-4 py-2 text-white" style={{ background: C.ink }}>
              PKV-Fit-Check
            </span>
            <span className="sm:ml-2" style={{ color: C.inkSoft, fontWeight: 600 }}>
              Kein Lead geht verloren.
            </span>
          </div>
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
          <h2 className="font-black text-2xl mb-3 text-white text-balance" style={{ letterSpacing: "-0.02em" }}>
            Die Creatives zur Kampagne
          </h2>
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {["Szenen als Code", "Playwright als Kamera", "ffmpeg als Schnitt", "ElevenLabs als Stimme"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full px-3 py-1 text-xs font-bold"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.12)",
                    color: "#C9CCC9",
                  }}
                >
                  {t}
                </span>
              )
            )}
            <span className="text-xs font-semibold" style={{ color: "#7CE0B3" }}>
              → jedes Asset in Minuten neu renderbar
            </span>
          </div>

          {/* Videos */}
          <div className="grid sm:grid-cols-2 gap-4 mb-3">
            <div>
              <video
                controls
                playsInline
                preload="metadata"
                className="w-full rounded-2xl"
                style={{ aspectRatio: "9/16", background: "#000" }}
                src="/creatives/kassen-check-spot-vo.mp4"
              />
              <p className="text-xs mt-2 font-semibold text-white">Der Spot · 21&thinsp;s</p>
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
              <p className="text-xs mt-2 font-semibold text-white">Hook „Der Zähler“ · 11&thinsp;s</p>
              <p className="text-xs" style={{ color: "#8A8F8A" }}>
                Paid-Social-Hook: Count-up auf den echten Seit-Januar-Wert
              </p>
            </div>
          </div>

          {/* Paid Social */}
          <p className="text-sm font-bold text-white mt-8 mb-3">
            Paid Social · drei Feed-Varianten
          </p>
          <div className="grid sm:grid-cols-3 gap-4 items-start">
            <Image src="/creatives/meta-v1.png" alt="Meta-Anzeige: Zähler-Hook mit 428,10 € seit Januar" width={1080} height={1310} className="rounded-xl w-full h-auto" />
            <Image src="/creatives/meta-v2.png" alt="Meta-Anzeige: Vergleich zweier Kassen, 2,18 % vs. 4,39 %" width={1080} height={1270} className="rounded-xl w-full h-auto" />
            <Image src="/creatives/meta-v3.png" alt="Meta-Anzeige: PKV-Eligibility-Frage über 77.400 € Jahresbrutto" width={1080} height={1272} className="rounded-xl w-full h-auto" />
          </div>

          {/* Paid Search */}
          <p className="text-sm font-bold text-white mt-8 mb-3">
            Paid Search · RSA mit Eligibility-Filter vor dem teuren Klick
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Image src="/creatives/rsa-gkv.png" alt="Google-Anzeige zur Suche 'krankenkasse zu teuer'" width={1304} height={634} className="rounded-xl w-full h-auto" />
            <Image src="/creatives/rsa-pkv.png" alt="Google-Anzeige zur Suche 'gkv pkv wechseln' mit 77.400-Euro-Filter" width={1304} height={634} className="rounded-xl w-full h-auto" />
          </div>

          {/* CRM */}
          <p className="text-sm font-bold text-white mt-8 mb-3">
            Bestand &amp; CRM · 500.000+ Kund:innen, Media-Kosten null
          </p>
          <div className="grid sm:grid-cols-3 gap-4 items-start">
            <Image src="/creatives/crm-inapp.png" alt="In-App-Karte: Zahlst du zu viel für deine Krankenkasse?" width={800} height={1120} className="rounded-xl w-full h-auto" />
            <Image src="/creatives/crm-push.png" alt="Push-Nachricht zur Januar-Beitragserhöhung mit Sonderkündigungsrecht" width={800} height={762} className="rounded-xl w-full h-auto" />
            <Image src="/creatives/crm-email.png" alt="E-Mail an das PKV-Segment: Eine Option, die die meisten nie prüfen" width={1184} height={1408} className="rounded-xl w-full h-auto" />
          </div>

          {/* Tracking als Kachel-Zeile */}
          <div className="grid grid-cols-3 gap-3 mt-8">
            <Kachel dunkel wert="11" label="Funnel-Events verkabelt" />
            <Kachel dunkel wert="0" label="Cookies & PII" />
            <Kachel dunkel wert="100 %" label="KPI-Kette bis zur Beratung" />
          </div>
        </div>
      </section>

      {/* ── SYSTEM ── */}
      <section className="px-5 py-14 sm:py-16" style={{ background: C.card }}>
        <div className="mx-auto" style={{ maxWidth: 780 }}>
          <h2 className="font-black text-2xl mb-6 text-balance" style={{ letterSpacing: "-0.02em" }}>
            Das System dahinter
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Zap,
                t: "Trigger statt Dauerfeuer",
                punkte: [
                  "Januar-Erhöhungswelle (Sonderkündigungsrecht)",
                  "Gehaltsrunden und Jobwechsel",
                  "2027-Grenzwert-Reform als News-Aufhänger",
                ],
              },
              {
                icon: Megaphone,
                t: "Vier Kanäle, klare Rollen",
                punkte: [
                  "Paid Search mit Eligibility-Filter",
                  "Paid Social mit dem Zähler als Hook",
                  "SEO-Cluster mit Freshness-Updates",
                  "Bestand: 500.000+ per In-App-Karte, 0 € Media",
                ],
              },
              {
                icon: BarChart3,
                t: "Messung bis zur Police",
                punkte: [
                  "GKV: CTR → Rechner → Antrag → Police → CAC",
                  "PKV: plus Show-up-Rate und Annahmequote",
                  "Nur bis zum Lead messen = falsche Stelle optimieren",
                ],
              },
              {
                icon: CalendarRange,
                t: "90-Tage-Plan",
                punkte: [
                  "0–30: Tracking, CRM-Test, Kassen-Check-MVP",
                  "31–60: Paid-Tests, PKV-Strecke, Framing-Test",
                  "61–90: Skalieren, SEO live, Kanal-Ökonomie",
                ],
              },
            ].map((s) => (
              <div
                key={s.t}
                className="rounded-[24px] p-6"
                style={{ background: C.paper, border: `1px solid ${C.line}` }}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <span
                    className="rounded-xl flex items-center justify-center"
                    style={{ width: 34, height: 34, background: C.greenSoft }}
                  >
                    <s.icon size={18} strokeWidth={2.5} style={{ color: C.greenDark }} aria-hidden="true" />
                  </span>
                  <p className="font-bold">{s.t}</p>
                </div>
                <ul className="space-y-1.5">
                  {s.punkte.map((p) => (
                    <Punkt key={p}>{p}</Punkt>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4 leading-relaxed" style={{ color: C.inkSoft }}>
            Das vollständige Konzept – Anzeigentexte, Creative-Hooks, Videoskript,
            KPI-Ketten, Compliance-Checkliste – liegt als Dokument bei.
          </p>
        </div>
      </section>

      {/* ── BUILDER-BEWEIS ── */}
      <section className="px-5 py-14 sm:py-16">
        <div className="mx-auto" style={{ maxWidth: 780 }}>
          <h2 className="font-black text-2xl mb-2 text-balance" style={{ letterSpacing: "-0.02em" }}>
            Warum ich das kann
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: C.inkSoft }}>
            Ich baue Dinge, die live sind – nicht Konzepte, die in Schubladen liegen.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
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
              <p className="text-xs mb-3" style={{ color: C.inkSoft }}>
                Kampfsportverein, 15+ Jahre · ich ehrenamtlich als Vorstand &amp; Trainer
              </p>
              <ul className="space-y-1.5">
                <Punkt>Marke, Logo, Website von null – Next.js auf Vercel</Punkt>
                <Punkt>KI beantwortet jede Anfrage mit persönlicher Mail</Punkt>
                <Punkt>Botschutz davor – denn jede Mail kostet Geld</Punkt>
              </ul>
            </div>
            <div className="rounded-[24px] p-6" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              <p className="font-bold mb-1">Hauptberuf: Operations &amp; Lean Management</p>
              <p className="text-xs mb-3" style={{ color: C.inkSoft }}>
                Prozesse verschlanken in der Industrie
              </p>
              <ul className="space-y-1.5">
                <Punkt>Testen, messen, Verschwendung eliminieren</Punkt>
                <Punkt>Iterieren statt perfektionieren</Punkt>
                <Punkt>Dieselbe Disziplin wie Growth – andere Werkzeuge</Punkt>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAKING-OF ── */}
      <section className="px-5 py-14 sm:py-16" style={{ background: C.card }}>
        <div className="mx-auto" style={{ maxWidth: 780 }}>
          <h2 className="font-black text-2xl mb-5 text-balance" style={{ letterSpacing: "-0.02em" }}>
            Making-of
          </h2>
          <div className="grid grid-cols-3 gap-3 mb-5">
            <Kachel wert="< 20 €" label="Gesamtkosten" />
            <Kachel wert="1 Woche" label="Abende – neben Job, Verein, Familie" />
            <Kachel wert="100 %" label="selbst entschieden & verantwortet" />
          </div>
          <p className="text-sm leading-relaxed" style={{ color: C.ink }}>
            Recherche und Konzept im Sparring mit Claude, App-Analyse selbst
            durchgespielt, Code und Design AI-gestützt gebaut und von Hand
            nachgeschärft.{" "}
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
            Heidelberg · Builder · AI-native · Deutsch &amp; Englisch
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
