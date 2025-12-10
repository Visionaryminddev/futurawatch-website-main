"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CreditCard, Lock, Check, Shield } from "lucide-react"
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
    // Get plan data from URL params
    const planData = {
      name: searchParams.get('name') || 'Premium IPTV',
      price: searchParams.get('price') || '€19.99',
      duration: searchParams.get('duration') || '1 Month'
    }
    setPlan(planData)
  }, [searchParams])

  const handleSubmitPayment = async (e: React.FormEvent) => {
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
      // Call our backend to create a Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
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

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { sessionId } = await response.json()

      // Load Stripe and redirect
      const script = document.createElement('script')
      script.src = 'https://js.stripe.com/v3/'
      script.async = true
      script.onload = async () => {
        const stripe = (window as any).Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
        const { error } = await stripe.redirectToCheckout({ sessionId })
        if (error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive"
          })
          setIsProcessing(false)
        }
      }
      document.body.appendChild(script)
    } catch (error) {
      console.error('Payment error:', error)
      toast({
        title: "Payment Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive"
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-full mb-4">
            <Lock className="w-8 h-8 text-yellow-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Secure <span className="text-yellow-500">Payment</span>
          </h1>
          <p className="text-gray-400">
            Complete your purchase with Stripe&apos;s secure checkout
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-500 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPayment} className="space-y-6">
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
                    <p className="text-xs text-gray-400">You'll receive your login details on this email</p>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-300">
                        <p className="font-semibold text-blue-400 mb-1">Secure Stripe Payment</p>
                        <p>You'll be redirected to Stripe's secure checkout. We accept Visa, Mastercard, Apple Pay, Google Pay, and more.</p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isProcessing || !email}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-6 text-lg"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                        Redirecting to Stripe...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        Pay {plan?.price} with Stripe
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-gray-400">
                    By confirming your payment, you agree to our terms of service. No KVK or business registration required.
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
                      <span>Secured by Stripe</span>
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
