"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Clock } from "lucide-react"
import { useTranslate } from "@/hooks/use-translate"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  })
  const t = useTranslate()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      toast({
        title: "Message Sent Successfully!",
        description: "We've received your message and will get back to you soon.",
      })

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again or contact us directly at info@futurawatch.com",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="mobile-container py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
            {t("contact.title")} <span className="text-yellow-500">{t("contact.titleHighlight")}</span>
          </h1>
          <p className="responsive-subtitle text-gray-400 max-w-3xl mx-auto">{t("contact.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <Card className="mobile-card bg-gray-900 border-gray-800">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-yellow-500">{t("contact.form.title")}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <Label htmlFor="fullName" className="text-white text-sm sm:text-base">{t("contact.form.fullName")}</Label>
                  <Input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="mt-2 bg-gray-800 border-gray-700 text-white mobile-focus h-12 sm:h-auto"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white text-sm sm:text-base">{t("contact.form.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 bg-gray-800 border-gray-700 text-white mobile-focus h-12 sm:h-auto"
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-white text-sm sm:text-base">{t("contact.form.subject")}</Label>
                  <Input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="mt-2 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-white">{t("contact.form.message")}</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-2 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  {isLoading ? "Sending..." : t("contact.form.send")}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information - Only Email */}
          <div className="space-y-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-yellow-500">{t("contact.info.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="font-semibold text-white">{t("contact.info.emailSupport")}</div>
                      <button
                        onClick={() => window.open("mailto:info@futurawatch.com", "_blank")}
                        className="text-yellow-500 hover:text-yellow-400 transition-colors"
                      >
                        info@futurawatch.com
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="font-semibold text-white">{t("contact.info.supportHours")}</div>
                      <div className="text-gray-400">{t("contact.info.availability")}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>


            {/* Support Types */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-yellow-500">{t("contact.support.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white">{t("contact.support.technical")}</span>
                    <Badge className="bg-green-600 text-white">{t("contact.support.available")}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">{t("contact.support.billing")}</span>
                    <Badge className="bg-green-600 text-white">{t("contact.support.available")}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">{t("contact.support.general")}</span>
                    <Badge className="bg-green-600 text-white">{t("contact.support.available")}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trustpilot Widget */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-yellow-500">Trusted by Thousands</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-4">
                  See what our satisfied customers say about FuturaWatch
                </p>
                <div
                  className="trustpilot-widget"
                  data-locale="en-US"
                  data-template-id="5419b6a8b0d04a076b216ad6"
                  data-businessunit-id={process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_ID || "65b211111111111111111111"}
                  data-style-height="140px"
                  data-style-width="100%"
                  data-theme="dark"
                  data-stars="4,5"
                  data-font-family="Inter"
                >
                  <a href="https://www.trustpilot.com/review/futurawatch.com" target="_blank" rel="noopener">Trustpilot</a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("contact.faq.title")} <span className="text-yellow-500">{t("contact.faq.titleHighlight")}</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-yellow-500 mb-3">
                  {t("contact.faq.loginDetails.question")}
                </h3>
                <p className="text-gray-400">{t("contact.faq.loginDetails.answer")}</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-yellow-500 mb-3">
                  {t("contact.faq.devices.question")}
                </h3>
                <p className="text-gray-400">{t("contact.faq.devices.answer")}</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-yellow-500 mb-3">
                  {t("contact.faq.changePlan.question")}
                </h3>
                <p className="text-gray-400">{t("contact.faq.changePlan.answer")}</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-yellow-500 mb-3">
                  {t("contact.faq.buffering.question")}
                </h3>
                <p className="text-gray-400">{t("contact.faq.buffering.answer")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
