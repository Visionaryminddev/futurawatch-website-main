"use client"

import { useEffect, useRef } from "react"

interface TrustpilotWidgetProps {
  templateId: string
  businessunitId: string
  locale?: string
  styleHeight?: string
  styleWidth?: string
  theme?: string
  stars?: string
  fontFamily?: string
  token?: string
  className?: string
}

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement, reload?: boolean) => void
    }
  }
}

export function TrustpilotWidget({
  templateId,
  businessunitId,
  locale = "nl-NL",
  styleHeight = "140px",
  styleWidth = "100%",
  theme = "dark",
  stars,
  fontFamily,
  token,
  className = "",
}: TrustpilotWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadWidget = () => {
      if (widgetRef.current && window.Trustpilot) {
        try {
          window.Trustpilot.loadFromElement(widgetRef.current, true)
        } catch (error) {
          console.error("Error loading Trustpilot widget:", error)
        }
      }
    }

    // Check if Trustpilot is already loaded
    if (window.Trustpilot && window.Trustpilot.loadFromElement) {
      // Small delay to ensure DOM is ready
      setTimeout(loadWidget, 100)
    } else {
      // Wait for the script to load
      const checkTrustpilot = setInterval(() => {
        if (window.Trustpilot && window.Trustpilot.loadFromElement) {
          clearInterval(checkTrustpilot)
          loadWidget()
        }
      }, 100)

      // Cleanup after 10 seconds
      const timeout = setTimeout(() => {
        clearInterval(checkTrustpilot)
      }, 10000)

      return () => {
        clearInterval(checkTrustpilot)
        clearTimeout(timeout)
      }
    }
  }, [templateId, businessunitId])

  return (
    <div
      ref={widgetRef}
      className={`trustpilot-widget ${className}`}
      data-locale={locale}
      data-template-id={templateId}
      data-businessunit-id={businessunitId}
      data-style-height={styleHeight}
      data-style-width={styleWidth}
      data-theme={theme}
      data-stars={stars}
      data-font-family={fontFamily}
      data-token={token}
    >
      <a href="https://nl.trustpilot.com/review/futurawatch.com" target="_blank" rel="noopener">
        Trustpilot
      </a>
    </div>
  )
}

