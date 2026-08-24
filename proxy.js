// Schalter fuer die oeffentliche Erreichbarkeit der Demo.
// true  = Seite ist abgeschaltet, jede URL liefert 410 mit einem Hinweis
// false = Seite laeuft wieder normal (Proxy reicht alle Requests durch)
const DEMO_ABGESCHALTET = true;

const HINWEIS_SEITE = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Demo nicht mehr verfügbar</title>
<style>
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 2rem;
    background: #0f1115;
    color: #e7e9ee;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.6;
  }
  main { max-width: 34rem; text-align: center; }
  h1 { font-size: clamp(1.5rem, 4vw, 2rem); font-weight: 800; margin: 0 0 1rem; letter-spacing: -0.02em; }
  p { margin: 0 0 0.75rem; color: #a6acbb; }
  .signatur { margin-top: 2rem; font-size: 0.875rem; color: #6f7789; }
  a { color: #9fb4ff; }
</style>
</head>
<body>
  <main>
    <h1>Diese Demo ist nicht mehr öffentlich verfügbar.</h1>
    <p>Der Growth Case war eine zeitlich begrenzte Bewerbungs-Demo und wurde offline genommen.</p>
    <p>Bei Interesse an Inhalt oder Umsetzung: <a href="mailto:office@doylim.com">office@doylim.com</a></p>
    <p class="signatur">Norbert Sommer · Heidelberg</p>
  </main>
</body>
</html>`;

export default function proxy() {
  if (!DEMO_ABGESCHALTET) return;

  return new Response(HINWEIS_SEITE, {
    status: 410,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}

// Greift fuer jede Route inklusive API und statischer Assets
export const config = {
  matcher: "/:path*",
};
