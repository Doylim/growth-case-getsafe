// Cookieloser Event-Endpunkt: nimmt Funnel-Events entgegen und schreibt sie
// als strukturierte Log-Zeile (sichtbar in den Vercel-Runtime-Logs).
// Keine Cookies, keine IDs, keine personenbezogenen Daten – bewusst minimal.

// Erlaubte Events entlang der KPI-Kette (siehe messkonzept.md)
const ERLAUBTE_EVENTS = new Set([
  "home_demo_click",
  "kc_rechner_start",
  "kc_wechsel_click",
  "kc_pkv_card_view",
  "kc_pkv_card_click",
  "kc_beratung_click",
  "pc_start",
  "pc_complete",
  "pc_cta_click",
  "pc_restart",
  "pc_zum_kassencheck",
]);

// Erlaubte Property-Keys inkl. gueltiger Werte – alles andere wird verworfen,
// damit keine fremden Inhalte (PII-Risiko) in die Logs gelangen koennen
const ERLAUBTE_PROPS = {
  ziel: new Set(["kassen-check", "pkv-check"]),
  ergebnis: new Set(["fit", "pruefen", "kritisch", "gate", "bald", "student"]),
};

// Einfaches Rate-Limit pro IP (in-memory, pro Serverless-Instanz – fuer eine
// Demo ausreichend, verhindert Log-Fluten durch einzelne Clients)
const LIMIT_PRO_MINUTE = 60;
const MAX_BODY_BYTES = 1024;
const zaehler = new Map();

function rateLimitErreicht(ip) {
  const jetzt = Date.now();
  const eintrag = zaehler.get(ip);
  if (!eintrag || jetzt > eintrag.reset) {
    zaehler.set(ip, { anzahl: 1, reset: jetzt + 60_000 });
    return false;
  }
  eintrag.anzahl += 1;
  if (zaehler.size > 10_000) zaehler.clear();
  return eintrag.anzahl > LIMIT_PRO_MINUTE;
}

export async function POST(request) {
  try {
    if (!(request.headers.get("content-type") || "").includes("application/json")) {
      return new Response(null, { status: 415 });
    }
    const ip =
      (request.headers.get("x-forwarded-for") || "unbekannt").split(",")[0].trim();
    if (rateLimitErreicht(ip)) {
      return new Response(null, { status: 429 });
    }
    const roh = await request.text();
    if (roh.length > MAX_BODY_BYTES) {
      return new Response(null, { status: 413 });
    }
    const { e, p } = JSON.parse(roh);
    if (typeof e !== "string" || !ERLAUBTE_EVENTS.has(e)) {
      return new Response(null, { status: 400 });
    }
    // Nur allowlistete Keys mit allowlisteten Werten durchlassen
    const props = {};
    if (p && typeof p === "object") {
      for (const [k, erlaubteWerte] of Object.entries(ERLAUBTE_PROPS)) {
        if (typeof p[k] === "string" && erlaubteWerte.has(p[k])) {
          props[k] = p[k];
        }
      }
    }
    console.log(JSON.stringify({ track: e, ...props, ts: Date.now() }));
  } catch {
    return new Response(null, { status: 400 });
  }
  return new Response(null, { status: 204 });
}
