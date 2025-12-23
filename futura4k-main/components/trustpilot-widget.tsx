"use client"

import { useEffect, useRef, useState } from "react"

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
function ensureTrustpilotScript(): Promise<boolean> {
  return new Promise((resolve) => {
    // Check if already loaded
    if (window.Trustpilot && typeof window.Trustpilot.loadFromElement === 'function') {
      console.log('✅ Trustpilot script already loaded')
      resolve(true)
      return
    }

    // Check if script tag already exists
    const existingScript = document.querySelector('script[src*="trustpilot.com/bootstrap"]')
    if (existingScript) {
      console.log('⏳ Trustpilot script tag exists, waiting for load...')
      // Script tag exists, wait for it to load
      let attempts = 0
      const maxAttempts = 100 // 10 seconds max
      const checkInterval = setInterval(() => {
        attempts++
        if (window.Trustpilot && typeof window.Trustpilot.loadFromElement === 'function') {
          console.log('✅ Trustpilot script loaded after', attempts * 100, 'ms')
          clearInterval(checkInterval)
          resolve(true)
        } else if (attempts >= maxAttempts) {
          console.warn('⚠️ Trustpilot script failed to load after timeout')
          clearInterval(checkInterval)
          resolve(false)
        }
      }, 100)
    } else {
      console.log('📥 Loading Trustpilot script...')
      // Script doesn't exist, load it
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js'
      script.async = true
      script.onload = () => {
        console.log('✅ Trustpilot script loaded successfully')
        // Wait a bit for Trustpilot to initialize
        setTimeout(() => resolve(true), 500)
      }
      script.onerror = (error) => {
        console.error('❌ Failed to load Trustpilot script:', error)
        resolve(false)
      }
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
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    if (!widgetRef.current || initializedRef.current) return

    const initializeWidget = async () => {
      try {
        console.log('🔄 Initializing Trustpilot widget:', { templateId, businessunitId })
        
        // Ensure script is loaded
        const scriptLoaded = await ensureTrustpilotScript()
        
        if (!scriptLoaded) {
          console.error('❌ Trustpilot script failed to load')
          setLoadError(true)
          return
        }

        // Wait a bit for DOM to be ready
        await new Promise(resolve => setTimeout(resolve, 500))

        // Initialize widget
        if (widgetRef.current && window.Trustpilot && typeof window.Trustpilot.loadFromElement === 'function') {
          console.log('🚀 Loading widget from element...')
          try {
            window.Trustpilot.loadFromElement(widgetRef.current, true)
            initializedRef.current = true
            console.log('✅ Widget initialized successfully')
            
            // Check if widget actually rendered after a delay
            setTimeout(() => {
              if (widgetRef.current) {
                const iframe = widgetRef.current.querySelector('iframe')
                const hasContent = widgetRef.current.children.length > 1 || iframe
                if (!hasContent) {
                  console.warn('⚠️ Widget container appears empty after initialization')
                  console.warn('⚠️ This might indicate a 403 error or missing reviews')
                  setLoadError(true)
                } else {
                  console.log('✅ Widget content detected')
                  // Check if iframe loaded successfully
                  if (iframe) {
                    iframe.onerror = () => {
                      console.error('❌ Widget iframe failed to load')
                      setLoadError(true)
                    }
                  }
                }
              }
            }, 3000)
          } catch (initError) {
            console.error('❌ Error calling loadFromElement:', initError)
            setLoadError(true)
          }
        } else {
          console.error('❌ Trustpilot API not available:', {
            hasTrustpilot: !!window.Trustpilot,
            hasLoadFromElement: !!(window.Trustpilot && typeof window.Trustpilot.loadFromElement === 'function'),
            hasElement: !!widgetRef.current
          })
          setLoadError(true)
        }
      } catch (error) {
        console.error("❌ Error initializing Trustpilot widget:", error)
        setLoadError(true)
      }
    }

    initializeWidget()

    // Cleanup
    return () => {
      initializedRef.current = false
    }
  }, [templateId, businessunitId])

  // Fallback if widget fails to load
  if (loadError) {
    return (
      <div className={`trustpilot-widget-fallback ${className}`} style={{ minHeight: styleHeight, width: styleWidth }}>
        <div className="flex flex-col items-center justify-center p-4 text-gray-400">
          <p className="text-sm mb-2">Trusted by Thousands</p>
          <p className="text-xs mb-3 text-gray-500">See what our customers are saying</p>
          <a 
            href="https://nl.trustpilot.com/review/futurawatch.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-yellow-500 hover:text-yellow-400 underline text-sm"
          >
            View reviews on Trustpilot →
          </a>
        </div>
      </div>
    )
  }

  // Build props object with only defined data attributes
  const divProps: any = {
    ref: widgetRef,
    className: `trustpilot-widget ${className}`,
    style: { minHeight: styleHeight, width: styleWidth },
    'data-locale': locale || 'nl-NL',
    'data-template-id': templateId,
    'data-businessunit-id': businessunitId,
    'data-style-height': styleHeight || '140px',
    'data-style-width': styleWidth || '100%',
  }

  // Only add optional attributes if they are defined
  if (theme) divProps['data-theme'] = theme
  if (stars) divProps['data-stars'] = stars
  if (fontFamily) divProps['data-font-family'] = fontFamily
  if (token) divProps['data-token'] = token

  return (
    <div {...divProps}>
      <a href="https://nl.trustpilot.com/review/futurawatch.com" target="_blank" rel="noopener noreferrer">
        Trustpilot
      </a>
    </div>
  )
}

