"use client"

import { useTranslate } from "@/hooks/use-translate"
import { useLanguage } from "@/contexts/language-context"

export default function LanguageTestPage() {
  const t = useTranslate()
  const { language, setLanguage } = useLanguage()

  const testKeys = [
    "nav.home",
    "nav.subscriptions", 
    "nav.channels",
    "nav.library",
    "hero.title",
    "hero.subtitle",
    "subscriptions.title",
    "subscriptions.mostPopular",
    "channels.title",
    "channels.stats.countries",
    "library.title",
    "library.tabs.movies",
    "contact.title",
    "footer.description"
  ]

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">Language Test Page</h1>
          <p className="text-gray-400 mb-8">Current Language: {language}</p>
          
          <div className="flex justify-center space-x-4 mb-12">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as "en" | "es" | "de" | "fr" | "it")}
                className={`px-4 py-2 rounded transition-colors ${
                  language === lang.code 
                    ? "bg-yellow-500 text-black" 
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {lang.flag} {lang.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          {testKeys.map((key) => (
            <div key={key} className="bg-gray-900 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-2">Key: {key}</div>
              <div className="text-lg text-white">{t(key)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
