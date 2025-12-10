"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, ArrowLeft, MessageCircle, Clock, Shield, Users, Check, Copy } from "lucide-react"
import { useTranslate } from "@/hooks/use-translate"

type Plan = {
  name: string
  price: string
  duration: string
}

function PaymentRedirectContent() {
  const [plan, setPlan] = useState<Plan | null>(null)
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslate()

  const signalLink = "https://signal.me/#eu/Td0r6W11XPRx9fPR-VNGX5HtY6UoUyvo779QXjGe85xm6M8wQ3dKa41lh2ep5HDQ"

  useEffect(() => {
    // Get plan data from URL params
    const planData = {
      name: searchParams.get('name') || 'Premium IPTV',
      price: searchParams.get('price') || '€19.99',
      duration: searchParams.get('duration') || '1 Month'
    }
    setPlan(planData)
  }, [searchParams])

  const handleOpenSignal = () => {
    window.open(signalLink, "_blank")
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(signalLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
          <span className="responsive-button-text">{t('paymentRedirect.backToPurchase')}</span>
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="responsive-title mb-4">
            <span className="text-yellow-500">{t('paymentRedirect.title')}</span>
          </h1>
          <p className="responsive-subtitle text-gray-400 mb-6">
            {t('paymentRedirect.subtitle')}
          </p>
          <div className="inline-flex items-center space-x-2 bg-green-500/20 border border-green-500/30 rounded-full px-6 py-3 text-green-400">
            <Clock className="w-5 h-5" />
            <span className="responsive-text font-semibold">{t('paymentRedirect.readyTime')}</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Order Summary */}
          {plan && (
            <Card className="mobile-card bg-gray-900 border-gray-700 mb-6">
              <CardHeader>
                <CardTitle className="text-yellow-500">{t('paymentRedirect.orderSummary')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">{t('payment.plan')}:</span>
                    <span className="text-white font-semibold">{plan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">{t('payment.duration')}:</span>
                    <span className="text-white">{plan.duration}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-2 mt-4">
                    <div className="flex justify-between">
                      <span className="text-white font-bold">{t('payment.total')}:</span>
                      <span className="text-yellow-500 font-bold text-lg">{plan.price}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 4 Easy Steps Section */}
          <Card className="mobile-card bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30 mb-6">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-yellow-500 mb-2">{t('paymentRedirect.stepsTitle')}</CardTitle>
              <p className="text-gray-300">{t('paymentRedirect.stepsSubtitle')}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Step 1 */}
                <div className="flex items-start space-x-4 p-4 bg-black/30 rounded-lg border border-yellow-500/20">
                  <div className="bg-yellow-500 text-black rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-2">{t('paymentRedirect.step1.title')}</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      {t('paymentRedirect.step1.description')}
                    </p>
                    <div className="flex items-center text-xs text-yellow-400">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{t('paymentRedirect.step1.time')}</span>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-4 p-4 bg-black/30 rounded-lg border border-blue-500/20">
                  <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-2">{t('paymentRedirect.step2.title')}</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      {t('paymentRedirect.step2.description')}
                    </p>
                    <div className="flex items-center text-xs text-blue-400">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      <span>{t('paymentRedirect.step2.time')}</span>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-4 p-4 bg-black/30 rounded-lg border border-green-500/20">
                  <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-2">{t('paymentRedirect.step3.title')}</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      {t('paymentRedirect.step3.description')}
                    </p>
                    <div className="flex items-center text-xs text-green-400">
                      <Shield className="w-4 h-4 mr-1" />
                      <span>{t('paymentRedirect.step3.time')}</span>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start space-x-4 p-4 bg-black/30 rounded-lg border border-purple-500/20">
                  <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-2">{t('paymentRedirect.step4.title')}</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      {t('paymentRedirect.step4.description')}
                    </p>
                    <div className="flex items-center text-xs text-purple-400">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      <span>{t('paymentRedirect.step4.time')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Timeline */}
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-4 mt-6">
                <h4 className="font-bold text-green-400 mb-3 text-center">{t('paymentRedirect.timeline.title')}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-300">{t('paymentRedirect.timeline.step1')}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-300">{t('paymentRedirect.timeline.step2')}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-gray-300">{t('paymentRedirect.timeline.step3')}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Start Your Purchase Button */}
          <Card className="mobile-card bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30">
            <CardHeader className="text-center">
              <MessageCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <CardTitle className="text-2xl text-blue-400">{t('paymentRedirect.platform.title')}</CardTitle>
              <p className="text-gray-300">
                {t('paymentRedirect.platform.subtitle')}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Signal Link */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-white mb-3 text-center">{t('paymentRedirect.platform.linkTitle')}</h4>
                <div className="bg-black/50 p-3 rounded border border-gray-500 mb-4">
                  <code className="text-blue-400 text-sm break-all">{signalLink}</code>
                </div>
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={handleOpenSignal}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-4 py-3 text-sm sm:text-base leading-tight whitespace-normal h-auto min-h-[3.5rem] flex items-center justify-center multilingual-button"
                  >
                    <ExternalLink className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span className="text-center break-words responsive-button-text">{t('paymentRedirect.platform.openButton')}</span>
                  </Button>
                  <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    className="w-full border-gray-500 text-gray-300 hover:bg-gray-700 px-4 py-3 text-sm leading-tight whitespace-normal h-auto min-h-[3rem] flex items-center justify-center multilingual-button"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="break-words responsive-button-text">{t('paymentRedirect.platform.copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="break-words responsive-button-text">{t('paymentRedirect.platform.copyButton')}</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* What to Say */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3 text-center">{t('paymentRedirect.message.title')}</h4>
                <div className="bg-black/30 p-4 rounded-lg border border-yellow-500/20">
                  <p className="text-white font-medium text-center">
                    {t('paymentRedirect.message.template', {
                      planName: plan?.name || 'Premium IPTV',
                      planPrice: plan?.price || '€19.99'
                    })}
                  </p>
                </div>
                <p className="text-sm text-gray-300 text-center mt-3">
                  {t('paymentRedirect.message.instruction')}
                </p>
              </div>

              {/* Security & Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-black/30 rounded-lg border border-green-500/20">
                  <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white">{t('paymentRedirect.security.secure')}</h3>
                  <p className="text-xs text-gray-400">{t('paymentRedirect.security.secureDesc')}</p>
                </div>
                <div className="p-4 bg-black/30 rounded-lg border border-blue-500/20">
                  <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white">{t('paymentRedirect.security.fast')}</h3>
                  <p className="text-xs text-gray-400">{t('paymentRedirect.security.fastDesc')}</p>
                </div>
                <div className="p-4 bg-black/30 rounded-lg border border-purple-500/20">
                  <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white">{t('paymentRedirect.security.support')}</h3>
                  <p className="text-xs text-gray-400">{t('paymentRedirect.security.supportDesc')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Money Back Guarantee */}
          <Card className="mobile-card bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-green-500 mb-2">{t('paymentRedirect.guarantee.title')}</h3>
                <p className="text-gray-300">
                  {t('paymentRedirect.guarantee.description')}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-gray-300">{t('paymentRedirect.guarantee.feature1')}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-gray-300">{t('paymentRedirect.guarantee.feature2')}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-gray-300">{t('paymentRedirect.guarantee.feature3')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 responsive-text">
          <p className="mb-2">{t('paymentRedirect.footer.security')}</p>
          <p>{t('paymentRedirect.footer.help')}</p>
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
