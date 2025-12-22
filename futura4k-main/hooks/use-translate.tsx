"use client"

import { useLanguage } from "@/contexts/language-context"
import { getTranslation } from "@/lib/translations"

export function useTranslate() {
  const { language } = useLanguage()

  const translate = (key: string, replacements?: Record<string, string>) => {
    // Get the translation using the helper function
    let translation = getTranslation(language, key)

    // Replace placeholders if replacements are provided
    if (replacements) {
      Object.entries(replacements).forEach(([placeholder, value]) => {
        translation = translation.replace(`{{${placeholder}}}`, value)
      })
    }

    return translation
  }

  return translate
}
