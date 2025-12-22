"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, Clock, Play, Settings, Shield, Tv, Wifi, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslate } from "@/hooks/use-translate"
import { useRouter } from "next/navigation"
import { blogPosts } from "@/lib/blog-data"

export default function BlogPage() {
  const [email, setEmail] = useState("")
  const { toast } = useToast()
  const t = useTranslate()
  const router = useRouter()

  const categories = [
    t("blog.categories.all"),
    t("blog.categories.technology"),
    t("blog.categories.guide"),
    t("blog.categories.entertainment"),
    t("blog.categories.education"),
    t("blog.categories.sports"),
    t("blog.categories.security"),
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="mobile-container py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Futura4K <span className="text-yellow-500">{t("blog.title")}</span>
          </h1>
          <p className="responsive-subtitle text-gray-400 max-w-3xl mx-auto">{t("blog.subtitle")}</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="border-gray-700 text-gray-400 hover:border-yellow-500 hover:text-yellow-500 cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm touch-target"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Post */}
        <Card className="mobile-card bg-gray-900 border-gray-800 mb-8 sm:mb-12 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="relative h-48 sm:h-64 md:h-auto">
              <Image
                src={blogPosts[0].image || "/placeholder.svg"}
                alt={blogPosts[0].title}
                fill
                className="object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-yellow-500 text-black">{t("blog.featured")}</Badge>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <Badge className="w-fit mb-4 bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                {blogPosts[0].category}
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">{blogPosts[0].title}</h2>
              <p className="text-gray-400 mb-6">{blogPosts[0].excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                  </div>
                  <span>{blogPosts[0].readTime}</span>
                </div>
                <Link
                  href={`/blog/${blogPosts[0].id}`}
                  className="text-yellow-500 hover:text-yellow-400 flex items-center space-x-1"
                >
                  <span>{t("blog.readMore")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Card
              key={post.id}
              className="bg-gray-900 border-gray-800 hover:border-yellow-500/50 transition-colors overflow-hidden group"
            >
              <div className="relative h-48">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                  {post.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-500 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span>{post.readTime}</span>
                </div>
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center space-x-1 text-yellow-500 hover:text-yellow-400 mt-4"
                >
                  <span>{t("blog.readMore")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/30 mt-16">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">{t("blog.newsletter.title")}</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">{t("blog.newsletter.description")}</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t("blog.newsletter.placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
              />
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-semibold"
                onClick={() => {
                  if (!email) {
                    toast({
                      title: t("blog.newsletter.toast.error.title"),
                      description: t("blog.newsletter.toast.error.description"),
                    })
                    return
                  }

                  // Basic email validation
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                  if (!emailRegex.test(email)) {
                    toast({
                      title: t("blog.newsletter.toast.error.title"),
                      description: "Please enter a valid email address.",
                    })
                    return
                  }

                  toast({
                    title: t("blog.newsletter.toast.success.title"),
                    description: t("blog.newsletter.toast.success.description"),
                  })
                  setEmail("")
                }}
              >
                {t("blog.newsletter.subscribe")}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
