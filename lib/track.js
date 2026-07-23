// Cookieloser Funnel-Tracker: schickt Events per sendBeacon an /api/track.
// Bewusst ohne Cookies, ohne User-IDs, ohne Fingerprinting – nur Event + flache Props.
export function track(event, props = {}) {
  try {
    const daten = JSON.stringify({ e: event, p: props });
    // sendBeacon kann false liefern (Queue voll o. Ä.) – dann fetch-Fallback,
    // sonst gehen Events still verloren
    const gesendet = navigator.sendBeacon
      ? navigator.sendBeacon("/api/track", new Blob([daten], { type: "application/json" }))
      : false;
    if (!gesendet) {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: daten,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Tracking darf nie die Seite brechen
  }
}
