"use client";

import { useState } from "react";
import { track } from "../../lib/track";

// ─────────────────────────────────────────────────────────────────────────────
// Kampagne 2 (Value-Play): PKV-Fit-Check – GKV→PKV-Wechsel in 5 Fragen.
// Ehrlichkeitslogik mit drei Ergebniszuständen + hartem Eligibility-Gate.
// Getsafe-Design-Look. Konzept-Demo, keine Seite der Getsafe GmbH.
// JAEG 2026: 77.400 € (BMG). Datenstand Juli 2026.
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  ink: "#111210",
  inkSoft: "#626762",
  green: "#12B76A",
  greenDark: "#0B7A4B",
  greenSoft: "#E9F9F1",
  amber: "#FEF3C7",
  amberInk: "#92400E",
  card: "#F6F6F4",
  line: "#E8E8E4",
  paper: "#FFFFFF",
};

const FRAGEN = [
  {
    id: "status",
    frage: "Was beschreibt dich am besten?",
    optionen: [
      { key: "angestellt", label: "Angestellt", sub: "sozialversicherungspflichtig beschäftigt" },
      { key: "selbststaendig", label: "Selbstständig / freiberuflich", sub: "PKV jederzeit möglich" },
      { key: "beamt", label: "Verbeamtet / Anwärter:in", sub: "mit Beihilfe-Anspruch" },
      { key: "student", label: "Student:in", sub: "Sonderregeln beim Studienstart" },
    ],
  },
  {
    id: "einkommen",
    frage: "Wo liegt dein Jahresbrutto?",
    nur: "angestellt",
    optionen: [
      { key: "ueber", label: "Über 77.400 €", sub: "über der Versicherungspflichtgrenze 2026" },
      { key: "knapp", label: "Knapp darunter", sub: "Erhöhung oder Jobwechsel absehbar" },
      { key: "unter", label: "Deutlich darunter", sub: "" },
    ],
  },
  {
    id: "alter",
    frage: "Wie alt bist du?",
    optionen: [
      { key: "u35", label: "Unter 35", sub: "" },
      { key: "35_45", label: "35 bis 45", sub: "" },
      { key: "ue45", label: "Über 45", sub: "" },
    ],
  },
  {
    id: "familie",
    frage: "Kinder – heute oder in Planung?",
    optionen: [
      { key: "keine", label: "Keine, auch nicht geplant", sub: "" },
      { key: "eins", label: "Ein Kind", sub: "" },
      { key: "mehr", label: "Zwei oder mehr / in Planung", sub: "in der PKV zahlt jedes Kind eigenen Beitrag" },
    ],
  },
  {
    id: "planung",
    frage: "Wie schätzt du dein Einkommen langfristig ein?",
    optionen: [
      { key: "stabil", label: "Dauerhaft stabil auf diesem Niveau oder höher", sub: "" },
      { key: "unsicher", label: "Schwer zu sagen", sub: "z. B. Teilzeit, Auszeit oder Wechsel denkbar" },
    ],
  },
];

function auswerten(a) {
  // Hartes Eligibility-Gate für Angestellte
  if (a.status === "angestellt" && a.einkommen === "unter") return { typ: "gate" };
  if (a.status === "angestellt" && a.einkommen === "knapp") return { typ: "bald" };
  if (a.status === "student") return { typ: "student" };

  let score = 0;
  const gruende = { plus: [], minus: [] };

  if (a.status === "beamt") {
    score += 2;
    gruende.plus.push("Mit Beihilfe trägt dein Dienstherr einen großen Teil der Kosten – für Beamt:innen ist die PKV deshalb häufig die wirtschaftlichere Wahl.");
  }
  if (a.status === "selbststaendig") {
    gruende.plus.push("Als Selbstständige:r kannst du frei wählen – ohne Einkommensgrenze.");
  }
  if (a.alter === "u35") {
    score += 2;
    gruende.plus.push("Junges Eintrittsalter bedeutet niedrige Beiträge und lange Zeit für Alterungsrückstellungen.");
  }
  if (a.alter === "35_45") score += 1;
  if (a.alter === "ue45") {
    score -= 1;
    gruende.minus.push("Ab Mitte 40 steigen die Einstiegsbeiträge deutlich – und eine Rückkehr in die GKV ist ab 55 kaum noch möglich.");
  }
  if (a.familie === "keine") score += 2;
  if (a.familie === "mehr") {
    score -= 2;
    gruende.minus.push("In der PKV zahlt jedes Familienmitglied einen eigenen Beitrag – die kostenlose Familienversicherung der GKV entfällt.");
  }
  if (a.planung === "stabil") score += 2;
  if (a.planung === "unsicher") {
    score -= 1;
    gruende.minus.push("PKV-Beiträge sind einkommensunabhängig. Sinkt dein Einkommen, sinkt dein Beitrag nicht mit.");
  }

  if (score >= 5) return { typ: "fit", gruende };
  if (score >= 1) return { typ: "pruefen", gruende };
  return { typ: "kritisch", gruende };
}

