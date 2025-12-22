#!/bin/bash

# Script to replace all "4K" instances with "Ultra HD 4K & 8K" in translation files

echo "Updating all 4K references to Ultra HD 4K & 8K..."

# German file updates
echo "Updating German translations..."
sed -i '' 's/Bereit für 4K-Unterhaltung?/Bereit für Ultra HD 4K \& 8K-Unterhaltung?/g' "/Users/huso/Desktop/futura4k-2/translations/de.ts"
sed -i '' 's/4K Ultra HD Qualität/Ultra HD 4K \& 8K Qualität/g' "/Users/huso/Desktop/futura4k-2/translations/de.ts"
sed -i '' 's/4K Ultra HD-Qualität/Ultra HD 4K \& 8K-Qualität/g' "/Users/huso/Desktop/futura4k-2/translations/de.ts"
sed -i '' 's/4K-Streaming/Ultra HD 4K \& 8K-Streaming/g' "/Users/huso/Desktop/futura4k-2/translations/de.ts"
sed -i '' 's/Premium-4K-IPTV/Premium-Ultra HD 4K \& 8K-IPTV/g' "/Users/huso/Desktop/futura4k-2/translations/de.ts"
sed -i '' 's/Premium 4K IPTV/Premium Ultra HD 4K \& 8K IPTV/g' "/Users/huso/Desktop/futura4k-2/translations/de.ts"
sed -i '' 's/4K-IPTV-Service/Ultra HD 4K \& 8K-IPTV-Service/g' "/Users/huso/Desktop/futura4k-2/translations/de.ts"
sed -i '' 's/4K-Streaming-Technologie/Ultra HD 4K \& 8K-Streaming-Technologie/g' "/Users/huso/Desktop/futura4k-2/translations/de.ts"

# French file updates
echo "Updating French translations..."
sed -i '' 's/qualité 4K Ultra HD/qualité Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/translations/fr.ts"
sed -i '' 's/Qualité Premium 4K/Qualité Premium Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/translations/fr.ts"
sed -i '' 's/Qualité Ultra HD 4K/Qualité Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/translations/fr.ts"
sed -i '' 's/Qualité 4K Ultra HD/Qualité Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/translations/fr.ts"
sed -i '' 's/Divertissement en 4K/Divertissement en Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/translations/fr.ts"
sed -i '' 's/streaming 4K/streaming Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/translations/fr.ts"
sed -i '' 's/IPTV premium en 4K/IPTV premium en Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/translations/fr.ts"
sed -i '' 's/service IPTV 4K/service IPTV Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/translations/fr.ts"
sed -i '' 's/Streaming 4K/Streaming Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/translations/fr.ts"
sed -i '' 's/technologie de streaming 4K/technologie de streaming Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/translations/fr.ts"

# Italian file updates
echo "Updating Italian translations..."
sed -i '' 's/qualità 4K Ultra HD/qualità Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/translations/it.ts"
sed -i '' 's/Qualità Premium 4K/Qualità Premium Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/translations/it.ts"
sed -i '' 's/Qualità Ultra HD 4K/Qualità Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/translations/it.ts"
sed -i '' 's/Qualità 4K Ultra HD/Qualità Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/translations/it.ts"
sed -i '' 's/Intrattenimento in 4K/Intrattenimento in Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/translations/it.ts"
sed -i '' 's/streaming 4K/streaming Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/translations/it.ts"
sed -i '' 's/streaming IPTV premium in 4K/streaming IPTV premium in Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/translations/it.ts"
sed -i '' 's/servizio IPTV 4K/servizio IPTV Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/translations/it.ts"
sed -i '' 's/Streaming 4K/Streaming Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/translations/it.ts"
sed -i '' 's/tecnologia di streaming 4K/tecnologia di streaming Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/translations/it.ts"
sed -i '' 's/per lo streaming 4K/per lo streaming Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/translations/it.ts"

# Dutch file updates
echo "Updating Dutch translations..."
sed -i '' 's/4K Ultra HD kwaliteit/Ultra HD 4K \& 8K kwaliteit/g' "/Users/huso/Desktop/futura4k-2/translations/nl.ts"
sed -i '' 's/Premium 4K Kwaliteit/Premium Ultra HD 4K \& 8K Kwaliteit/g' "/Users/huso/Desktop/futura4k-2/translations/nl.ts"
sed -i '' 's/Ultra HD 4K Kwaliteit/Ultra HD 4K \& 8K Kwaliteit/g' "/Users/huso/Desktop/futura4k-2/translations/nl.ts"
sed -i '' 's/4K kwaliteit/Ultra HD 4K \& 8K kwaliteit/g' "/Users/huso/Desktop/futura4k-2/translations/nl.ts"
sed -i '' 's/4K Entertainment/Ultra HD 4K \& 8K Entertainment/g' "/Users/huso/Desktop/futura4k-2/translations/nl.ts"
sed -i '' 's/4K streaming/Ultra HD 4K \& 8K streaming/g' "/Users/huso/Desktop/futura4k-2/translations/nl.ts"
sed -i '' 's/premium 4K IPTV/premium Ultra HD 4K \& 8K IPTV/g' "/Users/huso/Desktop/futura4k-2/translations/nl.ts"
sed -i '' 's/4K IPTV streaming/Ultra HD 4K \& 8K IPTV streaming/g' "/Users/huso/Desktop/futura4k-2/translations/nl.ts"
sed -i '' 's/4K Streaming/Ultra HD 4K \& 8K Streaming/g' "/Users/huso/Desktop/futura4k-2/translations/nl.ts"
sed -i '' 's/4K streaming technologie/Ultra HD 4K \& 8K streaming technologie/g' "/Users/huso/Desktop/futura4k-2/translations/nl.ts"
sed -i '' 's/voor 4K streaming/voor Ultra HD 4K \& 8K streaming/g' "/Users/huso/Desktop/futura4k-2/translations/nl.ts"
sed -i '' 's/4K IPTV streaming service/Ultra HD 4K \& 8K IPTV streaming service/g' "/Users/huso/Desktop/futura4k-2/translations/nl.ts"
sed -i '' 's/4K IPTV-service/Ultra HD 4K \& 8K IPTV-service/g' "/Users/huso/Desktop/futura4k-2/translations/nl.ts"

echo "Updating hardcoded 4K references in components..."
# Update hardcoded 4K references in channels page
sed -i '' 's/>4K</>Ultra HD 4K \& 8K</g' "/Users/huso/Desktop/futura4k-2/app/channels/page.tsx"

# Update blog page 
sed -i '' 's/text=4K+Streaming/text=Ultra+HD+4K+8K+Streaming/g' "/Users/huso/Desktop/futura4k-2/app/blog/page.tsx"

# Update payment modals
sed -i '' 's/4K Ultra HD Quality/Ultra HD 4K \& 8K Quality/g' "/Users/huso/Desktop/futura4k-2/components/payment-modal.tsx"
sed -i '' 's/4K Ultra HD Quality/Ultra HD 4K \& 8K Quality/g' "/Users/huso/Desktop/futura4k-2/components/payment-modal-new.tsx"

# Update purchase success page
sed -i '' 's/Quality:<\/strong> 4K Ultra HD/Quality:<\/strong> Ultra HD 4K \& 8K/g' "/Users/huso/Desktop/futura4k-2/app/purchase-success/page.tsx"

echo "All 4K references have been updated to Ultra HD 4K & 8K!"
