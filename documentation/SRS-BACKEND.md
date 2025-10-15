## Funktionella krav

### Avsändare
- Ska kunna registrera enheter (sensorpaket) och få en fraktsedel med QR-/streckkod.
- Ska ha en datavy för paketets nuvarande position, temperatur och luftfuktighet.
- Ska kunna se notiser vid temperatur- och fuktighetsavvikelser.
- *(Möjligt tillägg)* Ska kunna se historik över data.
- *(Möjligt tillägg)* Ska kunna se en startsida för flera sända paket.

### Transportör / förare
- Förare ska kunna registrera mottagna paket genom att scanna streckkod/QR-kod.
- Systemet ska koppla paket till lastbilen och starta loggning (position, temp, fukt).
- Transportören ska kunna se en datavy för enskilda paket.
- Transportören ska få varningar/notiser om temperatur eller fuktvärden riskerar/överskrider gränser.

### Mottagare (beställare av transport)
- Ska kunna följa transporten i en vy (liknande avsändaren men endast för egna paket).
- Ska kunna registrera mottagande av paket genom scanning av fraktsedel.
- Ska kunna avsluta loggningen och få leveranskvitto (inkl. temperatur- och fuktstatus).

### Logistikansvarig
- Ska kunna se datavyer per lastbil, kund och tidsenhet.
- Ska kunna filtrera data (t.ex. brutna kyl-/fuktkedjor).
- *(Låg prioritet)* Anpassad data-vy för avsändare/mottagare.

### Gemensamt / systemfunktioner
- Möjlighet att generera en QR-/streckkod för fraktsedel.
- Dataflöde: Fordonets basenhet → Server → Mobilapp.
- Loggning av temperatur, fuktighet och position under transport.

---

## Icke-funktionella krav

- **Tillförlitlighet:** Systemet måste kunna upptäcka och rapportera temperatur/fuktavvikelser i realtid.
- **Säkerhet:** Endast behöriga roller (avsändare, transportör, mottagare, logistikansvarig) ska kunna komma åt sina data.
- **Prestanda:** Datavärden från sensorer ska uppdateras med låg fördröjning (nära realtid).
- **Skalbarhet:** Systemet ska kunna hantera flera paket, lastbilar och kunder samtidigt.
- **Användbarhet:** Enkla gränssnitt för scanning av QR-/streckkod i mobilapp.
- **Tillgänglighet:** Systemet bör vara åtkomligt via både mobilapp och webb.
- **Spårbarhet:** Historiska data ska kunna sparas och visas (vid behov).
- **Flexibilitet:** Systemet ska kunna byggas ut med fler funktioner (t.ex. koppling förare ↔ lastbil).