const ERGEBNISSE = {
  fit: {
    chip: "sieht gut aus",
    chipStyle: "green",
    titel: "Die PKV könnte sich für dich lohnen.",
    text: "Wechselberechtigung, Alter, Familiensituation und Einkommensplanung passen zum typischen PKV-Profil. Ob es sich wirklich rechnet, hängt an Tarif, Selbstbehalt und Gesundheitsprüfung – das klären wir in der Beratung.",
    cta: "kostenlose 15-min Beratung buchen",
  },
  pruefen: {
    chip: "individuell prüfen",
    chipStyle: "amber",
    titel: "Kann passen – aber nicht blind wechseln.",
    text: "Bei dir sprechen Punkte dafür und dagegen. Ein Wechsel ist eine Entscheidung für Jahrzehnte – triff sie nicht per Online-Check, sondern mit einer ehrlichen Rechnung über beide Systeme.",
    cta: "kostenlose 15-min Beratung buchen",
  },
  kritisch: {
    chip: "ehrliche Antwort",
    chipStyle: "amber",
    titel: "Die GKV ist für dich vermutlich die bessere Wahl.",
    text: "Familie, Einkommensplanung oder Alter sprechen bei dir eher gegen einen Wechsel. Was sich fast immer lohnt: innerhalb der GKV die Kasse wechseln – gleiche Grundleistungen, bis zu 770 € weniger pro Jahr.",
    cta: "Zum Kassen-Check (GKV)",
  },
  gate: {
    chip: "noch nicht möglich",
    chipStyle: "amber",
    titel: "Aktuell bist du nicht wechselberechtigt.",
    text: "Als Angestellte:r brauchst du ein Jahresbrutto über 77.400 € (Versicherungspflichtgrenze 2026). Bis dahin: GKV-Kasse wechseln lohnt fast immer – gleiche Grundleistungen, bis zu 770 € Ersparnis pro Jahr.",
    cta: "Zum Kassen-Check (GKV)",
  },
  bald: {
    chip: "bald relevant",
    chipStyle: "green",
    titel: "Noch nicht – aber vermutlich bald.",
    text: "Du liegst knapp unter der Grenze. Die nächste Gehaltserhöhung oder ein Jobwechsel kann das ändern – 2027 werden die Grenzwerte voraussichtlich außerordentlich angehoben. Wir erinnern dich, wenn es so weit ist.",
    cta: "Erinnerung einrichten",
  },
  student: {
    chip: "Sonderfall",
    chipStyle: "amber",
    titel: "Für Studierende gelten eigene Regeln.",
    text: "Zum Studienstart kannst du dich einmalig von der GKV-Pflicht befreien lassen – die Entscheidung gilt fürs ganze Studium. Das klären wir am besten kurz persönlich.",
    cta: "kostenlose 15-min Beratung buchen",
  },
};

