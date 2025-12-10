"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardholderName, setCardholderName] = useState("")
  const [email, setEmail] = useState("")
  const [paypalEmail, setPaypalEmail] = useState("")
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

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4)
    }
    return v
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    if (formatted.length <= 19) {
      setCardNumber(formatted)
    }
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value)
    if (formatted.length <= 5) {
      setExpiryDate(formatted)
    }
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/gi, '')
    if (value.length <= 4) {
      setCvv(value)
    }
  }

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (paymentMethod === "card") {
      if (!cardNumber || !expiryDate || !cvv || !cardholderName || !email) {
        toast({
          title: "Missing Information",
          description: "Please fill in all payment details",
          variant: "destructive"
        })
        return
      }
    } else if (paymentMethod === "paypal") {
      if (!paypalEmail) {
        toast({
          title: "Missing Information",
          description: "Please enter your PayPal email",
          variant: "destructive"
        })
        return
      }
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Payment Successful!",
        description: "Redirecting to confirmation page..."
      })
      
      // Redirect to success page
      setTimeout(() => {
        router.push('/purchase-success')
      }, 1500)
    }, 2500)
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
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="card">Credit Card</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                  </TabsList>

                  {/* Credit Card Tab */}
                  <TabsContent value="card">
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
                        <p className="text-xs text-gray-400">Receipt will be sent to this email</p>
                      </div>

                      {/* Card Information */}
                      <div className="space-y-4">
                        <Label>Card Information</Label>
                        
                        {/* Card Number */}
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            className="bg-gray-800 border-gray-600 text-white pr-12"
                            required
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                            <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-400 rounded"></div>
                          </div>
                        </div>

                        {/* Expiry and CVV */}
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            type="text"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={handleExpiryChange}
                            className="bg-gray-800 border-gray-600 text-white"
                            required
                          />
                          <Input
                            type="text"
                            placeholder="CVV"
                            value={cvv}
                            onChange={handleCvvChange}
                            className="bg-gray-800 border-gray-600 text-white"
                            required
                          />
                        </div>
                      </div>

                      {/* Cardholder Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name">Cardholder Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          value={cardholderName}
                          onChange={(e) => setCardholderName(e.target.value)}
                          className="bg-gray-800 border-gray-600 text-white"
                          required
                        />
                      </div>

                      {/* Security Notice */}
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-gray-300">
                            <p className="font-semibold text-blue-400 mb-1">Secure Payment</p>
                            <p>Your payment information is encrypted and secure. We use industry-standard SSL encryption.</p>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-6 text-lg"
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                            Processing Payment...
                          </>
                        ) : (
                          <>
                            <Lock className="w-5 h-5 mr-2" />
                            Pay {plan?.price}
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-gray-400">
                        By confirming your payment, you agree to our terms of service
                      </p>
                    </form>
                  </TabsContent>

                  {/* PayPal Tab */}
                  <TabsContent value="paypal">
                    <form onSubmit={handleSubmitPayment} className="space-y-6">
                      {/* PayPal Email */}
                      <div className="space-y-2">
                        <Label htmlFor="paypal-email">PayPal Email Address</Label>
                        <Input
                          id="paypal-email"
                          type="email"
                          placeholder="your@paypal.com"
                          value={paypalEmail}
                          onChange={(e) => setPaypalEmail(e.target.value)}
                          className="bg-gray-800 border-gray-600 text-white"
                          required
                        />
                        <p className="text-xs text-gray-400">You will be redirected to PayPal to complete your payment</p>
                      </div>

                      {/* PayPal Info */}
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-gray-300">
                            <p className="font-semibold text-blue-400 mb-1">Secure PayPal Payment</p>
                            <p>You will be securely redirected to PayPal to authorize the payment of {plan?.price}.</p>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-6 text-lg"
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                            Processing Payment...
                          </>
                        ) : (
                          <>
                            <Lock className="w-5 h-5 mr-2" />
                            Continue to PayPal
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-gray-400">
                        By confirming your payment, you agree to our terms of service
                      </p>
                    </form>
                  </TabsContent>
                </Tabs>
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
