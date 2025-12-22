"use client"

import type React from "react"

import { useLanguage } from "@/contexts/language-context"
import { LoadingScreen } from "@/components/loading-screen"

interface TranslationWrapperProps {
  children: React.ReactNode
}

export function TranslationWrapper({ children }: TranslationWrapperProps) {
  const { isLoading } = useLanguage()

  if (isLoading) {
    return <LoadingScreen />
  }

  return <>{children}</>
}
