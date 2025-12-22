"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, ExternalLink, Clock, Star, Check, Zap, ArrowLeft } from "lucide-react"
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

  const getNowPaymentsUrlForPlan = (planId: string) => {
    switch (planId) {
      case "24h":
        return "https://nowpayments.io/payment/?iid=5470694954&source=button"
      case "1m":
        return "https://nowpayments.io/embeds/payment-widget?iid=5953966863"
      case "3m":
        return "https://nowpayments.io/embeds/payment-widget?iid=6109625289"
      case "6m":
        return "https://nowpayments.io/embeds/payment-widget?iid=5044250070"
      case "12m":
        return "https://nowpayments.io/embeds/payment-widget?iid=4604760926"
      default:
        return null
    }
  }

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

  const handleCryptoPayment = () => {
    if (!plan) return
    const url = getNowPaymentsUrlForPlan(plan.id)
    if (!url) return
    window.open(url, "_blank", "noopener,noreferrer")
  }

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

                  {/* Trustpilot Mini Widget */}
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-xs text-gray-400 mb-2 text-center">Trusted by thousands</p>
                    <div
                      className="trustpilot-widget"
                      data-locale="en-US"
                      data-template-id="54d39695764ea9070450d9dc"
                      data-businessunit-id={process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_ID || "65b211111111111111111111"}
                      data-style-height="24px"
                      data-style-width="100%"
                      data-theme="dark"
                      data-stars="4,5"
                    >
                      <a href="https://www.trustpilot.com/review/futurawatch.com" target="_blank" rel="noopener">Trustpilot</a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods: Crypto (NOWPayments) + PayPal Checkout */}
          <div className="lg:col-span-3">
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
                    <Button
                      onClick={handleCryptoPayment}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold mobile-button touch-element multilingual-button"
                    >
                      <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="responsive-button-text">{t('purchase.cryptoOptions.payNow')}</span>
                    </Button>
                    <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <p className="text-xs text-yellow-400 font-medium">
                        {t('purchase.cryptoOptions.note')}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Crypto payments are securely processed via NOWPayments (BTC, ETH, XRP, USDT and more).
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* PayPal Checkout */}
              <Card className="mobile-card bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 min-h-[400px] flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle className="text-blue-500 flex items-center responsive-subtitle">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/>
                    </svg>
                    PayPal Checkout
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-4">
                  <div className="space-y-4 flex-1">
                    <p className="text-gray-300 responsive-text mb-4">
                      Secure payments via PayPal. Pay with your PayPal balance, bank account, or credit/debit card.
                    </p>
                    <div className="bg-gray-700 rounded-lg p-4 text-center">
                      <div className="mb-4">
                        <p className="text-white font-semibold responsive-text">PayPal Secure Checkout</p>
                        <p className="text-gray-400 text-xs">Buyer protection included</p>
                      </div>
                      <Button
                        onClick={handlePaymentRedirect}
                        className="w-full bg-[#0070BA] hover:bg-[#005ea6] text-white font-medium mobile-button touch-element multilingual-button"
                      >
                        <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="responsive-button-text">Pay with PayPal</span>
                      </Button>
                    </div>
                    <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <p className="text-xs text-blue-400 font-medium">
                        Payments are processed securely via PayPal. Fast and easy checkout.
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

        {/* Payment Method Logos */}
        <div className="mt-12 pb-8">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-center text-gray-400 text-sm mb-6">Accepted Payment Methods</h3>
              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
                {/* Crypto (NOWPayments) */}
                <div className="flex flex-col items-center group">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Bitcoin className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <span className="text-xs text-gray-400 mt-2">Crypto (NOWPayments)</span>
                </div>

                {/* PayPal */}
                <div className="flex flex-col items-center group">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.76-4.852a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.746-4.46z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-gray-400 mt-2">PayPal</span>
                </div>
              </div>
            </CardContent>
          </Card>
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
