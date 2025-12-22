#!/bin/bash

# Test script to verify translation implementations
echo "🔍 Testing Translation Implementation..."

# Check if all translation files exist
echo "📁 Checking translation files..."
for lang in en es de fr it nl; do
  if [ -f "translations/${lang}.ts" ]; then
    echo "✅ ${lang}.ts exists"
  else
    echo "❌ ${lang}.ts missing"
  fi
done

# Check if Dutch translations are properly included
echo ""
echo "📝 Checking Dutch translation integration..."

# Check language context
if grep -q '"nl"' contexts/language-context.tsx; then
  echo "✅ Dutch language added to context"
else
  echo "❌ Dutch language missing from context"
fi

# Check translations lib
if grep -q 'import nl' lib/translations.ts; then
  echo "✅ Dutch import added to translations lib"
else
  echo "❌ Dutch import missing from translations lib"
fi

# Check language switcher
if grep -q '"nl"' components/language-switcher.tsx; then
  echo "✅ Dutch option added to language switcher"
else
  echo "❌ Dutch option missing from language switcher"
fi

# Check for purchase/paymentRedirect keys in English
echo ""
echo "🔍 Checking purchase/paymentRedirect keys..."
if grep -q 'purchase\.title' translations/en.ts; then
  echo "✅ Purchase keys added to English"
else
  echo "❌ Purchase keys missing from English"
fi

if grep -q 'paymentRedirect\.title' translations/en.ts; then
  echo "✅ PaymentRedirect keys added to English"
else
  echo "❌ PaymentRedirect keys missing from English"
fi

# Check for purchase/paymentRedirect keys in Spanish
if grep -q 'purchase\.title' translations/es.ts; then
  echo "✅ Purchase keys added to Spanish"
else
  echo "❌ Purchase keys missing from Spanish"
fi

if grep -q 'paymentRedirect\.title' translations/es.ts; then
  echo "✅ PaymentRedirect keys added to Spanish"
else
  echo "❌ PaymentRedirect keys missing from Spanish"
fi

# Check for purchase/paymentRedirect keys in Dutch
if grep -q 'purchase\.title' translations/nl.ts; then
  echo "✅ Purchase keys added to Dutch"
else
  echo "❌ Purchase keys missing from Dutch"
fi

if grep -q 'paymentRedirect\.title' translations/nl.ts; then
  echo "✅ PaymentRedirect keys added to Dutch"
else
  echo "❌ PaymentRedirect keys missing from Dutch"
fi

echo ""
echo "🧪 Testing translation file syntax..."
node -e "
try {
  const translations = {
    en: require('./translations/en.ts').default,
    es: require('./translations/es.ts').default,
    de: require('./translations/de.ts').default,
    fr: require('./translations/fr.ts').default,
    it: require('./translations/it.ts').default,
    nl: require('./translations/nl.ts').default,
  };
  
  console.log('✅ All translation files have valid syntax');
  
  // Test key counts
  Object.keys(translations).forEach(lang => {
    const keys = Object.keys(translations[lang]);
    console.log(\`📊 \${lang.toUpperCase()}: \${keys.length} translation keys\`);
  });
  
  // Test for specific keys
  const testKeys = ['purchase.title', 'paymentRedirect.title', 'language.nl'];
  testKeys.forEach(key => {
    Object.keys(translations).forEach(lang => {
      if (translations[lang][key]) {
        console.log(\`✅ \${key} found in \${lang}\`);
      } else {
        console.log(\`❌ \${key} missing from \${lang}\`);
      }
    });
  });
  
} catch (error) {
  console.error('❌ Syntax error in translation files:', error.message);
}
"

echo ""
echo "🚀 Translation implementation test complete!"
