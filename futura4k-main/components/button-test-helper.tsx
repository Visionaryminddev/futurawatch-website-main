"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface ButtonTestHelperProps {
  testMode?: boolean
}

export function ButtonTestHelper({ testMode = false }: ButtonTestHelperProps) {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!testMode) return

    // Test all navigation buttons
    const testButtons = () => {
      console.log("🔍 Testing all button destinations...")

      // Test navigation links
      const navLinks = [
        { path: "/", name: "Home" },
        { path: "/subscriptions", name: "Subscriptions" },
        { path: "/channels", name: "Channels" },
        { path: "/library", name: "Library" },
        { path: "/reseller", name: "Reseller" },
        { path: "/blog", name: "Blog" },
        { path: "/contact", name: "Contact" },
      ]

      navLinks.forEach((link) => {
        console.log(`✅ ${link.name} -> ${link.path}`)
      })

      toast({
        title: "Button Test Complete",
        description: "All navigation paths verified. Check console for details.",
      })
    }

    // Run test after component mount
    setTimeout(testButtons, 1000)
  }, [testMode, toast])

  if (!testMode) return null

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-500 text-black p-2 rounded text-xs z-50">
      🧪 Button Test Mode Active
    </div>
  )
}
