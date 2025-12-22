"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, CheckCircle, Star, CreditCard, Bitcoin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTranslate } from "@/hooks/use-translate"
import { useRouter } from "next/navigation"

export default function NewResellerPage() {
  const [formData, setFormData] = useState({
    email: "",
    package: "",
    paymentMethod: "",
  })

  const { toast } = useToast()
  const t = useTranslate()
  const router = useRouter()

  const getPaymentUrl = (packagePoints: string, paymentMethod: string) => {
    const packageLinks: Record<string, Record<string, string>> = {
      "10-550": {
        paypal: "", // Uses existing PayPal checkout flow
        crypto: "https://nowpayments.io/embeds/payment-widget?iid=4569373688",
      },
      "15-750": {
        paypal: "", // Uses existing PayPal checkout flow
        crypto: "https://nowpayments.io/embeds/payment-widget?iid=5348681626",
      },
    }
    
    return packageLinks[packagePoints]?.[paymentMethod] || ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.package || !formData.paymentMethod) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (formData.paymentMethod === "paypal") {
      // Redirect to PayPal payment page with package info
      const params = new URLSearchParams({
        name: `Reseller Package ${formData.package.split("-")[0]} Points`,
        price: `€${formData.package.split("-")[1]}`,
        duration: "One-time",
        email: formData.email,
        type: "reseller",
      })
      router.push(`/payment-redirect?${params.toString()}`)
    } else if (formData.paymentMethod === "crypto") {
      // Get crypto payment URL for the selected package
      const cryptoUrl = getPaymentUrl(formData.package, "crypto")
      if (cryptoUrl) {
        window.open(cryptoUrl, "_blank", "noopener,noreferrer")
      } else {
        toast({
          title: "Payment Link Not Available",
          description: "Crypto payment link for this package is not configured yet.",
          variant: "destructive",
        })
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const packages = [
    { points: 10, price: 550, popular: true },
    { points: 15, price: 750, popular: false },
  ]

  const features = [
    "Your own CEO dashboard",
    "Set your own subscription prices",
    "Create custom subscription plans",
    "Manage customer accounts",
    "Real-time sales tracking",
    "24/7 technical support",
    "Instant account activation",
    "Complete business control",
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="mobile-container py-8 sm:py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 text-gray-400 hover:text-white touch-element"
          onClick={() => router.push("/reseller")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Reseller Program
        </Button>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <Badge className="mb-4 sm:mb-6 bg-yellow-500/20 text-yellow-500 border-yellow-500/30 responsive-text px-3 py-2 sm:px-4 sm:py-2">
            New Reseller Registration
          </Badge>
          <h1 className="responsive-title mb-4 sm:mb-6">
            Start Your <span className="text-yellow-500">IPTV Business</span>
          </h1>
          <p className="responsive-subtitle text-gray-400 max-w-3xl mx-auto">
            Become your own CEO with our reseller program. Choose your starter package and get instant access to your
            personal dashboard.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Registration Form */}
          <div>
            <Card className="mobile-card bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="responsive-subtitle font-bold text-yellow-500 text-center">
                  Start Your IPTV Business
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="email" className="block responsive-text font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mobile-input bg-gray-800 border-gray-700 text-white"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="package" className="block responsive-text font-medium text-gray-300 mb-2">
                      Choose Package *
                    </label>
                    <select
                      id="package"
                      name="package"
                      value={formData.package}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white mobile-input"
                      required
                    >
                      <option value="">Choose Package</option>
                      {packages.map((pkg, index) => (
                        <option key={index} value={`${pkg.points}-${pkg.price}`}>
                          {pkg.points} Points - €{pkg.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block responsive-text font-medium text-gray-300 mb-2">
                      Payment Method *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: "paypal" })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.paymentMethod === "paypal"
                            ? "border-blue-500 bg-blue-500/20"
                            : "border-gray-700 bg-gray-800 hover:border-gray-600"
                        }`}
                      >
                        <CreditCard className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                        <span className="text-white font-medium">PayPal</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: "crypto" })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.paymentMethod === "crypto"
                            ? "border-yellow-500 bg-yellow-500/20"
                            : "border-gray-700 bg-gray-800 hover:border-gray-600"
                        }`}
                      >
                        <Bitcoin className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                        <span className="text-white font-medium">Crypto</span>
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={!formData.email || !formData.package || !formData.paymentMethod}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold mobile-button-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    {formData.paymentMethod === "paypal" ? "Pay with PayPal" : formData.paymentMethod === "crypto" ? "Pay with Crypto" : "Register Now"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Features List */}
            <Card className="bg-gray-900 border-gray-800 mt-8">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-yellow-500">What You Get</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Packages */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-6 text-yellow-500">Starter Packages</h3>
            <div className="space-y-4">
              {packages.map((pkg, index) => (
                <Card
                  key={index}
                  className={`bg-gray-900 border-gray-800 hover:border-yellow-500/50 transition-colors ${
                    pkg.popular ? "ring-2 ring-yellow-500" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="text-2xl font-bold text-white">{pkg.points} Points</div>
                          {pkg.popular && (
                            <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                              <Star className="w-3 h-3 mr-1" />
                              Most Popular
                            </Badge>
                          )}
                        </div>
                        <div className="text-gray-400 mt-1">
                          {pkg.points === 10 && "Great balance of points and value"}
                          {pkg.points === 15 && "Ideal for serious resellers"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-yellow-500">€{pkg.price}</div>
                        <div className="text-gray-400 text-sm">One-time payment</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <div className="text-sm text-gray-400">
                        <div>• {pkg.points * 10} x 1-month subscriptions</div>
                        <div>• {pkg.points * 2} x 6-month subscriptions</div>
                        <div>• {pkg.points} x 1-year subscriptions</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Points Explanation */}
            <Card className="bg-gray-900 border-gray-800 mt-8">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-yellow-500">Points System</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">1 Point</span>
                    <span className="text-yellow-500 font-semibold">= 1 Year Subscription</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">0.5 Points</span>
                    <span className="text-yellow-500 font-semibold">= 6 Months Subscription</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">0.1 Points</span>
                    <span className="text-yellow-500 font-semibold">= 1 Month Subscription</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-500 text-sm font-semibold">
                    💡 Set your own prices and keep all profits above your point costs!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
