"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Lock, Check, Shield } from "lucide-react"
import { useTranslate } from "@/hooks/use-translate"
import { useToast } from "@/hooks/use-toast"

type Plan = {
  name: string
  price: string
  duration: string
}

function PaymentRedirectContent() {
  const [plan, setPlan] = useState<Plan | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [email, setEmail] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslate()
  const { toast } = useToast()

  useEffect(() => {
    const planData = {
      name: searchParams.get('name') || 'Premium IPTV',
      price: searchParams.get('price') || '€19.99',
      duration: searchParams.get('duration') || '1 Month'
    }
    setPlan(planData)
  }, [searchParams])

  const handlePayPalPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast({
        title: "Missing Information",
        description: "Please enter your email address",
        variant: "destructive"
      })
      return
    }

    if (!plan) {
      toast({
        title: "Error",
        description: "Plan information is missing",
        variant: "destructive"
      })
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName: plan.name,
          planPrice: plan.price,
          planDuration: plan.duration,
          email: email,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Show detailed error message
        const errorMsg = data.error || 'Failed to create PayPal order'
        console.error('PayPal API error:', { status: response.status, data })
        
        // Show the actual error message from PayPal
        if (data.type === 'authentication_error') {
          throw new Error(`PayPal Authentication Error: ${errorMsg}. Please check your PayPal credentials in Vercel.`)
        }
        
        if (errorMsg.includes('not configured') || errorMsg.includes('PAYPAL_CLIENT_ID')) {
          throw new Error(`PayPal Configuration Error: ${errorMsg}. Please check Vercel environment variables.`)
        }
        
        throw new Error(errorMsg)
      }

      if (data.approvalUrl) {
        // Redirect to PayPal
        window.location.href = data.approvalUrl
      } else {
        throw new Error('No PayPal approval URL received. Please try again or contact support.')
      }

    } catch (error: any) {
      console.error('PayPal error:', error)
      toast({
        title: "Payment Error",
        description: error.message || "Failed to process payment. Please check your PayPal configuration or try again later.",
        variant: "destructive",
        duration: 5000
      })
      setIsProcessing(false)
    }
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-black text-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p className="text-gray-400">Please wait while we load your payment details.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="mobile-container py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 text-gray-400 hover:text-white"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Purchase
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
            <Lock className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Secure <span className="text-blue-500">PayPal</span> Payment
          </h1>
          <p className="text-gray-400">
            Complete your purchase securely with PayPal
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-blue-500 flex items-center">
                  {/* PayPal Logo */}
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.646h6.87c2.278 0 3.932.666 4.912 1.98.465.624.765 1.32.893 2.067.138.803.074 1.736-.191 2.77-.994 3.866-3.39 5.106-6.696 5.106h-.958a.77.77 0 0 0-.757.646l-.734 4.664a.641.641 0 0 1-.633.54H7.076v-.51zm6.24-16.263h-6.87a.231.231 0 0 0-.227.194L3.11 22.145a.192.192 0 0 0 .19.222h4.606a.231.231 0 0 0 .227-.193l.733-4.665a.231.231 0 0 1 .227-.193h.958c2.99 0 5.144-1.114 6.045-4.638.233-.914.321-1.7.217-2.352-.097-.606-.327-1.15-.668-1.621-.792-1.094-2.249-1.626-4.33-1.626z"/>
                  </svg>
                  PayPal Checkout
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayPalPayment} className="space-y-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white"
                      required
                    />
                    <p className="text-xs text-gray-400">Your IPTV login details will be sent to this email</p>
                  </div>

                  {/* PayPal Info */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-300">
                        <p className="font-semibold text-blue-400 mb-1">Secure PayPal Payment</p>
                        <p>You&apos;ll be redirected to PayPal to complete your payment securely. Pay with your PayPal balance, bank account, or credit/debit card.</p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isProcessing || !email}
                    className="w-full bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold py-6 text-lg"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Redirecting to PayPal...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.646h6.87c2.278 0 3.932.666 4.912 1.98.465.624.765 1.32.893 2.067.138.803.074 1.736-.191 2.77-.994 3.866-3.39 5.106-6.696 5.106h-.958a.77.77 0 0 0-.757.646l-.734 4.664a.641.641 0 0 1-.633.54H7.076v-.51z"/>
                        </svg>
                        Pay {plan?.price} with PayPal
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-gray-400">
                    By confirming your payment, you agree to our terms of service.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            {plan && (
              <Card className="bg-gray-900 border-gray-700 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-yellow-500">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Plan</span>
                      <span className="text-white font-medium">{plan.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Duration</span>
                      <span className="text-white">{plan.duration}</span>
                    </div>
                    <div className="border-t border-gray-700 pt-3">
                      <div className="flex justify-between">
                        <span className="font-bold text-white">Total</span>
                        <span className="font-bold text-yellow-500 text-xl">{plan.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Included Features */}
                  <div className="border-t border-gray-700 pt-4 space-y-2">
                    <p className="font-semibold text-white mb-3">Included:</p>
                    {[
                      "23,000+ Live Channels",
                      "130,000+ Movies & Series",
                      "4K & 8K Quality",
                      "24/7 Support",
                      "Instant Activation"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Trust Badges */}
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                      <Lock className="w-3 h-3" />
                      <span>Secured by PayPal</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentRedirectPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <PaymentRedirectContent />
    </Suspense>
  )
}
