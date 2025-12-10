"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, Gift, CreditCard, ExternalLink, Clock, Star, Check, Copy, Zap } from "lucide-react"
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
  const [paymentMethod, setPaymentMethod] = useState("website")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const t = useTranslate()

  const handlePaymentWebsite = () => {
    setIsProcessing(true)
    // Open payment website in new tab
    window.open("https://payments.futurawatch.com", "_blank")
    
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Redirecting to Payment Portal",
        description: "You will be redirected to our secure payment portal to complete your purchase.",
      })
      onClose()
    }, 1500)
  }

  const cryptoOptions = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8c" },
    { id: "ada", name: "Cardano", symbol: "ADA", address: "addr1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wqvs63838e" },
    { id: "monero", name: "Monero", symbol: "XMR", address: "4AdUndXHHZ6cfufTMvppY6JwXNouMBzSkbLYfpAV5Usx3skHy7S" },
    { id: "solana", name: "Solana", symbol: "SOL", address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Address copied to clipboard",
    })
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] lg:max-w-7xl bg-gray-900 border-gray-800 text-white max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center">
            <span className="text-yellow-500">Complete Your Purchase</span>
          </DialogTitle>
          <div className="text-center mt-4">
            <div className="inline-flex items-center space-x-2 bg-green-500/20 border border-green-500/30 rounded-full px-6 py-3 text-green-400">
              <Zap className="w-5 h-5" />
              <span className="text-lg font-semibold">Ready in 2 minutes - Start enjoying your movies instantly!</span>
            </div>
          </div>
        </DialogHeader>

        <div className="grid lg:grid-cols-3 gap-8 mt-6">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-black border-gray-700 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-yellow-500 text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold text-yellow-500">What&apos;s Included:</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>23,000+ Live Channels</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>130,000+ Movies & Series</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>Ultra HD 4K & 8K Quality</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>24/7 Support</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>Instant Activation</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods */}
          <div className="lg:col-span-2">
            {/* Quick Payment Button */}
            <div className="mb-8">
              <Card className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 shadow-2xl">
                <CardContent className="p-8 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-yellow-500 mr-2" />
                    <span className="text-xl font-semibold text-white">Fast & Secure Payment</span>
                  </div>
                  <p className="text-gray-300 mb-6 text-lg">
                    Complete your purchase in just 2 minutes and start enjoying unlimited entertainment immediately!
                  </p>
                  <Button
                    onClick={handlePaymentWebsite}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-4 px-8 text-lg rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
                  >
                    <ExternalLink className="w-6 h-6 mr-3" />
                    {isProcessing ? "Processing..." : "Complete Payment Securely"}
                  </Button>
                  <p className="text-sm text-gray-400 mt-4">
                    ✓ Supports Bitcoin, Crypto, Gift Cards & PayPal
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Payment Methods Details */}
            <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
              <TabsList className="grid w-full grid-cols-4 bg-gray-800 p-1">
                <TabsTrigger
                  value="website"
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black font-semibold"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Secure Portal
                </TabsTrigger>
                <TabsTrigger
                  value="crypto"
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
                >
                  <Bitcoin className="w-4 h-4 mr-2" />
                  Crypto
                </TabsTrigger>
                <TabsTrigger
                  value="giftcard"
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Gift Cards
                </TabsTrigger>
                <TabsTrigger
                  value="paypal"
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  PayPal
                </TabsTrigger>
              </TabsList>

              <TabsContent value="website" className="mt-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-yellow-500 flex items-center">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Secure Payment Portal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-300">
                        Our secure payment portal supports all major payment methods including Bitcoin, Ethereum, Gift Cards, and PayPal.
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center text-green-400">
                          <Check className="w-4 h-4 mr-2" />
                          SSL Encrypted
                        </div>
                        <div className="flex items-center text-green-400">
                          <Check className="w-4 h-4 mr-2" />
                          Instant Processing
                        </div>
                        <div className="flex items-center text-green-400">
                          <Check className="w-4 h-4 mr-2" />
                          Multiple Payment Options
                        </div>
                        <div className="flex items-center text-green-400">
                          <Check className="w-4 h-4 mr-2" />
                          24/7 Support
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="crypto" className="mt-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-yellow-500">Cryptocurrency Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-300">
                        We accept the following cryptocurrencies. Click the payment portal button above to get the exact payment address.
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        {cryptoOptions.map((crypto) => (
                          <div key={crypto.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                            <div className="flex items-center">
                              <Bitcoin className="w-5 h-5 mr-3 text-yellow-500" />
                              <div>
                                <span className="font-semibold text-white">{crypto.name}</span>
                                <span className="text-gray-400 ml-2">({crypto.symbol})</span>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(crypto.address)}
                              className="border-gray-600 text-gray-300 hover:bg-gray-600"
                            >
                              <Copy className="w-4 h-4 mr-1" />
                              Copy Address
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="giftcard" className="mt-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-yellow-500">Gift Card Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-300">
                        We accept gift cards from major retailers. Use our secure payment portal above to submit your gift card details.
                      </p>
                      <div className="text-sm text-gray-400">
                        <p><strong>Accepted:</strong> Amazon, iTunes, Google Play, Steam, and more</p>
                        <p><strong>Processing:</strong> 5-10 minutes after verification</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="paypal" className="mt-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-yellow-500">PayPal Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-300">
                        Send payment via PayPal using our secure payment portal above.
                      </p>
                      <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-400 mb-2">Important:</h4>
                        <p className="text-sm text-gray-300">
                          Please send as &quot;Friends &amp; Family&quot; to avoid fees and ensure proper processing.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>🔒 Your payment is secure and encrypted. Support available 24/7.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
