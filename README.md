# Voilà

*Voilà, weer eentje afgevinkt.*

Een rustige, ADHD-vriendelijke to-do- en weekplanner die werkt op pc, tablet en iPhone.

- **Vandaag** met een top 3, voortgang en een focusmodus (één taak tegelijk, met timer)
- **Weekplanning** met taken en lessen per dag, en lessen kopiëren van vorige week
- **Deadlines** met aftelling
- **Hoofd leegmaken**: alles snel noteren, later inplannen
- Eigen account (e-mail + wachtwoord), synchroniseert tussen al je toestellen
- Installeerbaar als app en werkt ook even zonder internet

De app is een gewone website (`index.html`), gehost via **GitHub Pages**.
Accounts en opslag lopen via **Firebase** (gratis Spark-abonnement).

---

## Eenmalige installatie (± 15 minuten)

### 1. Firebase-project aanmaken
1. Ga naar <https://console.firebase.google.com> en meld je aan met een Google-account.
2. Klik **Project maken** (of *Add project*), noem het bv. `voila`.
3. Google Analytics mag je uitzetten. Klik **Project maken**.

### 2. Web-app registreren
1. Klik in het projectoverzicht op het **`</>`-icoon** (Web).
2. Geef een naam (bv. `Voilà`). Firebase Hosting hoef je **niet** aan te vinken.
3. Je krijgt een stukje code met `const firebaseConfig = { ... }`. Laat dit open, je hebt het nodig in stap 4.

### 3. Aanmelden met e-mail aanzetten
1. Links: **Build → Authentication → Aan de slag**.
2. Tabblad **Sign-in method** → kies **E-mail/wachtwoord** → zet de eerste schakelaar aan → **Opslaan**.
3. Tabblad **Settings → Authorized domains** → **Add domain** → vul in: `ind-ing-bouwkunde-vr.github.io`

### 4. Database aanmaken
1. Links: **Build → Firestore Database → Database maken**.
2. Kies als locatie **europe-west1 (Belgium)** en start in **productiemodus**.
3. Ga naar het tabblad **Regels (Rules)**, vervang alles door de inhoud van [`firestore.rules`](firestore.rules) en klik **Publiceren**.
   Zo kan iedereen alleen zijn eigen planning lezen en aanpassen.

### 5. Gegevens invullen in `config.js`
Open [`config.js`](config.js) hier op GitHub, klik op het potloodje en vervang de `VUL_IN`-waarden
door de waarden uit stap 2. Klik **Commit changes**.

> Die gegevens zijn niet geheim; Firebase is zo ontworpen. Je planning is beschermd door je account en de regels uit stap 4.

Na ongeveer een minuut staat de app online op:
**https://ind-ing-bouwkunde-vr.github.io/voila/**

---

## Op je toestellen zetten

Open de link hierboven en maak een account aan (of meld je aan). Gebruik op elk toestel **hetzelfde account**.

| Toestel | Als app installeren |
|---|---|
| **Windows (Edge)** | ⋯ → Apps → *Deze site installeren als app*. Daarna rechtsklik op het icoon → *Vastmaken aan taakbalk*. |
| **Windows (Chrome)** | ⋮ → *Opslaan en delen* → *Pagina installeren*. |
| **Samsung-tablet** | Chrome: ⋮ → *Toevoegen aan startscherm* / *App installeren*. Samsung Internet: ☰ → *Pagina toevoegen aan* → *Startscherm*. |
| **iPhone** | Open in **Safari** → deelknop → *Zet op beginscherm*. Open de app via het icoon en meld je daar één keer aan. |

Rechtsboven zie je een bolletje: **groen** = gesynchroniseerd, **oranje** = offline (wijzigingen worden later doorgestuurd).

## Bestanden

| Bestand | Wat |
|---|---|
| `index.html` | De hele app |
| `config.js` | Je Firebase-gegevens |
| `firestore.rules` | Beveiligingsregels voor de database |
| `manifest.webmanifest`, `sw.js`, `icons/` | Maken het installeerbaar en offline bruikbaar |
