"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { track } from "../../lib/track";

// ─────────────────────────────────────────────────────────────────────────────
// Kampagnen-Landingpage im Getsafe-Look (1:1 Design-Sprache der Live-Seite
// hellogetsafe.com/de-de, Stand Juli 2026): zweiteilige Headlines, schwarze
// Pill-CTAs, Empfehlungs-Chips, Du-Tonalität, Trust-Riegel, 15-min-Beratung.
// Logo = Platzhalter. Konzept-Demo, keine Seite der Getsafe GmbH.
// ─────────────────────────────────────────────────────────────────────────────

const BBG_MONAT = 5812.5;
const JAEG_JAHR = 77400; // Versicherungspflichtgrenze 2026
const GUENSTIGSTE = 2.18;
const TEUERSTE = 4.39;
// Realer, mitgliedergewichteter Durchschnitt 2026 (amtlicher Wert des
// Schätzerkreises: 2,9 % – der tatsächliche Marktdurchschnitt liegt darüber)
const DURCHSCHNITT = 3.13;

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

const fmt = (n, d = 0) =>
  n.toLocaleString("de-DE", { minimumFractionDigits: d, maximumFractionDigits: d });

// Bullet mit grünem Haken (gleicher Baustein wie auf der Case-Seite)
function Haken({ children }) {
  return (
    <li className="flex items-start gap-2 text-sm leading-relaxed">
      <Check
        size={16}
        strokeWidth={3}
        className="mt-0.5 shrink-0"
        style={{ color: C.green }}
        aria-hidden="true"
      />
      <span style={{ color: C.inkSoft }}>{children}</span>
    </li>
  );
}

const yearStart = new Date(2026, 0, 1).getTime();
const yearEnd = new Date(2027, 0, 1).getTime();

// ─── Rechner (Hero-Visual im Produktkarten-Stil) ─────────────────────────────

