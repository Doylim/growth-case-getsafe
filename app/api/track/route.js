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

export async function POST(request) {
  try {
    const { e, p } = await request.json();
    if (typeof e !== "string" || !ERLAUBTE_EVENTS.has(e)) {
      return new Response(null, { status: 400 });
    }
    // Nur flache, kurze Property-Werte durchlassen (kein Freitext, kein PII-Risiko)
    const props = {};
    if (p && typeof p === "object") {
      for (const [k, v] of Object.entries(p).slice(0, 5)) {
        if (["string", "number", "boolean"].includes(typeof v)) {
          props[k] = String(v).slice(0, 40);
        }
      }
    }
    console.log(JSON.stringify({ track: e, ...props, ts: Date.now() }));
  } catch {
    return new Response(null, { status: 400 });
  }
  return new Response(null, { status: 204 });
}
