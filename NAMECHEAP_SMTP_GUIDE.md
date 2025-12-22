# Namecheap SMTP Instellingen - Stap voor Stap Gids

## Waar vind je je SMTP instellingen bij Namecheap?

Je hebt **2 opties** afhankelijk van welke email service je gebruikt:

---

## Optie 1: Namecheap Private Email (Aanbevolen)

Als je **Private Email** van Namecheap gebruikt (de meest gebruikte optie):

### Stap 1: Log in op Namecheap
1. Ga naar [https://www.namecheap.com](https://www.namecheap.com)
2. Klik op **Sign In** (rechtsboven)
3. Log in met je account

### Stap 2: Ga naar Private Email
1. In je dashboard, klik op **Account** → **Domain List**
2. Klik op **Manage** naast je domein (futurawatch.com)
3. Scroll naar beneden naar **Private Email** sectie
4. Klik op **Manage** naast je email account (info@futurawatch.com)

### Stap 3: Vind je SMTP Instellingen

**Voor Private Email gebruik je:**

```
SMTP_HOST = mail.privateemail.com
SMTP_PORT = 587 (of 465 voor SSL)
SMTP_USER = info@futurawatch.com (je volledige email adres)
SMTP_PASS = [je email wachtwoord]
SMTP_FROM = info@futurawatch.com (of noreply@futurawatch.com)
CONTACT_EMAIL = info@futurawatch.com
```

**Belangrijk:**
- Gebruik je **volledige email adres** als gebruikersnaam (info@futurawatch.com)
- Gebruik poort **587** voor TLS (aanbevolen) of **465** voor SSL
- Je wachtwoord is het wachtwoord dat je hebt ingesteld voor je email account

---

## Optie 2: cPanel Email (Als je hosting bij Namecheap hebt)

Als je **cPanel email** gebruikt via Namecheap hosting:

### Stap 1: Log in op cPanel
1. Ga naar je Namecheap account
2. Ga naar **Hosting List**
3. Klik op **Manage** naast je hosting account
4. Klik op **cPanel** (of ga direct naar `cpanel.futurawatch.com`)

### Stap 2: Vind Email Accounts
1. In cPanel, zoek naar **Email Accounts** sectie
2. Klik op **Email Accounts**
3. Je ziet alle email accounts die je hebt aangemaakt

### Stap 3: Vind SMTP Instellingen

**Voor cPanel Email gebruik je:**

```
SMTP_HOST = mail.futurawatch.com
SMTP_PORT = 587 (of 465 voor SSL)
SMTP_USER = info@futurawatch.com (je volledige email adres)
SMTP_PASS = [je email wachtwoord]
SMTP_FROM = info@futurawatch.com (of noreply@futurawatch.com)
CONTACT_EMAIL = info@futurawatch.com
```

**Belangrijk:**
- De SMTP host is meestal `mail.jouwdomein.com` (dus `mail.futurawatch.com`)
- Gebruik je **volledige email adres** als gebruikersnaam
- Je wachtwoord is het wachtwoord dat je hebt ingesteld in cPanel

---

## Welke optie gebruik je?

### Check 1: Heb je Private Email gekocht?
- Ga naar Namecheap → Domain List → Manage → Kijk of je "Private Email" ziet
- **JA** → Gebruik **Optie 1** (mail.privateemail.com)
- **NEE** → Ga naar Check 2

### Check 2: Heb je hosting bij Namecheap?
- Ga naar Namecheap → Hosting List
- **JA** → Gebruik **Optie 2** (mail.futurawatch.com)
- **NEE** → Je moet eerst email hosting instellen

---

## Als je nog geen email account hebt

### Optie A: Private Email kopen (Aanbevolen - €1.16/maand)
1. Ga naar Namecheap → Domain List → Manage
2. Scroll naar **Private Email**
3. Klik op **Get Private Email**
4. Kies een plan en koop
5. Maak email account aan: **info@futurawatch.com**

### Optie B: Email via hosting (Als je hosting hebt)
1. Log in op cPanel
2. Ga naar **Email Accounts**
3. Klik op **Create**
4. Maak email account aan: **info@futurawatch.com**
5. Stel een wachtwoord in

---

## Stap-voor-Stap: Instellen in Vercel

### Stap 1: Log in op Vercel
1. Ga naar [https://vercel.com](https://vercel.com)
2. Log in met je account

### Stap 2: Ga naar Environment Variables
1. Selecteer je **futurawatch** project
2. Klik op **Settings** (bovenaan)
3. Klik op **Environment Variables** (in het linker menu)

### Stap 3: Voeg SMTP variabelen toe

Klik op **Add New** en voeg deze toe (één voor één):

#### Variabele 1: SMTP_HOST
- **Key:** `SMTP_HOST`
- **Value:** 
  - `mail.privateemail.com` (als je Private Email gebruikt)
  - OF `mail.futurawatch.com` (als je cPanel gebruikt)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- Klik **Save**

#### Variabele 2: SMTP_PORT
- **Key:** `SMTP_PORT`
- **Value:** `587`
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- Klik **Save**

#### Variabele 3: SMTP_USER
- **Key:** `SMTP_USER`
- **Value:** `info@futurawatch.com` (je volledige email adres)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- Klik **Save**

#### Variabele 4: SMTP_PASS
- **Key:** `SMTP_PASS`
- **Value:** [Je email wachtwoord] (het wachtwoord van je info@futurawatch.com account)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- Klik **Save**

#### Variabele 5: SMTP_FROM (Optioneel)
- **Key:** `SMTP_FROM`
- **Value:** `info@futurawatch.com` (of `noreply@futurawatch.com`)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- Klik **Save**

#### Variabele 6: CONTACT_EMAIL (Optioneel)
- **Key:** `CONTACT_EMAIL`
- **Value:** `info@futurawatch.com`
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- Klik **Save**

### Stap 4: Redeploy
1. Ga naar **Deployments** (in het linker menu)
2. Klik op de **3 puntjes** (⋯) naast je laatste deployment
3. Klik op **Redeploy**
4. Wacht tot de deployment klaar is

---

## Testen

Na het configureren:

1. Ga naar https://www.futurawatch.com/contact
2. Vul het contactformulier in:
   - Naam: Test
   - Email: test@example.com
   - Onderwerp: Test Email
   - Bericht: Dit is een test bericht
3. Klik op **Send Message**
4. Controleer je inbox op **info@futurawatch.com**
5. Je zou een email moeten ontvangen met het formulier bericht

---

## Troubleshooting

### "Authentication Failed" Error
- ✅ Controleer of je **volledige email adres** gebruikt als SMTP_USER (info@futurawatch.com)
- ✅ Controleer of je wachtwoord correct is (geen extra spaties)
- ✅ Voor Private Email: Zorg dat je email account actief is

### "Connection Timeout" Error
- ✅ Controleer of SMTP_PORT correct is (587 voor TLS)
- ✅ Probeer poort 465 als 587 niet werkt
- ✅ Controleer of je firewall SMTP toegang toestaat

### Email wordt niet ontvangen
- ✅ Controleer je spam/junk folder
- ✅ Controleer Vercel logs voor errors
- ✅ Test of je email account werkt door een test email te sturen vanuit een email client

### "Email service is not configured" Error
- ✅ Controleer of alle environment variables zijn toegevoegd in Vercel
- ✅ Zorg dat je **Production**, **Preview**, en **Development** allemaal hebt geselecteerd
- ✅ Redeploy je project na het toevoegen van variabelen

---

## Snelle Referentie

**Voor Private Email:**
```
SMTP_HOST=mail.privateemail.com
SMTP_PORT=587
SMTP_USER=info@futurawatch.com
SMTP_PASS=[je wachtwoord]
```

**Voor cPanel Email:**
```
SMTP_HOST=mail.futurawatch.com
SMTP_PORT=587
SMTP_USER=info@futurawatch.com
SMTP_PASS=[je wachtwoord]
```

---

## Hulp Nodig?

Als je problemen hebt:
1. Controleer de Vercel logs (Deployments → Klik op deployment → Logs)
2. Test je email account met een email client (Outlook, Thunderbird)
3. Neem contact op met Namecheap support als je email account niet werkt

