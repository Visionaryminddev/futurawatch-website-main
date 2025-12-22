# SMTP Email Configuration voor Contact Formulier

## Overzicht
Het contactformulier op `/contact` stuurt emails naar **info@futurawatch.com** via SMTP wanneer gebruikers op "Send Message" klikken.

## Vereiste Environment Variables in Vercel

Voeg de volgende environment variables toe in je Vercel project:

### 1. SMTP Host
- **Name:** `SMTP_HOST`
- **Value:** Je SMTP server adres (bijvoorbeeld: `smtp.gmail.com`, `smtp.office365.com`, `mail.futurawatch.com`)
- **Environment:** Production, Preview, Development

### 2. SMTP Port
- **Name:** `SMTP_PORT`
- **Value:** `587` (voor TLS) of `465` (voor SSL)
- **Environment:** Production, Preview, Development

### 3. SMTP Username
- **Name:** `SMTP_USER`
- **Value:** Je SMTP gebruikersnaam/email adres
- **Environment:** Production, Preview, Development

### 4. SMTP Password
- **Name:** `SMTP_PASS`
- **Value:** Je SMTP wachtwoord of app-specifiek wachtwoord
- **Environment:** Production, Preview, Development

### 5. SMTP From Email (Optioneel)
- **Name:** `SMTP_FROM`
- **Value:** Email adres dat als afzender wordt gebruikt (bijvoorbeeld: `noreply@futurawatch.com`)
- **Environment:** Production, Preview, Development
- **Default:** Gebruikt `SMTP_USER` als dit niet is ingesteld

### 6. Contact Email (Optioneel)
- **Name:** `CONTACT_EMAIL`
- **Value:** `info@futurawatch.com` (standaard)
- **Environment:** Production, Preview, Development
- **Default:** `info@futurawatch.com`

## Populaire SMTP Providers

### Gmail
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password (niet je normale wachtwoord!)
```

**Belangrijk voor Gmail:**
- Je moet een "App Password" gebruiken, niet je normale Gmail wachtwoord
- Ga naar: Google Account → Security → 2-Step Verification → App Passwords
- Genereer een app password specifiek voor deze applicatie

### Office 365 / Outlook
```
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### Custom Email Server
```
SMTP_HOST=mail.futurawatch.com
SMTP_PORT=587
SMTP_USER=noreply@futurawatch.com
SMTP_PASS=your-password
SMTP_FROM=noreply@futurawatch.com
CONTACT_EMAIL=info@futurawatch.com
```

## Stappen om te Configureren in Vercel

1. Log in op [https://vercel.com](https://vercel.com)
2. Selecteer je **futurawatch** project
3. Ga naar **Settings** → **Environment Variables**
4. Klik op **Add New** voor elke variabele hierboven
5. Voeg de variabele toe voor **Production**, **Preview**, en **Development**
6. Klik op **Save**
7. **BELANGRIJK:** Ga naar **Deployments** en **Redeploy** de laatste deployment

## Testen

Na het configureren en deployen:

1. Ga naar https://www.futurawatch.com/contact
2. Vul het contactformulier in
3. Klik op "Send Message"
4. Controleer of je een email ontvangt op **info@futurawatch.com**
5. Controleer de Vercel logs voor eventuele errors

## Troubleshooting

### Email wordt niet ontvangen
- Controleer of alle environment variables correct zijn ingesteld in Vercel
- Controleer de Vercel logs voor SMTP errors
- Test de SMTP credentials met een email client (bijvoorbeeld Thunderbird)
- Zorg dat je firewall/security settings SMTP toegang toestaan

### Authentication Failed Error
- Voor Gmail: gebruik een App Password, niet je normale wachtwoord
- Controleer of je SMTP_USER en SMTP_PASS correct zijn
- Sommige providers vereisen dat je eerst "Less Secure Apps" inschakelt

### Connection Timeout
- Controleer of de SMTP_PORT correct is (587 voor TLS, 465 voor SSL)
- Controleer of je firewall SMTP toegang toestaat
- Sommige providers blokkeren verbindingen van cloud platforms - overweeg een dedicated SMTP service

## Email Format

De emails die worden verzonden bevatten:
- **From:** "FuturaWatch Contact Form" <SMTP_FROM>
- **To:** info@futurawatch.com
- **Reply-To:** Het email adres van de gebruiker
- **Subject:** [FuturaWatch Contact] <onderwerp>
- **Body:** HTML geformatteerde email met alle formuliergegevens

## Security Features

- ✅ HTML escaping om XSS aanvallen te voorkomen
- ✅ Input validatie (email format, minimum lengte)
- ✅ Connection timeout (30 seconden)
- ✅ SMTP connection verification
- ✅ Error handling met gebruiksvriendelijke berichten

