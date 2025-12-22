"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslate } from "@/hooks/use-translate"
import { Logo } from "@/components/logo"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslate()

  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-gray-800 z-50 safe-area-top">
      <div className="mobile-container">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link href="/" className="text-gray-300 hover:text-yellow-500 transition-colors duration-200 mobile-text-base">
              {t("nav.home")}
            </Link>
            <Link href="/subscriptions" className="text-gray-300 hover:text-yellow-500 transition-colors duration-200 mobile-text-base">
              {t("nav.subscriptions")}
            </Link>
            <Link href="/channels" className="text-gray-300 hover:text-yellow-500 transition-colors duration-200 mobile-text-base">
              {t("nav.channels")}
            </Link>
            <Link href="/library" className="text-gray-300 hover:text-yellow-500 transition-colors duration-200 mobile-text-base">
              {t("nav.library")}
            </Link>
            <Link href="/reseller" className="text-gray-300 hover:text-yellow-500 transition-colors duration-200 mobile-text-base">
              {t("nav.reseller")}
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-yellow-500 transition-colors duration-200 mobile-text-base">
              {t("nav.blog")}
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-yellow-500 transition-colors duration-200 mobile-text-base">
              {t("nav.contact")}
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link href="/subscriptions">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition-all duration-200 mobile-button">
                {t("nav.getStarted")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <div className="scale-90">
              <LanguageSwitcher />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-yellow-500 transition-colors touch-target mobile-focus p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-4 space-y-1 bg-black/98 border-t border-gray-800 backdrop-blur-sm">
              <Link
                href="/"
                className="block px-4 py-3 text-gray-300 hover:text-yellow-500 hover:bg-gray-800/50 rounded-lg transition-all duration-200 mobile-text-base touch-element"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.home")}
              </Link>
              <Link
                href="/subscriptions"
                className="block px-4 py-3 text-gray-300 hover:text-yellow-500 hover:bg-gray-800/50 rounded-lg transition-all duration-200 mobile-text-base touch-element"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.subscriptions")}
              </Link>
              <Link
                href="/channels"
                className="block px-4 py-3 text-gray-300 hover:text-yellow-500 hover:bg-gray-800/50 rounded-lg transition-all duration-200 mobile-text-base touch-element"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.channels")}
              </Link>
              <Link
                href="/library"
                className="block px-4 py-3 text-gray-300 hover:text-yellow-500 hover:bg-gray-800/50 rounded-lg transition-all duration-200 mobile-text-base touch-element"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.library")}
              </Link>
              <Link
                href="/reseller"
                className="block px-4 py-3 text-gray-300 hover:text-yellow-500 hover:bg-gray-800/50 rounded-lg transition-all duration-200 mobile-text-base touch-element"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.reseller")}
              </Link>
              <Link
                href="/blog"
                className="block px-4 py-3 text-gray-300 hover:text-yellow-500 hover:bg-gray-800/50 rounded-lg transition-all duration-200 mobile-text-base touch-element"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.blog")}
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-3 text-gray-300 hover:text-yellow-500 hover:bg-gray-800/50 rounded-lg transition-all duration-200 mobile-text-base touch-element"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.contact")}
              </Link>
              <div className="px-2 pt-3">
                <Link href="/subscriptions" className="block">
                  <Button
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold mobile-button-lg touch-element"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.getStarted")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
