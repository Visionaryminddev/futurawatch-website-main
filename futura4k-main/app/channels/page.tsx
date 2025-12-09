"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Globe, Tv, Users, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useTranslate } from "@/hooks/use-translate"

export default function ChannelsPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [loadedChannels, setLoadedChannels] = useState(6)
  const [isLoading, setIsLoading] = useState(false)
  const t = useTranslate()

  const countries = [
    { code: "NL", name: t("channels.countries.netherlands"), flag: "🇳🇱", channels: 450 },
    { code: "US", name: t("channels.countries.unitedStates"), flag: "🇺🇸", channels: 1200 },
    { code: "UK", name: t("channels.countries.unitedKingdom"), flag: "🇬🇧", channels: 380 },
    { code: "DE", name: t("channels.countries.germany"), flag: "🇩🇪", channels: 520 },
    { code: "FR", name: t("channels.countries.france"), flag: "🇫🇷", channels: 340 },
    { code: "ES", name: t("channels.countries.spain"), flag: "🇪🇸", channels: 280 },
    { code: "IT", name: t("channels.countries.italy"), flag: "🇮🇹", channels: 310 },
    { code: "CA", name: t("channels.countries.canada"), flag: "🇨🇦", channels: 220 },
    { code: "AU", name: t("channels.countries.australia"), flag: "🇦🇺", channels: 180 },
    { code: "BR", name: t("channels.countries.brazil"), flag: "🇧🇷", channels: 290 },
    { code: "MX", name: t("channels.countries.mexico"), flag: "🇲🇽", channels: 150 },
    { code: "AR", name: t("channels.countries.argentina"), flag: "🇦🇷", channels: 120 },
    { code: "IN", name: t("channels.countries.india"), flag: "🇮🇳", channels: 680 },
    { code: "JP", name: t("channels.countries.japan"), flag: "🇯🇵", channels: 240 },
    { code: "KR", name: t("channels.countries.southKorea"), flag: "🇰🇷", channels: 160 },
    { code: "CN", name: t("channels.countries.china"), flag: "🇨🇳", channels: 420 },
    { code: "RU", name: t("channels.countries.russia"), flag: "🇷🇺", channels: 380 },
    { code: "TR", name: t("channels.countries.turkey"), flag: "🇹🇷", channels: 200 },
    { code: "SA", name: t("channels.countries.saudiArabia"), flag: "🇸🇦", channels: 140 },
    { code: "AE", name: t("channels.countries.uae"), flag: "🇦🇪", channels: 110 },
    // 40 Additional Countries
    { code: "SE", name: t("channels.countries.sweden"), flag: "🇸🇪", channels: 95 },
    { code: "NO", name: t("channels.countries.norway"), flag: "🇳🇴", channels: 85 },
    { code: "DK", name: t("channels.countries.denmark"), flag: "🇩🇰", channels: 75 },
    { code: "FI", name: t("channels.countries.finland"), flag: "🇫🇮", channels: 65 },
    { code: "BE", name: t("channels.countries.belgium"), flag: "🇧🇪", channels: 120 },
    { code: "CH", name: t("channels.countries.switzerland"), flag: "🇨🇭", channels: 110 },
    { code: "AT", name: t("channels.countries.austria"), flag: "🇦🇹", channels: 105 },
    { code: "PT", name: t("channels.countries.portugal"), flag: "🇵🇹", channels: 90 },
    { code: "GR", name: t("channels.countries.greece"), flag: "🇬🇷", channels: 85 },
    { code: "PL", name: t("channels.countries.poland"), flag: "🇵🇱", channels: 150 },
    { code: "CZ", name: t("channels.countries.czechRepublic"), flag: "🇨🇿", channels: 80 },
    { code: "HU", name: t("channels.countries.hungary"), flag: "🇭🇺", channels: 70 },
    { code: "RO", name: t("channels.countries.romania"), flag: "🇷🇴", channels: 95 },
    { code: "BG", name: t("channels.countries.bulgaria"), flag: "🇧🇬", channels: 65 },
    { code: "HR", name: t("channels.countries.croatia"), flag: "🇭🇷", channels: 55 },
    { code: "RS", name: t("channels.countries.serbia"), flag: "🇷🇸", channels: 60 },
    { code: "BA", name: t("channels.countries.bosnia"), flag: "🇧🇦", channels: 45 },
    { code: "SI", name: t("channels.countries.slovenia"), flag: "🇸🇮", channels: 40 },
    { code: "SK", name: t("channels.countries.slovakia"), flag: "🇸🇰", channels: 50 },
    { code: "LT", name: t("channels.countries.lithuania"), flag: "🇱🇹", channels: 35 },
    { code: "LV", name: t("channels.countries.latvia"), flag: "🇱🇻", channels: 30 },
    { code: "EE", name: t("channels.countries.estonia"), flag: "🇪🇪", channels: 25 },
    { code: "IE", name: t("channels.countries.ireland"), flag: "🇮🇪", channels: 75 },
    { code: "IS", name: t("channels.countries.iceland"), flag: "🇮🇸", channels: 20 },
    { code: "ZA", name: t("channels.countries.southAfrica"), flag: "🇿🇦", channels: 120 },
    { code: "EG", name: t("channels.countries.egypt"), flag: "🇪🇬", channels: 180 },
    { code: "MA", name: t("channels.countries.morocco"), flag: "🇲🇦", channels: 90 },
    { code: "TN", name: t("channels.countries.tunisia"), flag: "🇹🇳", channels: 70 },
    { code: "DZ", name: t("channels.countries.algeria"), flag: "🇩🇿", channels: 85 },
    { code: "NG", name: t("channels.countries.nigeria"), flag: "🇳🇬", channels: 150 },
    { code: "KE", name: t("channels.countries.kenya"), flag: "🇰🇪", channels: 80 },
    { code: "TH", name: t("channels.countries.thailand"), flag: "🇹🇭", channels: 130 },
    { code: "VN", name: t("channels.countries.vietnam"), flag: "🇻🇳", channels: 110 },
    { code: "MY", name: t("channels.countries.malaysia"), flag: "🇲🇾", channels: 95 },
    { code: "SG", name: t("channels.countries.singapore"), flag: "🇸🇬", channels: 60 },
    { code: "ID", name: t("channels.countries.indonesia"), flag: "🇮🇩", channels: 200 },
    { code: "PH", name: t("channels.countries.philippines"), flag: "🇵🇭", channels: 140 },
    { code: "PK", name: t("channels.countries.pakistan"), flag: "🇵🇰", channels: 190 },
    { code: "BD", name: t("channels.countries.bangladesh"), flag: "🇧🇩", channels: 120 },
    { code: "LK", name: t("channels.countries.sriLanka"), flag: "🇱🇰", channels: 75 },
  ]

  // Base channels for each country (the premium/main channels)
  const baseChannels = {
    NL: [
      {
        name: "NPO 1 HD",
        category: t("channels.categories.general"),
        logo: "/placeholder.svg?height=60&width=60&text=NPO1",
      },
      {
        name: "RTL 4 HD",
        category: t("channels.categories.entertainment"),
        logo: "/placeholder.svg?height=60&width=60&text=RTL4",
      },
      {
        name: "SBS6 HD",
        category: t("channels.categories.entertainment"),
        logo: "/placeholder.svg?height=60&width=60&text=SBS6",
      },
      {
        name: "Fox Sports 1 HD",
        category: t("channels.categories.sports"),
        logo: "/placeholder.svg?height=60&width=60&text=FOX",
      },
      {
        name: "Discovery HD",
        category: t("channels.categories.documentary"),
        logo: "/placeholder.svg?height=60&width=60&text=DISC",
      },
      {
        name: "Nickelodeon HD",
        category: t("channels.categories.kids"),
        logo: "/placeholder.svg?height=60&width=60&text=NICK",
      },
    ],
    US: [
      { name: "CNN HD", category: t("channels.categories.news"), logo: "/placeholder.svg?height=60&width=60&text=CNN" },
      {
        name: "ESPN HD",
        category: t("channels.categories.sports"),
        logo: "/placeholder.svg?height=60&width=60&text=ESPN",
      },
      {
        name: "HBO HD",
        category: t("channels.categories.premium"),
        logo: "/placeholder.svg?height=60&width=60&text=HBO",
      },
      {
        name: "Disney Channel HD",
        category: t("channels.categories.kids"),
        logo: "/placeholder.svg?height=60&width=60&text=DISNEY",
      },
      {
        name: "Fox News HD",
        category: t("channels.categories.news"),
        logo: "/placeholder.svg?height=60&width=60&text=FOX",
      },
      {
        name: "Comedy Central HD",
        category: t("channels.categories.entertainment"),
        logo: "/placeholder.svg?height=60&width=60&text=CC",
      },
    ],
  }

  // Channel name generators for different categories
  const channelGenerators = {
    [t("channels.categories.general")]: (country: string, index: number) => [
      `${country} TV ${index} HD`,
      `${country} Channel ${index} HD`,
      `${country} Network ${index} HD`,
    ],
    [t("channels.categories.sports")]: (country: string, index: number) => [
      `${country} Sports ${index} HD`,
      `${country} Sport Network ${index} HD`,
      `${country} Football ${index} HD`,
    ],
    [t("channels.categories.news")]: (country: string, index: number) => [
      `${country} News ${index} HD`,
      `${country} Today ${index} HD`,
      `${country} Breaking News ${index} HD`,
    ],
    [t("channels.categories.entertainment")]: (country: string, index: number) => [
      `${country} Entertainment ${index} HD`,
      `${country} Comedy ${index} HD`,
      `${country} Drama ${index} HD`,
    ],
    [t("channels.categories.movies")]: (country: string, index: number) => [
      `${country} Cinema ${index} HD`,
      `${country} Movies ${index} HD`,
      `${country} Film ${index} HD`,
    ],
    [t("channels.categories.kids")]: (country: string, index: number) => [
      `${country} Kids ${index} HD`,
      `${country} Junior ${index} HD`,
      `${country} Children ${index} HD`,
    ],
    [t("channels.categories.documentary")]: (country: string, index: number) => [
      `${country} Discovery ${index} HD`,
      `${country} Nature ${index} HD`,
      `${country} Science ${index} HD`,
    ],
    [t("channels.categories.music")]: (country: string, index: number) => [
      `${country} Music ${index} HD`,
      `${country} Hits ${index} HD`,
      `${country} Radio TV ${index} HD`,
    ],
    [t("channels.categories.premium")]: (country: string, index: number) => [
      `${country} Premium ${index} HD`,
      `${country} Gold ${index} HD`,
      `${country} Platinum ${index} HD`,
    ],
  }

  // Generate full channel list for a country
  const generateChannels = useMemo(() => {
    return (countryCode: string) => {
      const country = countries.find((c) => c.code === countryCode)
      if (!country) return []

      const baseChannelList = baseChannels[countryCode as keyof typeof baseChannels] || []
      const totalChannels = country.channels
      const channels = [...baseChannelList]

      // Generate additional channels to reach the total count
      const categories = [
        t("channels.categories.general"),
        t("channels.categories.sports"),
        t("channels.categories.news"),
        t("channels.categories.entertainment"),
        t("channels.categories.movies"),
        t("channels.categories.kids"),
        t("channels.categories.documentary"),
        t("channels.categories.music"),
        t("channels.categories.premium"),
      ]
      let channelIndex = baseChannelList.length + 1

      while (channels.length < totalChannels) {
        const category = categories[Math.floor(Math.random() * categories.length)]
        const generator = channelGenerators[category]
        if (generator) {
          const nameOptions = generator(country.name, channelIndex)
          const channelName = nameOptions[Math.floor(Math.random() * nameOptions.length)]

          channels.push({
            name: channelName,
            category,
            logo: `/placeholder.svg?height=60&width=60&text=${category.substring(0, 4).toUpperCase()}${channelIndex}`,
          })
        }

        channelIndex++
      }

      return channels
    }
  }, [t])

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [searchTerm])

  const currentChannels = useMemo(() => {
    return selectedCountry ? generateChannels(selectedCountry) : []
  }, [selectedCountry, generateChannels])

  const displayedChannels = useMemo(() => {
    return currentChannels.slice(0, loadedChannels)
  }, [currentChannels, loadedChannels])

  const loadMoreChannels = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      setLoadedChannels((prev) => Math.min(prev + 12, currentChannels.length))
      setIsLoading(false)
    }, 1000)
  }, [currentChannels.length, setIsLoading, setLoadedChannels])

  const handleCountrySelect = useCallback(
    (countryCode: string) => {
      setSelectedCountry(countryCode)
      setLoadedChannels(6)
    },
    [setSelectedCountry, setLoadedChannels],
  )

  const handleBackToCountries = useCallback(() => {
    setSelectedCountry(null)
    setLoadedChannels(6)
  }, [setSelectedCountry, setLoadedChannels])

  const selectedCountryData = useMemo(() => {
    return countries.find((c) => c.code === selectedCountry)
  }, [selectedCountry])

  const remainingChannels = currentChannels.length - displayedChannels.length

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="mobile-container py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">
            {t("channels.title")} <span className="text-yellow-500">{t("channels.titleHighlight")}</span>
          </h1>
          <p className="responsive-subtitle text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8">{t("channels.subtitle")}</p>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              placeholder={t("channels.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white mobile-focus"
            />
          </div>
        </div>

        {!selectedCountry ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12">
              <div className="text-center">
                <Globe className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-500 mx-auto mb-2" />
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-500">200+</div>
                <div className="text-gray-400 text-xs sm:text-sm md:text-base">{t("channels.stats.countries")}</div>
              </div>
              <div className="text-center">
                <Tv className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-500 mx-auto mb-2" />
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-500">28,000+</div>
                <div className="text-gray-400 text-xs sm:text-sm md:text-base">{t("channels.stats.channels")}</div>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-500 mx-auto mb-2" />
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-500">60+</div>
                <div className="text-gray-400 text-xs sm:text-sm md:text-base">{t("channels.stats.languages")}</div>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2 text-black font-bold text-sm sm:text-base">
                  Ultra HD 4K & 8K
                </div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-500">{t("channels.stats.quality")}</div>
                <div className="text-gray-400 text-xs sm:text-sm md:text-base">{t("channels.stats.qualityDesc")}</div>
              </div>
            </div>

            {/* Countries Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {filteredCountries.map((country) => (
                <Card
                  key={country.code}
                  className="mobile-card bg-gray-900 border-gray-800 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 touch-element"
                  onClick={() => handleCountrySelect(country.code)}
                >
                  <CardContent className="p-3 sm:p-4 md:p-6 text-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3">{country.flag}</div>
                    <h3 className="font-semibold text-white mb-1 sm:mb-2 text-xs sm:text-sm md:text-base line-clamp-1">{country.name}</h3>
                    <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 text-xs">
                      {country.channels} {t("channels.channelsCount")}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCountries.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-400 text-base sm:text-lg">No countries found matching your search.</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Back Button and Country Header */}
            <div className="mb-6 sm:mb-8">
              <button
                onClick={handleBackToCountries}
                className="text-yellow-500 hover:text-yellow-400 mb-3 sm:mb-4 flex items-center transition-colors touch-target"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("channels.backToCountries")}
              </button>

              {selectedCountryData && (
                <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="text-4xl sm:text-5xl md:text-6xl">{selectedCountryData.flag}</div>
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-500">{selectedCountryData.name}</h2>
                    <p className="text-gray-400 text-sm sm:text-base">
                      {selectedCountryData.channels} {t("channels.availableChannels")}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Channels List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {displayedChannels.map((channel, index) => (
                <Card key={index} className="mobile-card bg-gray-900 border-gray-800 hover:border-yellow-500/50 transition-colors touch-element">
                  <CardContent className="p-3 sm:p-4 flex items-center space-x-3 sm:space-x-4">
                    <Image
                      src={channel.logo || "/placeholder.svg"}
                      alt={channel.name}
                      width={50}
                      height={50}
                      className="rounded-lg w-10 h-10 sm:w-12 sm:h-12 md:w-15 md:h-15"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `/placeholder.svg?height=60&width=60&text=${channel.category.substring(0, 4).toUpperCase()}`
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-sm sm:text-base line-clamp-1">{channel.name}</h3>
                      <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                        {channel.category}
                      </Badge>
                    </div>
                    <div className="text-yellow-500 font-semibold text-xs sm:text-sm">Ultra HD 4K & 8K</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {displayedChannels.length < currentChannels.length && (
              <div className="text-center mt-6 sm:mt-8">
                <button
                  className="mobile-button-lg bg-yellow-500 hover:bg-yellow-600 text-black px-6 sm:px-8 py-3 rounded-lg font-semibold disabled:opacity-50 transition-all duration-300 hover:scale-105 active:scale-95"
                  onClick={loadMoreChannels}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                      {t("channels.loading")}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span>{t("channels.loadMore")}</span>
                      <span className="text-xs sm:text-sm opacity-75">
                        {t("channels.loadMoreCount").replace("{{remaining}}", remainingChannels.toString())}
                      </span>
                    </div>
                  )}
                </button>
              </div>
            )}

            {displayedChannels.length === currentChannels.length && currentChannels.length > 6 && (
              <div className="text-center mt-6 sm:mt-8">
                <div className="text-yellow-500 font-semibold text-sm sm:text-base">
                  ✅ {t("channels.allLoaded").replace("{{total}}", currentChannels.length.toString())}
                </div>
              </div>
            )}

            {currentChannels.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-400 text-base sm:text-lg">No channels available for this country.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
