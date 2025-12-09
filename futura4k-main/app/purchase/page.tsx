"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, ExternalLink, Clock, Star, Check, Zap, CreditCard, Gift, Users, ArrowLeft } from "lucide-react"
import { useTranslate } from "@/hooks/use-translate"

interface Plan {
  id: string
  name: string
  price: string
  duration: string
  popular?: boolean
  savings?: string
}

function PurchasePageContent() {
  const [plan, setPlan] = useState<Plan | null>(null)
  const t = useTranslate()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get plan data from URL params or localStorage
  useEffect(() => {
    const planId = searchParams.get('plan')
    const planName = searchParams.get('name')
    const planPrice = searchParams.get('price')
    const planDuration = searchParams.get('duration')
    const planSavings = searchParams.get('savings')
    const planPopular = searchParams.get('popular')

    if (planId && planName && planPrice && planDuration) {
      setPlan({
        id: planId,
        name: planName,
        price: planPrice,
        duration: planDuration,
        savings: planSavings || undefined,
        popular: planPopular === 'true'
      })
    } else {
      // Redirect back to subscriptions if no plan data
      router.push('/subscriptions')
    }
  }, [searchParams, router])

  const handlePaymentRedirect = () => {
    if (!plan) return
    
    // Create URL with plan parameters for payment redirect page
    const params = new URLSearchParams({
      name: plan.name,
      price: plan.price,
      duration: plan.duration,
      ...(plan.savings && { savings: plan.savings })
    })
    
    // Navigate to payment redirect page
    router.push(`/payment-redirect?${params.toString()}`)
  }

  const cryptoOptions = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH" },
    { id: "ada", name: "Cardano", symbol: "ADA" },
    { id: "monero", name: "Monero", symbol: "XMR" },
    { id: "solana", name: "Solana", symbol: "SOL" },
  ]

  if (!plan) {
    return (
      <div className="min-h-screen bg-black text-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p className="text-gray-400">Please wait while we load your purchase details.</p>
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
          className="mb-6 text-gray-400 hover:text-white touch-element multilingual-button"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="responsive-button-text">{t('purchase.backToPlans')}</span>
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="responsive-title mb-4">
            <span className="text-yellow-500">{t('purchase.title')}</span>
          </h1>
          <div className="inline-flex items-center space-x-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 text-green-400">
            <Zap className="w-4 h-4" />
            <span className="responsive-text font-semibold">{t('purchase.readyTime')}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mt-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="mobile-card bg-gray-900 border-gray-700 shadow-2xl sticky top-24">
              <CardHeader>
                <CardTitle className="text-yellow-500 responsive-subtitle">{t('purchase.orderSummary')}</CardTitle>
              </CardHeader>
              <CardContent className="mobile-dialog-content space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">{t('purchase.plan')}:</span>
                  <span className="font-semibold text-white">{plan.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">{t('purchase.duration')}:</span>
                  <span className="text-white">{plan.duration}</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center responsive-subtitle font-bold">
                    <span className="text-white">{t('purchase.total')}:</span>
                    <span className="text-yellow-500">{plan.price}</span>
                  </div>
                </div>
                {plan.savings && (
                  <Badge className="w-full justify-center bg-green-500 text-white py-2 responsive-text">
                    <Star className="w-4 h-4 mr-1" />
                    {plan.savings}
                  </Badge>
                )}
                
                {/* Features */}
                <div className="mt-4 space-y-3">
                  <h4 className="font-semibold text-yellow-500 responsive-subtitle">{t('purchase.whatsIncluded')}</h4>
                  <div className="space-y-2 responsive-text text-gray-300">
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span>{t('purchase.features.channels')}</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span>{t('purchase.features.movies')}</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span>{t('purchase.features.quality')}</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span>{t('purchase.features.sports')}</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span>{t('purchase.features.adult')}</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span>{t('purchase.features.devices')}</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span>{t('purchase.features.epg')}</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span>{t('purchase.features.support')}</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span>{t('purchase.features.activation')}</span>
                    </div>
                  </div>
                  
                  {/* Guarantee Badge */}
                  <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="flex items-center text-blue-500">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="font-semibold responsive-text">{t('purchase.guarantee.title')}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {t('purchase.guarantee.description')}
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
                    <span className="responsive-subtitle font-semibold text-white">{t('purchase.fastPayment.title')}</span>
                  </div>
                  <p className="text-gray-300 mb-4 responsive-text">
                    {t('purchase.fastPayment.description')}
                  </p>
                  <Button
                    onClick={handlePaymentRedirect}
                    className="w-full max-w-md mx-auto bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold mobile-button-lg rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 multilingual-button"
                  >
                    <ExternalLink className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span className="responsive-button-text">{t('purchase.startPurchase')}</span>
                  </Button>
                  <p className="text-xs text-gray-400 mt-3">
                    ✓ Multiple Payment Options Available Below
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
                    {t('purchase.cryptoOptions.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-4">
                  <div className="space-y-4 flex-1">
                    <p className="text-gray-300 responsive-text mb-4">
                      {t('purchase.cryptoOptions.description')}
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
                            className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-black px-3 py-1 text-xs touch-element multilingual-button"
                          >
                            <span className="responsive-button-text">{t('purchase.cryptoOptions.payNow')}</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <p className="text-xs text-yellow-400 font-medium">
                        {t('purchase.cryptoOptions.note')}
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
                    {t('purchase.paypal.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-4">
                  <div className="space-y-4 flex-1">
                    <p className="text-gray-300 responsive-text mb-4">
                      {t('purchase.paypal.description')}
                    </p>
                    <div className="bg-gray-700 rounded-lg p-4 text-center">
                      <div className="mb-4">
                        <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-white font-semibold responsive-text">Friends & Family</p>
                        <p className="text-gray-400 text-xs">Personal Payment Only</p>
                      </div>
                      <Button
                        onClick={handlePaymentRedirect}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium mobile-button touch-element multilingual-button"
                      >
                        <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="responsive-button-text">{t('purchase.paypal.payNow')}</span>
                      </Button>
                    </div>
                    <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                      <p className="text-xs text-orange-400 font-medium">
                        {t('purchase.paypal.note')}
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
                    {t('purchase.giftCards.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-4">
                  <div className="space-y-4 flex-1">
                    <p className="text-gray-300 responsive-text mb-4">
                      {t('purchase.giftCards.description')}
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
                            className="border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black px-3 py-1 text-xs touch-element multilingual-button"
                          >
                            <span className="responsive-button-text">{t('purchase.giftCards.useNow')}</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <p className="text-xs text-green-400 font-medium">
                        {t('purchase.giftCards.note')}
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
                    {t('purchase.cards.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-4">
                  <div className="space-y-4 flex-1">
                    <p className="text-gray-300 responsive-text mb-4">
                      {t('purchase.cards.description')}
                    </p>
                    <div className="bg-gray-700 rounded-lg p-4 text-center">
                      <div className="mb-4">
                        <CreditCard className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                        <p className="text-white font-semibold responsive-text">Visa & Mastercard</p>
                        <p className="text-gray-400 text-xs">Instant Processing</p>
                      </div>
                      <Button
                        onClick={handlePaymentRedirect}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium mobile-button touch-element multilingual-button"
                      >
                        <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="responsive-button-text">{t('purchase.cards.payNow')}</span>
                      </Button>
                    </div>
                    <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <p className="text-xs text-purple-400 font-medium">
                        {t('purchase.cards.note')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 responsive-text">
          <p>{t('purchase.footer')}</p>
        </div>
      </div>
    </div>
  )
}

export default function PurchasePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <PurchasePageContent />
    </Suspense>
  )
}