export default function PkvFitCheck() {
  const [antworten, setAntworten] = useState({});
  const [ergebnis, setErgebnis] = useState(null);

  const sichtbareFragen = FRAGEN.filter(
    (f) => !f.nur || antworten.status === f.nur
  );
  const aktuelleIndex = sichtbareFragen.findIndex((f) => !(f.id in antworten));
  const aktuelle = aktuelleIndex >= 0 ? sichtbareFragen[aktuelleIndex] : null;
  const fortschritt =
    aktuelleIndex < 0 ? 1 : aktuelleIndex / sichtbareFragen.length;

  const antworte = (id, key) => {
    if (Object.keys(antworten).length === 0) track("pc_start");
    const neu = { ...antworten, [id]: key };
    setAntworten(neu);
    const offen = FRAGEN.filter((f) => !f.nur || neu.status === f.nur).filter(
      (f) => !(f.id in neu)
    );
    if (offen.length === 0) {
      const resultat = auswerten(neu);
      track("pc_complete", { ergebnis: resultat.typ });
      setErgebnis(resultat);
    }
  };

  const neustart = () => {
    track("pc_restart");
    setAntworten({});
    setErgebnis(null);
  };

  const E = ergebnis ? ERGEBNISSE[ergebnis.typ] : null;

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
        .pkv-opt { transition: border-color .15s ease, background .15s ease, transform .15s ease; }
        .pkv-opt:hover { border-color: ${C.ink} !important; background: ${C.paper} !important; transform: translateY(-1px); }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
      `}</style>

      {/* Announcement-Bar */}
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
        Versicherungspflichtgrenze 2026: 77.400 € – prüfe deine PKV-Option
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
        <span
          className="rounded-full px-4 py-2 text-sm font-semibold text-white cursor-default"
          style={{ background: C.ink }}
        >
          Download App
        </span>
      </nav>

      {/* ── HERO + CHECK ── */}
      <main className="px-5 pt-10 pb-16 sm:pt-14 sm:pb-24">
        <div className="mx-auto" style={{ maxWidth: 640 }}>
          {!ergebnis && (
            <>
              <h1
                className="leading-[1.08] mb-4"
                style={{
                  fontSize: "clamp(1.9rem, 5vw, 2.8rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                <span className="font-medium block">Wechsel von GKV in PKV?</span>
                <span className="font-black block">Finde in 5 Fragen heraus, ob es passt.</span>
              </h1>
              <p className="text-base mb-8" style={{ color: C.inkSoft }}>
                Ob du wechseln darfst, ob es sich lohnt – und worauf du achten
                musst. Ehrlich gerechnet, ohne Verkaufsdruck.
              </p>

              {/* Fortschritt */}
              <div
                className="rounded-full mb-8"
                style={{ height: 6, background: C.line }}
              >
                <div
                  className="rounded-full"
                  style={{
                    height: 6,
                    width: `${Math.max(fortschritt * 100, 4)}%`,
                    background: C.green,
                    transition: "width .3s ease",
                  }}
                />
              </div>

              {/* Frage */}
              {aktuelle && (
                <div
                  className="rounded-[28px] p-6 sm:p-7"
                  style={{
                    background: C.paper,
                    border: `1px solid ${C.line}`,
                    boxShadow: "0 20px 60px rgba(17,18,16,.08)",
                  }}
                >
                  <p className="text-xs font-bold mb-2" style={{ color: C.inkSoft }}>
                    Frage {aktuelleIndex + 1} von {sichtbareFragen.length}
                  </p>
                  <p className="font-bold text-xl mb-5">{aktuelle.frage}</p>
                  <div className="space-y-2.5">
                    {aktuelle.optionen.map((o) => (
                      <button
                        key={o.key}
                        onClick={() => antworte(aktuelle.id, o.key)}
                        className="pkv-opt w-full text-left rounded-2xl px-4 py-3.5 font-semibold cursor-pointer"
                        style={{ background: C.card, border: `1px solid ${C.line}` }}
                      >
                        {o.label}
                        {o.sub && (
                          <span
                            className="block text-xs font-normal mt-0.5"
                            style={{ color: C.inkSoft }}
                          >
                            {o.sub}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── ERGEBNIS ── */}
          {ergebnis && E && (
            <div
              className="rounded-[28px] p-6 sm:p-8"
              style={{
                background: C.paper,
                border: `1px solid ${C.line}`,
                boxShadow: "0 20px 60px rgba(17,18,16,.08)",
              }}
            >
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold mb-4"
                style={
                  E.chipStyle === "green"
                    ? { background: C.greenSoft, color: C.greenDark }
                    : { background: C.amber, color: C.amberInk }
                }
              >
                <span
                  className="rounded-full"
                  style={{
                    width: 8,
                    height: 8,
                    background: E.chipStyle === "green" ? C.green : C.amberInk,
                  }}
                />
                {E.chip}
              </span>
              <h2
                className="font-black leading-tight mb-3"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
              >
                {E.titel}
              </h2>
              <p className="text-sm leading-relaxed mb-5" style={{ color: C.inkSoft }}>
                {E.text}
              </p>

              {/* Ehrlichkeits-Details */}
              {ergebnis.gruende &&
                (ergebnis.gruende.plus.length > 0 ||
                  ergebnis.gruende.minus.length > 0) && (
                  <div className="space-y-2.5 mb-6">
                    {ergebnis.gruende.plus.map((g, i) => (
                      <p
                        key={"p" + i}
                        className="rounded-2xl px-4 py-3 text-xs leading-relaxed"
                        style={{ background: C.greenSoft, color: C.greenDark }}
                      >
                        <strong>Spricht dafür:</strong> {g}
                      </p>
                    ))}
                    {ergebnis.gruende.minus.map((g, i) => (
                      <p
                        key={"m" + i}
                        className="rounded-2xl px-4 py-3 text-xs leading-relaxed"
                        style={{ background: C.amber, color: C.amberInk }}
                      >
                        <strong>Bedenke:</strong> {g}
                      </p>
                    ))}
                  </div>
                )}

              <button
                className="w-full rounded-full py-4 font-bold text-white mb-3 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(17,18,16,.25)]"
                style={{ background: C.ink }}
                onClick={() => {
                  if (E.cta.includes("Kassen-Check")) {
                    track("pc_zum_kassencheck", { ergebnis: ergebnis.typ });
                    window.location.href = "/kassen-check";
                  } else {
                    track("pc_cta_click", { ergebnis: ergebnis.typ });
                    alert(
                      "Konzept-Demo: Ab hier übernimmt der bestehende Getsafe-Flow – Beratungstermin, Vergleich über das Partnertableau, Antrag digital."
                    );
                  }
                }}
              >
                {E.cta}
              </button>
              <button
                onClick={neustart}
                className="w-full text-sm font-semibold underline underline-offset-2 cursor-pointer"
                style={{ color: C.inkSoft }}
              >
                Check neu starten
              </button>
            </div>
          )}

          {/* Ehrlicher Hinweis (immer sichtbar) */}
          <div
            className="mt-8 rounded-2xl px-5 py-4 text-xs leading-relaxed"
            style={{ background: C.card }}
          >
            <strong>Ehrlicher Hinweis:</strong> Die PKV ist nicht automatisch die
            bessere Wahl. Bei größerer Familie, unsicherem Einkommen oder geplanter
            GKV-Rückkehr passt die gesetzliche Lösung oft besser. Deshalb zeigen wir
            dir beide Seiten – nicht nur die Vorteile.
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="px-5 py-10" style={{ borderTop: `1px solid ${C.line}` }}>
        <div
          className="mx-auto text-xs leading-relaxed"
          style={{ maxWidth: 640, color: C.inkSoft }}
        >
          <p className="mb-2">
            <strong style={{ color: C.ink }}>Grundlagen:</strong>{" "}
            Versicherungspflichtgrenze (JAEG) 2026: 77.400 € laut
            Bundesgesundheitsministerium. Der Check ist eine grobe Ersteinschätzung
            auf Basis von 5 Angaben – keine Beratung, keine Tarifberechnung, keine
            Empfehlung im Sinne des VVG. Verbindliche Aussagen erfordern eine
            dokumentierte persönliche Beratung. Es werden keine personenbezogenen
            Daten erhoben oder gespeichert.
          </p>
          <p>
            Diese Seite ist ein <strong>Kampagnen-Konzept</strong> und Teil einer
            Bewerbungsarbeit von Norbert Sommer für die Position (Senior) Growth
            Creative bei Getsafe. Sie ist keine Seite der Getsafe GmbH. © 2026
            Konzept-Demo · Norbert Sommer
          </p>
        </div>
      </footer>
    </div>
  );
}
