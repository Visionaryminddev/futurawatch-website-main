"use client"

import Link from "next/link"
import { Mail } from "lucide-react"
import { useTranslate } from "@/hooks/use-translate"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"

export function Footer() {
  const t = useTranslate()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 border-t border-gray-800 safe-area-bottom">
      <div className="mobile-container mobile-section-spacing">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo className="mb-4" />
            <p className="text-gray-400 mb-6 responsive-text leading-relaxed">{t("footer.description")}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">{t("footer.quickLinks")}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/subscriptions" className="text-gray-400 hover:text-yellow-500 transition-colors responsive-text block py-1 touch-element">
                  {t("nav.subscriptions")}
                </Link>
              </li>
              <li>
                <Link href="/channels" className="text-gray-400 hover:text-yellow-500 transition-colors responsive-text block py-1 touch-element">
                  {t("nav.channels")}
                </Link>
              </li>
              <li>
                <Link href="/library" className="text-gray-400 hover:text-yellow-500 transition-colors responsive-text block py-1 touch-element">
                  {t("nav.library")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-yellow-500 transition-colors responsive-text block py-1 touch-element">
                  {t("nav.blog")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">{t("footer.support")}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-yellow-500 transition-colors responsive-text block py-1 touch-element">
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link href="/contact#faq" className="text-gray-400 hover:text-yellow-500 transition-colors responsive-text block py-1 touch-element">
                  {t("footer.faq")}
                </Link>
              </li>
              <li>
                <Link href="/contact#terms" className="text-gray-400 hover:text-yellow-500 transition-colors responsive-text block py-1 touch-element">
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link href="/contact#privacy" className="text-gray-400 hover:text-yellow-500 transition-colors responsive-text block py-1 touch-element">
                  {t("footer.privacy")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">{t("footer.contactInfo")}</h3>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <button
                  onClick={() => window.open("mailto:info@futurawatch.com", "_blank")}
                  className="hover:text-yellow-500 transition-colors text-left responsive-text touch-element"
                >
                  info@futurawatch.com
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trustpilot Widget in Footer */}
        <div className="border-t border-gray-800 mt-8 pt-6 mb-6">
          <div className="text-center mb-4">
            <h3 className="text-sm font-semibold text-yellow-500 mb-2">Trusted by Thousands</h3>
          </div>
          <div
            className="trustpilot-widget"
            data-locale="nl-NL"
            data-template-id="54d39695764ea9070450d9dc"
            data-businessunit-id="694992481d2da56aaca4b6df"
            data-style-height="24px"
            data-style-width="100%"
            data-theme="dark"
            data-stars="4,5"
          >
            <a href="https://nl.trustpilot.com/review/futurawatch.com" target="_blank" rel="noopener">Trustpilot</a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
          <p className="responsive-text">{t("footer.copyright").replace("{{year}}", currentYear.toString()).replace("Futura4K", "FuturaWatch")}</p>
        </div>
      </div>
    </footer>
  )
}
