"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, ExternalLink, Clock, Star, Check, Zap, CreditCard, Gift, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTranslate } from "@/hooks/use-translate"

interface Plan {
  id: string
  name: string
  price: string
  duration: string
  popular?: boolean
  savings?: string
}

interface PaymentModalProps {
  plan: Plan
  onClose: () => void
}

export function PaymentModal({ plan, onClose }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const t = useTranslate()

  const handlePaymentRedirect = () => {
    setIsProcessing(true)
    // Open Signal payment link in new tab
    window.open("https://signal.me/#eu/Td0r6W11XPRx9fPR-VNGX5HtY6UoUyvo779QXjGe85xm6M8wQ3dKa41lh2ep5HDQ", "_blank")
    
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Redirecting to Secure Platform",
        description: "You will be redirected to our secure platform to complete your purchase.",
      })
      onClose()
    }, 1500)
  }

  const cryptoOptions = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH" },
    { id: "ada", name: "Cardano", symbol: "ADA" },
    { id: "monero", name: "Monero", symbol: "XMR" },
    { id: "solana", name: "Solana", symbol: "SOL" },
  ]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="mobile-modal bg-gray-900 border-gray-800 text-white overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="responsive-title text-center">
            <span className="text-yellow-500">Complete Your Purchase</span>
          </DialogTitle>
          <div className="text-center mt-4">
            <div className="inline-flex items-center space-x-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 text-green-400">
              <Zap className="w-4 h-4" />
              <span className="responsive-text font-semibold">Ready in 2 minutes - Start enjoying your movies instantly!</span>
            </div>
          </div>
        </DialogHeader>

        <div className="grid lg:grid-cols-4 gap-6 mt-8 px-2 sm:px-6">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="mobile-card bg-black border-gray-700 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-yellow-500 responsive-subtitle">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="mobile-dialog-content space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Plan:</span>
                  <span className="font-semibold text-white">{plan.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Duration:</span>
                  <span className="text-white">{plan.duration}</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-white">Total:</span>
                    <span className="text-yellow-500">{plan.price}</span>
                  </div>
                </div>
                {plan.savings && (
                  <Badge className="w-full justify-center bg-green-500 text-white py-2 text-sm">
                    <Star className="w-4 h-4 mr-1" />
                    {plan.savings}
                  </Badge>
                )}
                
                {/* Features */}
                <div className="mt-6 space-y-4">
                  <h4 className="font-semibold text-yellow-500 text-lg">What&apos;s Included:</h4>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-3" />
                      <span>23,000+ Live Channels</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-3" />
                      <span>130,000+ Movies & Series</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-3" />
                      <span>Ultra HD 4K & 8K Quality</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-3" />
                      <span>Premium Sports Channels</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-3" />
                      <span>Adult Content Available</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-3" />
                      <span>EPG Guide Included</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-3" />
                      <span>24/7 Customer Support</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-3" />
                      <span>Instant Activation</span>
                    </div>
                  </div>
                  
                  {/* Guarantee Badge */}
                  <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="flex items-center text-blue-500">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="font-semibold">5-10 Minute Activation</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Login details sent to your email immediately after payment
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods */}
          <div className="lg:col-span-3">
            {/* Quick Payment Button */}
            <div className="mb-8">
              <Card className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 shadow-2xl">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="responsive-subtitle font-semibold text-white">Fast & Secure Payment</span>
                  </div>
                  <p className="text-gray-300 mb-4 responsive-text">
                    Complete your purchase in just 2 minutes and start enjoying unlimited entertainment immediately!
                  </p>
                  <Button
                    onClick={handlePaymentRedirect}
                    disabled={isProcessing}
                    className="w-full max-w-md mx-auto bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold mobile-button-lg rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    {isProcessing ? "Processing..." : "Save & Complete Payment"}
                  </Button>
                  <p className="text-xs text-gray-400 mt-3">
                    ✓ Multiple Payment Options Available
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Payment Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {/* Crypto Payments */}
              <Card className="mobile-card bg-gray-800 border-gray-700 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20 min-h-[400px] flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle className="text-yellow-500 flex items-center responsive-subtitle">
                    <Bitcoin className="w-6 h-6 mr-2" />
                    Cryptocurrency
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-4">
                  <div className="space-y-4 flex-1">
                    <p className="text-gray-300 responsive-text mb-4">
                      Fast, secure, and anonymous crypto payments
                    </p>
                    <div className="space-y-2">
                      {cryptoOptions.slice(0, 3).map((crypto) => (
                        <div key={crypto.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                          <div className="flex items-center">
                            <Bitcoin className="w-4 h-4 mr-3 text-yellow-500 flex-shrink-0" />
                            <div>
                              <span className="text-white responsive-text font-medium">{crypto.name}</span>
                              <div className="text-xs text-gray-400">{crypto.symbol}</div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handlePaymentRedirect}
                            className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-black px-3 py-1 text-xs"
                          >
                            Pay Now
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <p className="text-xs text-yellow-400 font-medium">
                        ⚡ Instant payment verification
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* PayPal Friends & Family */}
              <Card className="mobile-card bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 min-h-[400px] flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle className="text-blue-500 flex items-center responsive-subtitle">
                    <Users className="w-6 h-6 mr-2" />
                    PayPal F&F
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-4">
                  <div className="space-y-4 flex-1">
                    <p className="text-gray-300 responsive-text mb-4">
                      PayPal Friends & Family payments only
                    </p>
                    <div className="bg-gray-700 rounded-lg p-4 text-center">
                      <div className="mb-4">
                        <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-white font-semibold responsive-text">Friends & Family</p>
                        <p className="text-gray-400 text-xs">Personal Payment Only</p>
                      </div>
                      <Button
                        onClick={handlePaymentRedirect}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium mobile-button"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Pay with PayPal
                      </Button>
                    </div>
                    <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                      <p className="text-xs text-orange-400 font-medium">
                        ⚠️ F&F payments only
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gift Cards */}
              <Card className="mobile-card bg-gray-800 border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 min-h-[400px] flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle className="text-green-500 flex items-center responsive-subtitle">
                    <Gift className="w-6 h-6 mr-2" />
                    Gift Cards
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-4">
                  <div className="space-y-4 flex-1">
                    <p className="text-gray-300 responsive-text mb-4">
                      Purchase with various gift cards
                    </p>
                    <div className="space-y-2">
                      {["Amazon", "Google Play", "Apple", "Steam"].map((card) => (
                        <div key={card} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                          <div className="flex items-center">
                            <Gift className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" />
                            <span className="text-white responsive-text font-medium">{card}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handlePaymentRedirect}
                            className="border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black px-3 py-1 text-xs"
                          >
                            Use Now
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <p className="text-xs text-green-400 font-medium">
                        ✓ All major cards accepted
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Credit Card */}
              <Card className="mobile-card bg-gray-800 border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 min-h-[400px] flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle className="text-purple-500 flex items-center responsive-subtitle">
                    <CreditCard className="w-6 h-6 mr-2" />
                    Credit Card
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-4">
                  <div className="space-y-4 flex-1">
                    <p className="text-gray-300 responsive-text mb-4">
                      Secure credit card payments
                    </p>
                    <div className="bg-gray-700 rounded-lg p-4 text-center">
                      <div className="mb-4">
                        <CreditCard className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                        <p className="text-white font-semibold responsive-text">Visa & Mastercard</p>
                        <p className="text-gray-400 text-xs">Instant Processing</p>
                      </div>
                      <Button
                        onClick={handlePaymentRedirect}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium mobile-button"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Pay Now
                      </Button>
                    </div>
                    <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <p className="text-xs text-purple-400 font-medium">
                        ✓ Secure SSL encryption
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-400 responsive-text">
          <p>🔒 Your payment is secure and encrypted. Multiple payment options available. Support available 24/7.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
