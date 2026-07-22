# Messkonzept – Funnel-Events auf den Demos

Die Demos tragen ein **cookieloses Event-Tracking** entlang der KPI-Ketten aus dem
Konzept (Kapitel 5). Umsetzung: `lib/track.js` (sendBeacon) → `app/api/track/route.js`
(strukturierte Log-Zeile, sichtbar in den Vercel-Runtime-Logs).

**Bewusst ohne:** Cookies, User-IDs, Fingerprinting, personenbezogene Daten,
externe Dienste. Deshalb ohne Consent-Pflicht – der Disclaimer der Seiten
(„es werden keine personenbezogenen Daten erhoben") bleibt wahr. In einer echten
Kampagne würde derselbe Event-Plan in ein Produkt-Analytics-Tool (z. B. serverseitig
oder cookielos) laufen und um die App-/CRM-Events ergänzt.

## Event-Plan → KPI-Kette GKV

| KPI-Schritt (Konzept) | Event | Props |
|---|---|---|
| Anzeigen-CTR | – (liefert der Ad-Manager) | |
| Rechner-Start | `kc_rechner_start` | einmal pro Besuch, erste Slider-Interaktion |
| Rechner-Abschluss | implizit (Ergebnis rendert live) | |
| „Wechsel starten" geklickt | `kc_wechsel_click` | |
| App-Flow → Antrag → Police | – (bestehender App-Funnel) | |
| Beratungs-Interesse | `kc_beratung_click` | |

## Event-Plan → KPI-Kette PKV

| KPI-Schritt (Konzept) | Event | Props |
|---|---|---|
| Fit-Check gestartet | `pc_start` | erste beantwortete Frage |
| Fit-Check abgeschlossen | `pc_complete` | `ergebnis`: fit/pruefen/kritisch/gate/bald/student |
| Qualifizierter Lead → Beratung | `pc_cta_click` | `ergebnis` |
| Neustart (Explorationsverhalten) | `pc_restart` | |

## Cross-Funnel-Routing („Kein Lead geht verloren")

| Routing-Moment | Event | Props |
|---|---|---|
| Einstieg von der Case-Seite | `home_demo_click` | `ziel`: kassen-check/pkv-check |
| PKV-Karte im Rechner gesehen (> 77.400 €) | `kc_pkv_card_view` | einmal pro Besuch |
| PKV-Karte geklickt | `kc_pkv_card_click` | |
| Fit-Check → Kassen-Check-Weiche | `pc_zum_kassencheck` | `ergebnis`: kritisch/gate |

## Was sich damit beantworten lässt (Beispiele)

- **Conversion-Rate Rechner:** `kc_wechsel_click` / `kc_rechner_start`
- **Cross-Sell-Qualität:** `kc_pkv_card_click` / `kc_pkv_card_view` – klickt der
  wertvollste Lead-Typ wirklich?
- **Ehrlichkeits-Funnel:** Verteilung der `pc_complete.ergebnis`-Werte – wie viele
  Leads filtert das Eligibility-Gate vor der teuren Beratung weg?
- **Rückführungs-Quote:** `pc_zum_kassencheck` – funktioniert die „kein Lead
  verloren"-Weiche?
- **A/B-Testplan (Konzept 5):** Verlust- vs. Gewinn-Framing würde über
  `kc_wechsel_click`-Raten pro Variante entschieden.
