# Trustpilot Widget Setup Instructies

## Stap 1: Trustpilot Business Account Aanmaken

1. Ga naar [https://www.trustpilot.com/](https://www.trustpilot.com/)
2. Klik op "Claim your free business profile" of "Sign up"
3. Maak een Business account aan met je bedrijfsgegevens
4. Verifieer je email adres

## Stap 2: Business Unit ID Vinden

1. Log in op je Trustpilot Business account
2. Ga naar **Settings** → **Integrations** → **Widgets**
3. Of ga direct naar: [https://business.trustpilot.com/integrations/widgets](https://business.trustpilot.com/integrations/widgets)
4. Je ziet daar je **Business Unit ID** (bijvoorbeeld: `65b2a1b2c3d4e5f6a7b8c9d0`)

**Alternatief:**
- Ga naar je Trustpilot Business profiel pagina
- Klik op "Get reviews" → "Integrations" → "Widgets"
- Je Business Unit ID staat daar vermeld

## Stap 3: Business Unit ID Toevoegen aan Vercel

1. Log in op [https://vercel.com](https://vercel.com)
2. Selecteer je **futurawatch** project
3. Ga naar **Settings** → **Environment Variables**
4. Klik op **Add New**
5. Voeg de volgende environment variable toe:
   - **Name:** `NEXT_PUBLIC_TRUSTPILOT_BUSINESS_ID`
   - **Value:** Je Business Unit ID (bijvoorbeeld: `65b2a1b2c3d4e5f6a7b8c9d0`)
   - **Environment:** Selecteer **Production**, **Preview**, en **Development**
6. Klik op **Save**
7. **BELANGRIJK:** Na het toevoegen, ga naar **Deployments** en **Redeploy** de laatste deployment

## Stap 4: Verifieer de Widgets

Na het deployen:
1. Ga naar je live website: https://www.futurawatch.com
2. Controleer of de Trustpilot widgets zichtbaar zijn op:
   - Homepage (grote widget)
   - Subscriptions pagina
   - Purchase pagina (mini widget in order summary)
   - Contact pagina
   - Footer (mini widget)

## Widget Templates Gebruikt

De website gebruikt verschillende Trustpilot widget templates:

1. **Homepage:** Template `56278e9abfbbba0bdcd568bc` (500px hoog)
2. **Subscriptions & Contact:** Template `5419b6a8b0d04a076b216ad6` (140px hoog)
3. **Purchase & Footer:** Template `54d39695764ea9070450d9dc` (24px hoog - mini)

## Troubleshooting

**Widgets worden niet getoond:**
- Controleer of de Business Unit ID correct is in Vercel
- Zorg dat je een nieuwe deployment hebt gedaan na het toevoegen van de environment variable
- Controleer de browser console voor errors
- Zorg dat je Trustpilot Business account actief is

**Widgets tonen geen reviews:**
- Je moet eerst reviews hebben op je Trustpilot profiel
- Reviews kunnen 24-48 uur duren om te verschijnen na publicatie
- Controleer je Trustpilot Business dashboard voor review status

## Belangrijke Links

- Trustpilot Business Dashboard: [https://business.trustpilot.com](https://business.trustpilot.com)
- Widget Integrations: [https://business.trustpilot.com/integrations/widgets](https://business.trustpilot.com/integrations/widgets)
- Vercel Environment Variables: [https://vercel.com/docs/concepts/projects/environment-variables](https://vercel.com/docs/concepts/projects/environment-variables)


