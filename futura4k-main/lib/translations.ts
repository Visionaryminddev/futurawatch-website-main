// Import all translation files using default imports
import en from "@/translations/en"
import es from "@/translations/es"
import de from "@/translations/de"
import fr from "@/translations/fr"
import it from "@/translations/it"
import nl from "@/translations/nl"

// Export translations object
export const translations = {
  en,
  es,
  de,
  fr,
  it,
  nl,
}

// Helper function to get translation
export function getTranslation(language: string, key: string): string {
  const lang = language as keyof typeof translations
  const translationSet = translations[lang] || translations.en
  return (translationSet as Record<string, string>)[key] || key
}
