#!/usr/bin/env node

// Simple test to verify translation system
console.log('🧪 Testing FuturaWatch Translation System...\n');

try {
  // Test importing translations
  const en = require('./translations/en.ts');
  const es = require('./translations/es.ts'); 
  const de = require('./translations/de.ts');
  const fr = require('./translations/fr.ts');
  const it = require('./translations/it.ts');

  console.log('✅ All translation files imported successfully\n');

  // Test key translations
  const testKeys = [
    'nav.home',
    'hero.title',
    'reseller.badge',
    'reseller.title'
  ];

  console.log('🔍 Testing key translation keys:\n');
  
  testKeys.forEach(key => {
    console.log(`Key: ${key}`);
    console.log(`🇬🇧 EN: ${en.default?.[key] || en[key] || '❌ Missing'}`);
    console.log(`🇪🇸 ES: ${es.default?.[key] || es[key] || '❌ Missing'}`);
    console.log(`🇩🇪 DE: ${de.default?.[key] || de[key] || '❌ Missing'}`);
    console.log(`🇫🇷 FR: ${fr.default?.[key] || fr[key] || '❌ Missing'}`);
    console.log(`🇮🇹 IT: ${it.default?.[key] || it[key] || '❌ Missing'}`);
    console.log('---');
  });

  console.log('\n✅ Translation system test completed!');
  console.log('🚀 You can now start the development server with: npm run dev');

} catch (error) {
  console.error('❌ Translation system test failed:');
  console.error(error.message);
  console.error('\n🔧 Possible solutions:');
  console.error('1. Check translation file syntax');
  console.error('2. Ensure all files use export default {}');
  console.error('3. Run npm install to ensure dependencies are installed');
}
