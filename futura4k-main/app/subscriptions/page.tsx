"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Clock, CreditCard, Bitcoin } from "lucide-react"
import { useTranslate } from "@/hooks/use-translate"

interface Plan {
  id: string
  name: string
  price: string
  duration: string
  popular: boolean
  savings?: string
  features: string[]
}

export default function SubscriptionsPage() {
  const t = useTranslate()
  const router = useRouter()

  const plans: Plan[] = [
    {
      id: "24h",
      name: t("subscriptions.plans.trial.name"),
      price: "€2.99",
      duration: "24 Hours",
      popular: false,
      features: [
        t("subscriptions.features.channels"),
        t("subscriptions.features.movies"),
        t("subscriptions.features.quality"),
        t("subscriptions.features.devices"),
        t("subscriptions.features.support"),
        t("subscriptions.features.sports"),
        t("subscriptions.features.adult"),
        t("subscriptions.features.epg"),
        t("subscriptions.features.catchup"),
      ],
    },
    {
      id: "1m",
      name: t("subscriptions.plans.month1.name"),
      price: "€19.99",
      duration: t("subscriptions.plans.month1.duration"),
      popular: false,
      features: [
        t("subscriptions.features.channels"),
        t("subscriptions.features.movies"),
        t("subscriptions.features.quality"),
        t("subscriptions.features.devices"),
        t("subscriptions.features.support"),
        t("subscriptions.features.sports"),
        t("subscriptions.features.adult"),
        t("subscriptions.features.epg"),
        t("subscriptions.features.catchup"),
      ],
    },
    {
      id: "3m",
      name: t("subscriptions.plans.month3.name"),
      price: "€39.99",
      duration: t("subscriptions.plans.month3.duration"),
      popular: false,
      savings: "Save €19.98", // 3 × €19.99 = €59.97, €59.97 - €39.99 = €19.98
      features: [
        t("subscriptions.features.channels"),
        t("subscriptions.features.movies"),
        t("subscriptions.features.quality"),
        t("subscriptions.features.devices"),
        t("subscriptions.features.support"),
        t("subscriptions.features.sports"),
        t("subscriptions.features.adult"),
        t("subscriptions.features.epg"),
        t("subscriptions.features.catchup"),
      ],
    },
    {
      id: "6m",
      name: t("subscriptions.plans.month6.name"),
      price: "€49.99",
      duration: t("subscriptions.plans.month6.duration"),
      popular: false,
      savings: "Save €69.95", // 6 × €19.99 = €119.94, €119.94 - €49.99 = €69.95
      features: [
        t("subscriptions.features.channels"),
        t("subscriptions.features.movies"),
        t("subscriptions.features.quality"),
        t("subscriptions.features.devices"),
        t("subscriptions.features.support"),
        t("subscriptions.features.sports"),
        t("subscriptions.features.adult"),
        t("subscriptions.features.epg"),
        t("subscriptions.features.catchup"),
      ],
    },
    {
      id: "12m",
      name: t("subscriptions.plans.month12.name"),
      price: "€79.95",
      duration: t("subscriptions.plans.month12.duration"),
      popular: true,
      savings: "Save €159.93", // 12 × €19.99 = €239.88, €239.88 - €79.95 = €159.93
      features: [
        t("subscriptions.features.channels"),
        t("subscriptions.features.movies"),
        t("subscriptions.features.quality"),
        t("subscriptions.features.devices"),
        t("subscriptions.features.support"),
        t("subscriptions.features.sports"),
        t("subscriptions.features.adult"),
        t("subscriptions.features.epg"),
        t("subscriptions.features.catchup"),
      ],
    },
  ]

  const handleSelectPlan = (plan: Plan) => {
    // Create URL with plan parameters
    const params = new URLSearchParams({
      plan: plan.id,
      name: plan.name,
      price: plan.price,
      duration: plan.duration,
      popular: plan.popular.toString(),
      ...(plan.savings && { savings: plan.savings })
    })
    
    // Navigate to purchase page
    router.push(`/purchase?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="mobile-container py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">
            {t("subscriptions.title")} <span className="text-yellow-500">{t("subscriptions.titleHighlight")}</span>
          </h1>
          <p className="responsive-subtitle text-gray-400 max-w-3xl mx-auto">{t("subscriptions.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-8 sm:mb-12 overflow-visible pt-4">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative bg-gray-900 border-gray-800 hover:border-yellow-500/50 transition-all duration-300 touch-element rounded-lg shadow-lg hover:shadow-xl overflow-visible ${
                plan.popular ? "ring-2 ring-yellow-500 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-2 bg-yellow-500 text-black z-50 px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold shadow-lg">
                  <Star className="w-3 h-3 mr-1" />
                  {t("subscriptions.mostPopular")}
                </Badge>
              )}
              {plan.savings && (
                <Badge className={`absolute -top-3 bg-green-500 text-white z-50 px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold shadow-lg ${
                  plan.popular ? "right-2" : "left-1/2 transform -translate-x-1/2"
                }`}>
                  {plan.savings}
                </Badge>
              )}

              <CardHeader className="text-center pb-3 sm:pb-4 p-3 sm:p-6">
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-500">{plan.name}</CardTitle>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{plan.price}</div>
                <div className="text-gray-400 flex items-center justify-center text-sm sm:text-base">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  {plan.duration}
                </div>
              </CardHeader>

              <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-xs sm:text-sm">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="mobile-button w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition-all duration-300 hover:scale-105 active:scale-95 multilingual-button"
                  onClick={() => handleSelectPlan(plan)}
                >
                  <span className="responsive-button-text">{t("subscriptions.selectPlan")}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Methods Info (gift cards removed; Stripe primary) */}
        <div className="mobile-card bg-gray-900 rounded-lg p-4 sm:p-6 md:p-8 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-yellow-500 mb-4 sm:mb-6 text-center">{t("subscriptions.paymentMethods")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="text-center">
              <Bitcoin className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-500 mx-auto mb-2 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{t("subscriptions.payment.crypto")}</h3>
              <p className="text-gray-400 text-xs sm:text-sm">{t("subscriptions.payment.cryptoOptions")}</p>
            </div>
            <div className="text-center">
              <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-500 mx-auto mb-2 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Stripe</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Visa, Mastercard, Apple Pay via secure Stripe checkout.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mobile-card bg-gray-900 rounded-lg p-4 sm:p-6 md:p-8 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-yellow-500 mb-4 sm:mb-6 text-center">{t("subscriptions.faq.title")}</h2>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{t("subscriptions.faq.access.question")}</h3>
              <p className="text-gray-400 text-sm sm:text-base">{t("subscriptions.faq.access.answer")}</p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{t("subscriptions.faq.devices.question")}</h3>
              <p className="text-gray-400 text-sm sm:text-base">{t("subscriptions.faq.devices.answer")}</p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{t("subscriptions.faq.refund.question")}</h3>
              <p className="text-gray-400 text-sm sm:text-base">{t("subscriptions.faq.refund.answer")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
