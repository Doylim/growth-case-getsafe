// Cookieloser Funnel-Tracker: schickt Events per sendBeacon an /api/track.
// Bewusst ohne Cookies, ohne User-IDs, ohne Fingerprinting – nur Event + flache Props.
export function track(event, props = {}) {
  try {
    const daten = JSON.stringify({ e: event, p: props });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([daten], { type: "application/json" }));
    } else {
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