function Rechner() {
  const [brutto, setBrutto] = useState(3500);
  const [zusatz, setZusatz] = useState(DURCHSCHNITT);
  const [kennt, setKennt] = useState(true);
  const [now, setNow] = useState(null);

  // Funnel-Events nur einmal pro Besuch melden
  const startGemeldet = useRef(false);
  const karteGemeldet = useRef(false);
  const meldeStart = () => {
    if (!startGemeldet.current) {
      startGemeldet.current = true;
      track("kc_rechner_start");
    }
  };
  useEffect(() => {
    if (brutto * 12 > JAEG_JAHR && !karteGemeldet.current) {
      karteGemeldet.current = true;
      track("kc_pkv_card_view");
    }
  }, [brutto]);

  useEffect(() => {
    setNow(Date.now());
    // 250 ms reichen optisch völlig (2 Nachkommastellen) – 100 ms wären
    // 10 Re-Render/s der ganzen Karte umsonst
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, []);

  const rate = kennt ? zusatz : DURCHSCHNITT;

  const calc = useMemo(() => {
    const einkommen = Math.min(brutto, BBG_MONAT);
    const diff = Math.max(rate - GUENSTIGSTE, 0);
    const sparenMonat = ((diff / 100) * einkommen) / 2;
    const sparenJahr = sparenMonat * 12;
    const elapsed =
      now === null
        ? 0
        : Math.min(Math.max((now - yearStart) / (yearEnd - yearStart), 0), 1);
    return { sparenMonat, sparenJahr, verloren: sparenJahr * elapsed };
  }, [brutto, rate, now]);

  const lohnt = calc.sparenJahr >= 1;

  return (
    <div
      className="w-full rounded-[28px] p-6 sm:p-7"
      style={{
        maxWidth: 440,
        background: C.paper,
        border: `1px solid ${C.line}`,
        boxShadow: "0 20px 60px rgba(17,18,16,.08)",
      }}
    >
      {/* Kopf im Produktkarten-Stil */}
      <div className="flex items-center gap-3 mb-5">
        {/* design:keep — Emoji-Icon ist bewusste Nachbildung der Getsafe-Produktkarten-Optik */}
        <div
          className="rounded-2xl flex items-center justify-center text-xl"
          style={{ width: 48, height: 48, background: C.card }}
          aria-hidden="true"
        >
          🍏
        </div>
        <div>
          <p className="font-bold leading-tight">Gesetzliche Krankenversicherung</p>
          <p className="text-xs" style={{ color: C.inkSoft }}>
            Kassen-Check · dauert 10 Sekunden
          </p>
        </div>
      </div>

      {/* Brutto */}
      <div className="flex items-baseline justify-between mb-1.5">
        <label htmlFor="brutto-slider" className="text-sm font-semibold">
          Dein Bruttogehalt
        </label>
        <span className="font-bold">
          {fmt(brutto)} €
          <span className="text-xs font-medium" style={{ color: C.inkSoft }}>
            {" "}/ Monat
          </span>
        </span>
      </div>
      <input
        id="brutto-slider"
        type="range"
        min={1000}
        max={8000}
        step={50}
        value={brutto}
        onChange={(e) => {
          meldeStart();
          setBrutto(Number(e.target.value));
        }}
        style={{
          background: `linear-gradient(to right, ${C.ink} ${((brutto - 1000) / 7000) * 100}%, ${C.line} 0%)`,
        }}
      />

      {/* Zusatzbeitrag */}
      <div className="flex items-baseline justify-between mt-5 mb-1.5">
        <label htmlFor="zusatz-slider" className="text-sm font-semibold">
          Zusatzbeitrag deiner Kasse
        </label>
        {kennt && <span className="font-bold">{fmt(zusatz, 2)} %</span>}
      </div>
      {kennt ? (
        <>
          <input
            id="zusatz-slider"
            type="range"
            min={GUENSTIGSTE}
            max={TEUERSTE}
            step={0.01}
            value={zusatz}
            onChange={(e) => {
              meldeStart();
              setZusatz(Number(e.target.value));
            }}
            style={{
              background: `linear-gradient(to right, ${C.ink} ${((zusatz - GUENSTIGSTE) / (TEUERSTE - GUENSTIGSTE)) * 100}%, ${C.line} 0%)`,
            }}
          />
          <div className="flex justify-between text-xs mt-1" style={{ color: C.inkSoft }}>
            <span>2,18 % günstigste</span>
            <span>4,39 % teuerste</span>
          </div>
        </>
      ) : (
        <p
          className="rounded-xl px-3.5 py-2.5 text-sm"
          style={{ background: C.card }}
        >
          Alles klar – wir rechnen mit dem realen Durchschnitt von{" "}
          <strong>{fmt(DURCHSCHNITT, 2)} %</strong>.
        </p>
      )}
      <button
        onClick={() => setKennt(!kennt)}
        className="text-xs font-semibold mt-0.5 py-2 -mb-2 underline underline-offset-2 cursor-pointer"
        style={{ color: C.inkSoft }}
      >
        {kennt ? "Ich kenne meinen Zusatzbeitrag nicht" : "Zusatzbeitrag doch eingeben"}
      </button>

      {/* Ergebnis */}
      <div className="mt-6 pt-6" style={{ borderTop: `1px solid ${C.line}` }}>
        {lohnt ? (
          <>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold mb-3"
              style={{ background: C.greenSoft, color: C.greenDark }}
            >
              <span
                className="rounded-full"
                style={{ width: 8, height: 8, background: C.green }}
              />
              Spare {fmt(calc.sparenJahr)} € / Jahr
            </span>
            <p className="text-sm mb-1" style={{ color: C.inkSoft }}>
              Das sind{" "}
              <strong style={{ color: C.ink }}>{fmt(calc.sparenMonat, 2)} € netto</strong>{" "}
              mehr pro Monat – bei gleichen gesetzlichen Grundleistungen.
            </p>
            <p className="text-xs mb-5" style={{ color: C.inkSoft }}>
              Seit 1. Januar bereits verschenkt:{" "}
              <strong style={{ color: C.ink, fontVariantNumeric: "tabular-nums" }}>
                {fmt(calc.verloren, 2)} €
              </strong>{" "}
              – und es tickt weiter.
            </p>
            <button
              className="w-full rounded-full py-4 font-bold text-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(17,18,16,.25)]"
              style={{ background: C.ink }}
              onClick={() => {
                track("kc_wechsel_click");
                alert(
                  "Konzept-Demo: Ab hier übernimmt der bestehende App-Flow – Kasse wählen, Antrag digital, die neue Kasse kündigt die alte automatisch."
                );
              }}
            >
              Jetzt Kasse wechseln
            </button>
            <p className="text-xs text-center mt-2" style={{ color: C.inkSoft }}>
              In wenigen Minuten abgeschlossen · ohne Papierkram
            </p>
          </>
        ) : (
          <>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold mb-3"
              style={{ background: C.greenSoft, color: C.greenDark }}
            >
              <span
                className="rounded-full"
                style={{ width: 8, height: 8, background: C.green }}
              />
              kluge Wahl
            </span>
            <p className="font-bold mb-1">Du bist schon in der günstigsten Kasse.</p>
            <p className="text-sm" style={{ color: C.inkSoft }}>
              Preislich holst du nichts mehr raus. Check stattdessen die
              Zusatzleistungen – Zahnreinigung, Bonusprogramm und Co. unterscheiden
              sich deutlich.
            </p>
          </>
        )}

        {/* Entscheidungskarte: erscheint in beiden Zweigen, sobald das
            Jahresbrutto über der Versicherungspflichtgrenze (77.400 €) liegt */}
        {brutto * 12 > JAEG_JAHR && (
          <div
            className="mt-4 rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${C.line}` }}
          >
            <div
              className="px-4 py-3 text-sm font-bold text-white"
              style={{ background: C.ink }}
            >
              Für dich gibt es einen zweiten Weg
            </div>
            <div className="p-4" style={{ background: C.card }}>
              <p className="text-xs leading-relaxed mb-3" style={{ color: C.inkSoft }}>
                Mit über 77.400 € Jahresbrutto (Versicherungspflichtgrenze 2026)
                steht dir auch die <strong style={{ color: C.ink }}>private
                Krankenversicherung</strong> offen.
              </p>
              <div className="grid grid-cols-2 gap-2.5 mb-3">
                <div
                  className="rounded-xl px-3 py-2.5"
                  style={{ background: C.paper, border: `1px solid ${C.line}` }}
                >
                  <p className="text-[11px] font-bold uppercase mb-0.5" style={{ color: C.inkSoft, letterSpacing: "0.06em" }}>
                    Weg 1 · GKV
                  </p>
                  <p className="text-sm font-bold">
                    {lohnt ? `${fmt(calc.sparenJahr)} € / Jahr` : "ausgereizt"}
                  </p>
                  <p className="text-[11px]" style={{ color: C.inkSoft }}>
                    {lohnt
                      ? "sparen durch Kassenwechsel"
                      : "du bist schon in der günstigsten Kasse"}
                  </p>
                </div>
                <div
                  className="rounded-xl px-3 py-2.5"
                  style={{ background: C.paper, border: `1px solid ${C.line}` }}
                >
                  <p className="text-[11px] font-bold uppercase mb-0.5" style={{ color: C.inkSoft, letterSpacing: "0.06em" }}>
                    Weg 2 · PKV
                  </p>
                  <p className="text-sm font-bold">bis 613 € / Monat</p>
                  <p className="text-[11px]" style={{ color: C.inkSoft }}>
                    Arbeitgeberzuschuss zum Beitrag
                  </p>
                </div>
              </div>
              <Link
                href="/pkv-check"
                onClick={() => track("kc_pkv_card_click")}
                className="block w-full rounded-full py-3 text-center text-sm font-bold text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(11,122,75,.35)]"
                style={{ background: C.greenDark }}
              >
                Ob die PKV zu dir passt: zum Fit-Check
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Seite ───────────────────────────────────────────────────────────────────

export default function KassenCheck() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: C.paper,
        color: C.ink,
        letterSpacing: "-0.01em",
      }}
    >
      <style>{`
        input[type=range] { -webkit-appearance: none; appearance: none; height: 6px; border-radius: 999px; outline: none; width: 100%; }
        input[type=range]:focus-visible { outline: 2px solid ${C.ink}; outline-offset: 4px; }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 24px; height: 24px; border-radius: 50%;
          background: ${C.ink}; border: 4px solid #fff;
          box-shadow: 0 2px 8px rgba(17,18,16,.3); cursor: pointer;
        }
        input[type=range]::-moz-range-thumb {
          width: 24px; height: 24px; border-radius: 50%;
          background: ${C.ink}; border: 4px solid #fff;
          box-shadow: 0 2px 8px rgba(17,18,16,.3); cursor: pointer;
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>

      {/* Announcement-Bar (Getsafe-Muster) */}
      <div
        className="w-full text-center text-sm font-medium py-2.5 px-4 text-white"
        style={{ background: C.ink }}
      >
        <span
          className="inline-block rounded-full px-2 py-0.5 text-xs font-bold mr-2 align-middle"
          style={{ background: C.greenDark, color: "#fff" }}
        >
          Neu
        </span>
        Kassen-Check 2026: Zusatzbeiträge gestiegen – prüfe dein Sparpotenzial
      </div>

      {/* Nav */}
      <nav
        className="px-5 py-3.5 flex items-center justify-between mx-auto"
        style={{ maxWidth: 1080 }}
      >
        <div className="flex items-center gap-8">
          {/* Logo-Platzhalter als Wortmarke (Konzept-Demo, keine Original-Marke) */}
          <div className="flex items-center gap-1.5 select-none" aria-label="Getsafe (Demo-Wortmarke)">
            <span
              className="text-xl font-black lowercase"
              style={{ letterSpacing: "-0.04em" }}
            >
              getsafe
            </span>
            <span
              className="rounded-full mt-2"
              style={{ width: 8, height: 8, background: C.green }}
            />
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <span className="cursor-default">Versicherungen</span>
            <span className="cursor-default">Für dich</span>
            <span className="cursor-default">Hilfe</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <span
            className="hidden sm:inline-block rounded-full px-4 py-2 text-sm font-semibold cursor-default"
            style={{ border: `1px solid ${C.line}` }}
          >
            Login
          </span>
          <span
            className="rounded-full px-4 py-2 text-sm font-semibold text-white cursor-default"
            style={{ background: C.ink }}
          >
            Download App
          </span>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="px-5 pt-10 pb-16 sm:pt-16 sm:pb-24">
        <div
          className="mx-auto flex flex-col lg:flex-row gap-12 lg:items-start"
          style={{ maxWidth: 1080 }}
        >
          <div className="flex-1 lg:pt-8">
            <h1
              className="leading-[1.08] mb-6 text-balance"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.6rem)", letterSpacing: "-0.03em" }}
            >
              <span className="font-medium block">Gleiche Grundleistungen.</span>
              <span className="font-black block">Bis zu 770 € weniger zahlen.</span>
            </h1>
            <ul className="space-y-2.5 text-base mb-8">
              <li className="flex items-start gap-2.5">
                <span className="font-bold" style={{ color: C.green }}>–</span>
                Sparpotenzial in 10 Sekunden berechnet
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold" style={{ color: C.green }}>–</span>
                Wechsel komplett digital, die neue Kasse kündigt für dich
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold" style={{ color: C.green }}>–</span>
                Keine Kasse darf dich ablehnen – garantiert per Gesetz
              </li>
            </ul>
            <a
              href="#rechner"
              className="inline-block rounded-full px-8 py-4 font-bold text-white mb-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(17,18,16,.25)]"
              style={{ background: C.ink }}
            >
              Jetzt checken
            </a>
            <p className="text-sm" style={{ color: C.inkSoft }}>
              Über 500.000 Kund:innen vertrauen uns · Tausende 5-Sterne-Reviews
            </p>
          </div>

          <div id="rechner" className="flex-1 flex justify-center lg:justify-end">
            <Rechner />
          </div>
        </div>
      </header>

      {/* ── WARUM JETZT ── */}
      <section className="px-5 py-16" style={{ background: C.card }}>
        <div className="mx-auto" style={{ maxWidth: 1080 }}>
          <h2
            className="mb-8 leading-tight text-balance"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.3rem)", letterSpacing: "-0.02em" }}
          >
            <span className="font-medium">Kassenwechsel, neu gedacht. </span>
            <span className="font-black">Für dich, nicht den Papierkram.</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                chip: "gut zu wissen",
                t: "2026 zahlen fast alle mehr",
                punkte: [
                  <>Amtlich: 2,9 % – real im Schnitt <strong style={{ color: C.ink }}>3,13 %</strong></>,
                  <>Spanne: <strong style={{ color: C.ink }}>2,18 % bis 4,39 %</strong></>,
                  <>Grundleistungen: identisch</>,
                ],
              },
              {
                chip: "dein Recht",
                t: "Erhöhung? Sofort raus.",
                punkte: [
                  <>Beitragserhöhung = <strong style={{ color: C.ink }}>Sonderkündigungsrecht</strong></>,
                  <>12-Monats-Bindung fällt weg</>,
                  <>Der beste Moment zum Wechseln</>,
                ],
              },
              {
                chip: "ohne Papierkram",
                t: "5 Minuten, fertig",
                punkte: [
                  <>Nur die neue Mitgliedschaft beantragen</>,
                  <>Die neue Kasse kündigt die alte</>,
                  <>Arbeitgeber elektronisch informiert – <strong style={{ color: C.ink }}>lückenlos versichert</strong></>,
                ],
              },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-[24px] p-6"
                style={{ background: C.paper, border: `1px solid ${C.line}` }}
              >
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-bold mb-3"
                  style={{ background: C.greenSoft, color: C.greenDark }}
                >
                  {s.chip}
                </span>
                <p className="font-bold text-lg mb-2">{s.t}</p>
                <ul className="space-y-1.5">
                  {s.punkte.map((p, j) => (
                    <Haken key={j}>{p}</Haken>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ (Getsafe-Muster: fette Fragen, knappe Antworten) ── */}
      <section className="px-5 py-16">
        <div className="mx-auto" style={{ maxWidth: 720 }}>
          <h2
            className="mb-8 leading-tight text-balance"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.3rem)", letterSpacing: "-0.02em" }}
          >
            <span className="font-medium">Kurz gefragt. </span>
            <span className="font-black">Klar beantwortet.</span>
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Verliere ich Leistungen bei einer günstigeren Kasse?",
                a: "Nein. Rund 95 % der Leistungen sind gesetzlich festgelegt und überall identisch. Unterschiede gibt es nur bei Extras wie Zahnreinigung oder Bonusprogrammen.",
              },
              {
                q: "Kann mich eine Kasse ablehnen?",
                a: "Nein. Jede gesetzliche Kasse muss dich aufnehmen – unabhängig von Alter und Vorerkrankungen. Das ist dein Kassenwahlrecht.",
              },
              {
                q: "Wie aufwendig ist der Wechsel wirklich?",
                a: "Antrag bei der neuen Kasse stellen – fertig. Sie kündigt die alte, eine Versicherungslücke ist gesetzlich ausgeschlossen. Deinem Arbeitgeber reicht eine kurze Info.",
              },
              {
                q: "Wann kann ich wechseln?",
                a: "Regulär nach 12 Monaten Mitgliedschaft mit zwei Monaten Frist. Bei einer Beitragserhöhung sofort – per Sonderkündigungsrecht.",
              },
            ].map((f, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.line}` }} className="pb-6">
                <p className="font-bold mb-1.5">{f.q}</p>
                <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BERATUNGS-CTA (Getsafe-Muster) ── */}
      <section className="px-5 py-16" style={{ background: C.card }}>
        <div className="mx-auto text-center" style={{ maxWidth: 640 }}>
          <h2
            className="mb-3 leading-tight text-balance"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.3rem)", letterSpacing: "-0.02em" }}
          >
            <span className="font-medium">Noch unsicher? </span>
            <span className="font-black">Lass uns das gemeinsam klären.</span>
          </h2>
          <p className="text-base mb-8" style={{ color: C.inkSoft }}>
            Sprich mit einem Experten, der deine Sprache spricht – nicht
            Versicherungskauderwelsch. Kostenlos und unverbindlich.
          </p>
          <button
            className="rounded-full px-8 py-4 font-bold text-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(17,18,16,.25)]"
            style={{ background: C.ink }}
            onClick={() => {
              track("kc_beratung_click");
              alert(
                "Konzept-Demo: Ab hier übernimmt der bestehende Getsafe-Flow – Terminbuchung für die kostenlose 15-Minuten-Beratung."
              );
            }}
          >
            kostenlose 15-min Beratung
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-5 py-10">
        <div
          className="mx-auto text-xs leading-relaxed"
          style={{ maxWidth: 640, color: C.inkSoft }}
        >
          <p className="mb-2">
            <strong style={{ color: C.ink }}>Methodik:</strong> Differenz zwischen deinem
            Zusatzbeitrag und dem günstigsten Satz 2026 (2,18 %), halbiert
            (Arbeitnehmeranteil), auf dein beitragspflichtiges Einkommen (max.{" "}
            {fmt(BBG_MONAT, 2)} € / Monat). „Bis zu 770 €“ = Maximalfall: teuerste Kasse
            (4,39 %) zur günstigsten, Einkommen an der Beitragsbemessungsgrenze.
            Amtlicher durchschnittlicher Zusatzbeitrag (Schätzerkreis/BMG): 2,9 %;
            realer, mitgliedergewichteter Durchschnitt: 3,13 %. Datenstand Juli
            2026. Unverbindliche Modellrechnung.
          </p>
          <p className="mb-2">
            Diese Seite ist ein <strong>Kampagnen-Konzept</strong> und Teil einer
            Bewerbungsarbeit von Norbert Sommer für die Position (Senior) Growth
            Creative bei Getsafe. Sie ist <strong>keine Seite der Getsafe GmbH</strong>
            und hat keine Vermittlungs- oder Beratungsfunktion. Deine Eingaben
            werden vollständig im Browser verrechnet und nicht gespeichert; beim
            anonymen Funnel-Tracking werden IP-Adressen nur kurzzeitig zum Schutz
            vor Missbrauch verarbeitet. Markennamen und Gestaltungselemente werden
            ausschließlich zu Demonstrationszwecken referenziert.
          </p>
          <p>© 2026 Konzept-Demo · Norbert Sommer</p>
        </div>
      </footer>
    </div>
  );
}
