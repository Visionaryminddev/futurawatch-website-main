import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/contexts/language-context"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#000000",
}

export const metadata: Metadata = {
  title: "FuturaWatch - Premium 4K IPTV Service",
  description:
    "Experience the future of entertainment with over 23,000+ live channels and 130,000+ movies & series in stunning 4K Ultra HD quality",
  keywords: "4K IPTV, Ultra HD IPTV, premium IPTV, live TV streaming, movies, series, FuturaWatch",
  openGraph: {
    title: "FuturaWatch - Premium 4K IPTV Service",
    description:
      "Experience the future of entertainment with over 23,000+ live channels and 130,000+ movies & series in stunning 4K Ultra HD quality",
    type: "website",
    siteName: "FuturaWatch",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) - Must be immediately after <head> */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-KZEYC1RPJ6"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KZEYC1RPJ6');
            `,
          }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//widget.trustpilot.com" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge" />
        {/* TrustBox script */}
        <script
          type="text/javascript"
          src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          async
        />
        {/* End TrustBox script */}
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`} suppressHydrationWarning>
        <ErrorBoundary>
          <LanguageProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
