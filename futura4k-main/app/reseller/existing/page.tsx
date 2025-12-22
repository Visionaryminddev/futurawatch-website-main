"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CreditCard, BarChart3, Star, Mail, Bitcoin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useTranslate } from "@/hooks/use-translate"
import { useRouter } from "next/navigation"

export default function ExistingResellerPage() {
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
      "10-450": {
        paypal: "", // Uses existing PayPal checkout flow
        crypto: "https://nowpayments.io/embeds/payment-widget?iid=4569373688",
      },
      "15-600": {
        paypal: "", // Uses existing PayPal checkout flow
        crypto: "https://nowpayments.io/embeds/payment-widget?iid=5348681626",
      },
    }
    
    return packageLinks[packagePoints]?.[paymentMethod] || ""
  }

  const handlePurchase = async (e: React.FormEvent) => {
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
        name: `Reseller Points Package ${formData.package.split("-")[0]} Points`,
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
    {
      points: 10,
      price: 450,
      popular: true,
      description: "Great balance of points and value",
      subscriptions: {
        monthly: 100,
        sixMonth: 20,
        yearly: 10,
      },
    },
    {
      points: 15,
      price: 600,
      popular: false,
      description: "Ideal for serious resellers",
      subscriptions: {
        monthly: 150,
        sixMonth: 30,
        yearly: 15,
      },
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-8 text-gray-400 hover:text-white"
          onClick={() => router.push("/reseller")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Reseller Program
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-6 bg-blue-500/20 text-blue-500 border-blue-500/30 text-lg px-4 py-2">
            Existing Reseller
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Add More <span className="text-yellow-500">Points</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Expand your business by purchasing additional points. Access your dashboard or buy more points to continue
            growing your IPTV reseller business.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Dashboard Access & Purchase Form */}
          <div>
            <Card className="bg-gray-900 border-gray-800 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-500 text-center">Access Your Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-400 mb-6">
                  Manage your customers, track sales, and control your IPTV business from your CEO dashboard.
                </p>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                  onClick={() => {
                    // Redirect to Signal link
                    window.open("https://signal.me/#eu/Td0r6W11XPRx9fPR-VNGX5HtY6UoUyvo779QXjGe85xm6M8wQ3dKa41lh2ep5HDQ", "_blank")
                    toast({
                      title: "Redirecting to Dashboard",
                      description: "Opening your reseller dashboard...",
                    })
                  }}
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Access Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-yellow-500 text-center">Buy More Points</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePurchase} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="package" className="block text-sm font-medium text-gray-300 mb-2">
                      Choose Package *
                    </label>
                    <select
                      id="package"
                      name="package"
                      value={formData.package}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
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
                    <label className="block text-sm font-medium text-gray-300 mb-2">
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
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    {formData.paymentMethod === "paypal" ? "Pay with PayPal" : formData.paymentMethod === "crypto" ? "Pay with Crypto" : "Buy Points"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Packages */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-6 text-yellow-500">Points Packages</h3>
            <div className="space-y-4">
              {packages.map((pkg, index) => (
                <Card
                  key={index}
                  className={`bg-gray-900 border-gray-800 hover:border-yellow-500/50 transition-colors cursor-pointer ${
                    pkg.popular ? "ring-2 ring-yellow-500" : ""
                  } ${formData.package === `${pkg.points}-${pkg.price}` ? "border-yellow-500" : ""}`}
                  onClick={() => setFormData({ ...formData, package: `${pkg.points}-${pkg.price}` })}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
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
                        <div className="text-gray-400 mt-1">{pkg.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-yellow-500">€{pkg.price}</div>
                        <div className="text-gray-400 text-sm">One-time payment</div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-700">
                      <div className="text-sm text-gray-400 space-y-1">
                        <div>• {pkg.subscriptions.monthly} x 1-month subscriptions</div>
                        <div>• {pkg.subscriptions.sixMonth} x 6-month subscriptions</div>
                        <div>• {pkg.subscriptions.yearly} x 1-year subscriptions</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
