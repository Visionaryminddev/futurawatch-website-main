"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, User, Clock } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTranslate } from "@/hooks/use-translate"

import { blogPosts } from "@/lib/blog-data"

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const t = useTranslate()
  const postId = parseInt(params.id as string)
  
  const post = blogPosts.find(p => p.id === postId)

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white pt-20">
        <div className="mobile-container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <Link href="/blog" className="text-yellow-500 hover:text-yellow-400">
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="mobile-container py-8 sm:py-12">
        {/* Back Button */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-yellow-500 hover:text-yellow-400 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("blog.backToBlog") || "Back to Blog"}
        </Link>

        {/* Post Header */}
        <div className="mb-8">
          <Badge className="mb-4 bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
            {post.category}
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
            {post.title}
          </h1>
          
          {/* Post Meta */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-400 mb-8">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 mb-8 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-yellow-500/20 via-gray-800 to-gray-900 flex items-center justify-center">
              <span className="text-gray-400 text-sm sm:text-base">{post.imageAlt || post.title}</span>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div 
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            color: '#e5e7eb',
          }}
        />

        {/* Related Posts / CTA */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-yellow-400 mb-2">
              {t("blog.cta.title") || "Ready to Start Streaming?"}
            </h3>
            <p className="text-gray-300 mb-4">
              {t("blog.cta.description") || "Get access to 23,000+ channels and 130,000+ movies"}
            </p>
            <Link 
              href="/subscriptions"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold inline-block transition-colors"
            >
              {t("blog.cta.button") || "View Subscriptions"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

