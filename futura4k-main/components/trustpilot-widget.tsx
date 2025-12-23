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

// Ensure script is loaded
function ensureTrustpilotScript(): Promise<void> {
  return new Promise((resolve) => {
    // Check if already loaded
    if (window.Trustpilot && typeof window.Trustpilot.loadFromElement === 'function') {
      resolve()
      return
    }

    // Check if script tag already exists
    const existingScript = document.querySelector('script[src*="trustpilot.com/bootstrap"]')
    if (existingScript) {
      // Script tag exists, wait for it to load
      const checkInterval = setInterval(() => {
        if (window.Trustpilot && typeof window.Trustpilot.loadFromElement === 'function') {
          clearInterval(checkInterval)
          resolve()
        }
      }, 100)

      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval)
        resolve() // Resolve anyway to not block
      }, 10000)
    } else {
      // Script doesn't exist, load it
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js'
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => resolve() // Resolve on error to not block
      document.head.appendChild(script)
    }
  })
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
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!widgetRef.current || initializedRef.current) return

    const initializeWidget = async () => {
      try {
        // Ensure script is loaded
        await ensureTrustpilotScript()

        // Wait a bit for DOM to be ready
        await new Promise(resolve => setTimeout(resolve, 300))

        // Initialize widget
        if (widgetRef.current && window.Trustpilot && typeof window.Trustpilot.loadFromElement === 'function') {
          window.Trustpilot.loadFromElement(widgetRef.current, true)
          initializedRef.current = true
        }
      } catch (error) {
        console.error("Error initializing Trustpilot widget:", error)
      }
    }

    initializeWidget()

    // Cleanup
    return () => {
      initializedRef.current = false
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
      <a href="https://nl.trustpilot.com/review/futurawatch.com" target="_blank" rel="noopener noreferrer">
        Trustpilot
      </a>
    </div>
  )
}

