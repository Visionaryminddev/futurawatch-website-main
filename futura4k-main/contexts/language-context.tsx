"use client"

import { createContext, useState, useEffect, type ReactNode, useContext } from "react"

export type Language = "en" | "es" | "de" | "fr" | "it" | "nl"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isLoading?: boolean
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage on client side
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && ["en", "es", "de", "fr", "it", "nl"].includes(savedLanguage)) {
        setLanguage(savedLanguage)
      }
    } catch (error) {
      console.error("Failed to load language preference:", error)
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem("language", language)
    } catch (error) {
      console.error("Failed to save language preference:", error)
    }
  }, [language])

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

// Add the useLanguage hook export
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
