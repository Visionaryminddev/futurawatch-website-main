"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Maximize, ArrowLeft, Star } from "lucide-react"
import Link from "next/link"
import { useState, useRef } from "react"

type FullscreenVideo = HTMLVideoElement & {
  mozRequestFullScreen?: () => Promise<void> | void
  webkitRequestFullscreen?: () => Promise<void> | void
  msRequestFullscreen?: () => Promise<void> | void
}

export default function WatchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const title = searchParams.get("title") || "Sample Content"
  const type = searchParams.get("type") || "movie"

  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      videoRef.current.volume = parseFloat(e.target.value)
    }
  }

  const handleFullscreen = () => {
    const videoEl = videoRef.current as FullscreenVideo | null
    if (videoEl) {
      if (videoEl.requestFullscreen) {
        videoEl.requestFullscreen()
      } else if (videoEl.mozRequestFullScreen) {
        videoEl.mozRequestFullScreen()
      } else if (videoEl.webkitRequestFullscreen) {
        videoEl.webkitRequestFullscreen()
      } else if (videoEl.msRequestFullscreen) {
        videoEl.msRequestFullscreen()
      }
    }
  }

  const handleRelatedContentClick = (id: number) => {
    router.push(`/watch?title=Related ${type} ${id}&type=${type}`)
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/library" className="inline-flex items-center text-yellow-500 hover:text-yellow-400 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Library
        </Link>

        {/* Video Player */}
        <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-8">
          <video ref={videoRef} className="aspect-video w-full" controls={false} onClick={togglePlay}>
            <source src="/placeholder-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black" onClick={togglePlay}>
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <input type="range" min="0" max="1" step="0.01" onChange={handleVolume} className="w-20" />
                <div className="text-sm text-gray-300">00:15:32 / 02:18:45</div>
              </div>
              <Button size="sm" variant="outline" className="border-gray-600" onClick={handleFullscreen}>
                <Maximize className="w-4 h-4" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div className="bg-yellow-500 h-1 rounded-full" style={{ width: "12%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Info */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              <h1 className="text-3xl font-bold">{title}</h1>
              <Badge className="bg-yellow-500 text-black">4K Ultra HD</Badge>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span>8.7</span>
              </div>
            </div>

            <p className="text-gray-400 mb-6">
              Experience this {type} in stunning 4K quality with crystal clear audio and immersive viewing experience.
              Our premium streaming technology ensures no buffering and the highest quality playback.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="outline" className="border-gray-600">
                Action
              </Badge>
              <Badge variant="outline" className="border-gray-600">
                Adventure
              </Badge>
              <Badge variant="outline" className="border-gray-600">
                Thriller
              </Badge>
            </div>
          </div>

          <div>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-yellow-500">Streaming Quality</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Resolution:</span>
                    <span className="text-yellow-500">4K Ultra HD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Audio:</span>
                    <span>Dolby Atmos</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtitles:</span>
                    <span>15+ Languages</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bitrate:</span>
                    <span>25 Mbps</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Content */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card
                key={item}
                className="bg-gray-900 border-gray-800 hover:border-yellow-500/50 transition-colors"
                onClick={() => handleRelatedContentClick(item)}
              >
                <CardContent className="p-0">
                  <div className="aspect-[2/3] bg-gradient-to-br from-gray-700 to-gray-800 rounded-t-lg flex items-center justify-center">
                    <Play className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-sm">
                      Related {type} {item}
                    </h4>
                    <p className="text-xs text-gray-400">2023</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
