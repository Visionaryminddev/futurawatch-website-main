import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IPTV Blog - Complete Guides, Reviews & Tips 2025 | FuturaWatch',
  description: 'Discover comprehensive IPTV guides, reviews, and tips. Learn about IPTV technology, setup guides, best apps, security, and more. Expert insights for 2025.',
  keywords: 'IPTV blog, IPTV guides, IPTV reviews, IPTV tips, IPTV setup, best IPTV apps, IPTV security, IPTV troubleshooting, streaming guides, cord cutting',
  openGraph: {
    title: 'IPTV Blog - Complete Guides & Reviews 2025 | FuturaWatch',
    description: 'Expert IPTV guides, reviews, and tips. Learn everything about IPTV technology, setup, apps, security, and streaming optimization.',
    type: 'website',
    url: 'https://www.futurawatch.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IPTV Blog - Complete Guides & Reviews 2025',
    description: 'Expert IPTV guides, reviews, and tips for 2025.',
  },
  alternates: {
    canonical: 'https://www.futurawatch.com/blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


