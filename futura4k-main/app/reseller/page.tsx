"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, DollarSign, Shield, Headphones, Zap, ArrowRight, Star, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useTranslate } from "@/hooks/use-translate"

export default function ResellerPage() {
  const t = useTranslate()

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8 text-yellow-500" />,
      title: t("reseller.benefits.profit.title"),
      description: t("reseller.benefits.profit.description"),
    },
    {
      icon: <Users className="w-8 h-8 text-yellow-500" />,
      title: t("reseller.benefits.dashboard.title"),
      description: t("reseller.benefits.dashboard.description"),
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-yellow-500" />,
      title: t("reseller.benefits.scalable.title"),
      description: t("reseller.benefits.scalable.description"),
    },
    {
      icon: <Shield className="w-8 h-8 text-yellow-500" />,
      title: t("reseller.benefits.reliable.title"),
      description: t("reseller.benefits.reliable.description"),
    },
    {
      icon: <Headphones className="w-8 h-8 text-yellow-500" />,
      title: t("reseller.benefits.support.title"),
      description: t("reseller.benefits.support.description"),
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: t("reseller.benefits.instant.title"),
      description: t("reseller.benefits.instant.description"),
    },
  ]

  const features = [
    t("reseller.features.accounts"),
    t("reseller.features.pricing"),
    t("reseller.features.tracking"),
    t("reseller.features.management"),
    t("reseller.features.billing"),
    t("reseller.features.branding"),
    t("reseller.features.multilang"),
    t("reseller.features.mobile"),
  ]

  const testimonials = [
    {
      name: t("reseller.testimonials.alex.name"),
      role: t("reseller.testimonials.alex.role"),
      content: t("reseller.testimonials.alex.content"),
      rating: 5,
    },
    {
      name: t("reseller.testimonials.sarah.name"),
      role: t("reseller.testimonials.sarah.role"),
      content: t("reseller.testimonials.sarah.content"),
      rating: 5,
    },
    {
      name: t("reseller.testimonials.mike.name"),
      role: t("reseller.testimonials.mike.role"),
      content: t("reseller.testimonials.mike.content"),
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="mobile-container text-center">
          <Badge className="mb-4 sm:mb-6 bg-yellow-500/20 text-yellow-500 border-yellow-500/30 text-sm sm:text-base md:text-lg px-4 sm:px-6 py-2">
            {t("reseller.badge")}
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold mb-4 sm:mb-6">
            {t("reseller.title")} <span className="text-yellow-500">{t("reseller.titleHighlight")}</span>
          </h1>
          <p className="responsive-subtitle text-gray-400 max-w-4xl mx-auto mb-8 sm:mb-12">
            {t("reseller.subtitle")}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center items-center w-full">
            <Link href="/reseller/new" className="w-full sm:w-auto">
              <Button className="mobile-button-lg bg-yellow-500 hover:bg-yellow-600 text-black font-bold btn-glow w-full sm:w-auto">
                {t("reseller.cta.start")}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Link href="/reseller/existing" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="mobile-button-lg border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold w-full sm:w-auto"
              >
                {t("reseller.cta.existing")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="mobile-container">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              {t("reseller.sections.benefits.title")} <span className="text-yellow-500">{t("reseller.sections.benefits.titleHighlight")}</span>
            </h2>
            <p className="responsive-subtitle text-gray-400 max-w-3xl mx-auto">
              {t("reseller.sections.benefits.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-gray-800 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-4 flex justify-center">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("reseller.sections.howItWorks.title")} <span className="text-yellow-500">{t("reseller.sections.howItWorks.titleHighlight")}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t("reseller.sections.howItWorks.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-2xl mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{t("reseller.sections.howItWorks.step1.title")}</h3>
              <p className="text-gray-400">
                {t("reseller.sections.howItWorks.step1.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-2xl mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{t("reseller.sections.howItWorks.step2.title")}</h3>
              <p className="text-gray-400">
                {t("reseller.sections.howItWorks.step2.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-2xl mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{t("reseller.sections.howItWorks.step3.title")}</h3>
              <p className="text-gray-400">
                {t("reseller.sections.howItWorks.step3.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t("reseller.sections.features.title")} <span className="text-yellow-500">{t("reseller.sections.features.titleHighlight")}</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                {t("reseller.sections.features.subtitle")}
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <Card className="bg-gray-900 border-gray-800 p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-yellow-500 mb-2">{t("reseller.sections.earnings.title")}</h3>
                  <p className="text-gray-400">{t("reseller.sections.earnings.subtitle")}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                    <span className="text-gray-300">{t("reseller.sections.earnings.revenue")}</span>
                    <span className="text-yellow-500 font-bold">€4,300</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                    <span className="text-gray-300">{t("reseller.sections.earnings.costs")}</span>
                    <span className="text-red-400 font-bold">-€700</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                    <span className="text-white font-bold">{t("reseller.sections.earnings.profit")}</span>
                    <span className="text-yellow-500 font-bold text-xl">€3,600</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("reseller.sections.testimonials.title")} <span className="text-yellow-500">{t("reseller.sections.testimonials.titleHighlight")}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t("reseller.sections.testimonials.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">&ldquo;{testimonial.content}&rdquo;</p>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("reseller.sections.cta.title")} <span className="text-yellow-500">{t("reseller.sections.cta.titleHighlight")}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            {t("reseller.sections.cta.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/reseller/new">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-xl px-12 py-6 btn-glow">
                {t("reseller.sections.cta.startNew")}
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/reseller/existing">
              <Button
                variant="outline"
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold text-xl px-12 py-6"
              >
                {t("reseller.sections.cta.existing")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
