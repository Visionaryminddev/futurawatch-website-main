"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Mail, MessageCircle, Home } from "lucide-react"
import { useTranslate } from "@/hooks/use-translate"

export default function PurchaseSuccessPage() {
  const [countdown, setCountdown] = useState(10)
  const router = useRouter()
  const t = useTranslate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleGoHome = () => {
    router.push('/')
  }

  const handleContactSupport = () => {
    window.open("https://signal.me/#eu/Td0r6W11XPRx9fPR-VNGX5HtY6UoUyvo779QXjGe85xm6M8wQ3dKa41lh2ep5HDQ", "_blank")
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="mobile-container py-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
            </div>
            <h1 className="responsive-title mb-4">
              🎉 <span className="text-green-500">PayPal Payment Successful!</span>
            </h1>
            <p className="responsive-subtitle text-gray-400 max-w-2xl mx-auto">
              Thank you for choosing FuturaWatch! Your IPTV subscription has been activated successfully.
            </p>
          </div>

          {/* Success Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Account Details */}
            <Card className="mobile-card bg-gray-900 border-gray-700 text-left">
              <CardHeader>
                <CardTitle className="text-yellow-500 flex items-center responsive-subtitle">
                  <Mail className="w-5 h-5 mr-2" />
                  Account Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <h3 className="font-semibold text-green-400 mb-2">✅ Activation Complete</h3>
                  <p className="responsive-text text-gray-300">
                    Your login credentials have been sent to your email address within 5-10 minutes.
                  </p>
                </div>
                <div className="space-y-2 responsive-text text-gray-300">
                  <p><strong>Service:</strong> Premium IPTV Access</p>
                  <p><strong>Channels:</strong> 23,000+ Live Channels</p>
                  <p><strong>Content:</strong> 130,000+ Movies & Series</p>
                  <p><strong>Quality:</strong> Ultra HD 4K & 8K</p>
                  <p><strong>Support:</strong> 24/7 Available</p>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="mobile-card bg-gray-900 border-gray-700 text-left">
              <CardHeader>
                <CardTitle className="text-yellow-500 flex items-center responsive-subtitle">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  What&apos;s Next?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                      1
                    </div>
                    <div>
                  <h4 className="font-semibold responsive-text">Check Your Email</h4>
                      <p className="text-gray-400 text-sm">Your PayPal receipt and IPTV login credentials will arrive within 5-10 minutes.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold responsive-text">Download Your App</h4>
                      <p className="text-gray-400 text-sm">Compatible with all devices and platforms</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold responsive-text">Start Watching</h4>
                      <p className="text-gray-400 text-sm">Enjoy unlimited entertainment immediately</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              onClick={handleGoHome}
              className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-semibold mobile-button-lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Return to Homepage
            </Button>
            <Button 
              onClick={handleContactSupport}
              variant="outline"
              className="w-full sm:w-auto border-gray-600 text-white hover:bg-gray-700 mobile-button-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Support
            </Button>
          </div>

          {/* Auto Redirect Notice */}
          <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <p className="responsive-text text-gray-400">
              You&apos;ll be automatically redirected to the homepage in <span className="text-yellow-500 font-semibold">{countdown}</span> seconds
            </p>
          </div>

          {/* Support Info */}
          <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h3 className="font-semibold text-blue-400 mb-2 responsive-subtitle">Need Help?</h3>
            <p className="responsive-text text-gray-300 mb-4">
              Our support team is available 24/7 to assist you with setup and any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center text-sm text-gray-400">
              <span>📧 Support Email: support@futurawatch.com</span>
              <span className="hidden sm:inline">•</span>
              <span>💬 Live Chat: Available on all pages</span>
              <span className="hidden sm:inline">•</span>
              <span>⚡ Response Time: Under 30 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}