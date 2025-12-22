"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Star, Globe, Tv, Film, Shield } from "lucide-react"
import Image from "next/image"
import { useTranslate } from "@/hooks/use-translate"
import { useRouter } from "next/navigation"
import SportsSlider from "@/components/sports-slider"
import SlidingText from "@/components/sliding-text"

export default function HomePage() {
  const translate = useTranslate()
  const router = useRouter()

  const providers = [
    { name: "Netflix", logo: "/images/netflix-logo.png" },
    { name: "Disney+", logo: "/images/disney-plus-logo.png" },
    { name: "HBO Max", logo: "/images/hbo-max-logo.png" },
    { name: "Prime Video", logo: "/images/prime-video-logo.png" },
    { name: "IPTV", logo: "/images/iptv-logo.png" },
    { name: "Sky Sports", logo: "/images/sky-logo.png" },
  ]

  const features = [
    {
      icon: <Tv className="h-8 w-8 text-yellow-500" />,
      title: translate("features.channels.title"),
      description: translate("features.channels.description"),
    },
    {
      icon: <Film className="h-8 w-8 text-yellow-500" />,
      title: translate("features.movies.title"),
      description: translate("features.movies.description"),
    },
    {
      icon: <Globe className="h-8 w-8 text-yellow-500" />,
      title: translate("features.global.title"),
      description: translate("features.global.description"),
    },
    {
      icon: <Shield className="h-8 w-8 text-yellow-500" />,
      title: translate("features.quality.title"),
      description: translate("features.quality.description"),
    },
  ]

  const handleViewPackages = () => {
    router.push("/subscriptions")
  }

  const handleBrowseChannels = () => {
    router.push("/channels")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/netflix_first_20_seconds.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        
        <div className="relative z-20 text-center mobile-container max-w-4xl">
          <Badge className="mb-4 sm:mb-6 bg-yellow-500/20 text-yellow-500 border-yellow-500/30 text-sm sm:text-lg md:text-xl px-3 sm:px-4 md:px-6 py-2 sm:py-2 md:py-3 font-bold animate-pulse">
            ⭐ #1 IPTV Provider Worldwide
          </Badge>
          <h1 className="responsive-title mb-4 sm:mb-6 bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent">
            Premium Ultra HD 4K & 8K Streaming
          </h1>
          <p className="responsive-subtitle mb-6 sm:mb-8 text-gray-300 max-w-3xl mx-auto">Experience the world's #1 IPTV service with 23,000+ live channels and 130,000+ movies in stunning 4K & 8K quality</p>
          <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row justify-center items-center w-full">
            <Button
              size="lg"
              className="mobile-button-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full sm:w-auto transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={handleViewPackages}
            >
              <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              {translate("hero.cta.watch")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="mobile-button-lg border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black w-full sm:w-auto transition-all duration-300 active:scale-95"
              onClick={handleViewPackages}
            >
              {translate("hero.cta.packages")}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="mobile-container">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-500 mb-1 sm:mb-2">23K+</div>
              <div className="text-gray-400 text-xs sm:text-sm md:text-base">{translate("stats.liveChannels")}</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-500 mb-1 sm:mb-2">130K+</div>
              <div className="text-gray-400 text-xs sm:text-sm md:text-base">{translate("stats.moviesAndSeries")}</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-500 mb-1 sm:mb-2">190+</div>
              <div className="text-gray-400 text-xs sm:text-sm md:text-base">{translate("stats.countries")}</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-500 mb-1 sm:mb-2">99.9%</div>
              <div className="text-gray-400 text-xs sm:text-sm md:text-base">{translate("stats.uptime")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-900">
        <div className="mobile-container">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">{translate("features.title")}</h2>
            <p className="responsive-subtitle text-gray-400 max-w-3xl mx-auto">{translate("features.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="mobile-card bg-black/50 border-gray-800 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 active:scale-95 touch-element"
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="mb-3 sm:mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm sm:text-base">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Providers Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-black">
        <div className="mobile-container">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">{translate("providers.title")}</h2>
            <p className="responsive-subtitle text-gray-400 max-w-3xl mx-auto">{translate("providers.subtitle")}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 items-center">
            {providers.map((provider, index) => (
              <div key={index} className="flex justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 touch-element w-full">
                  <Image
                    src={provider.logo || "/placeholder.svg"}
                    alt={provider.name}
                    width={120}
                    height={80}
                    className="object-contain h-12 sm:h-16 w-auto mx-auto"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `/placeholder.svg?height=80&width=120&text=${provider.name}`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10">
        <div className="mobile-container text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">{translate("cta.title")}</h2>
          <p className="responsive-subtitle text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto">{translate("cta.subtitle")}</p>
          <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row justify-center w-full">
            <Button
              size="lg"
              className="mobile-button-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full sm:w-auto transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={handleViewPackages}
            >
              <Star className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              {translate("cta.packages")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="mobile-button-lg border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black w-full sm:w-auto transition-all duration-300 active:scale-95"
              onClick={handleBrowseChannels}
            >
              {translate("cta.channels")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
