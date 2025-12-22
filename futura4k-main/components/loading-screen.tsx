"use client"

import { Tv } from "lucide-react"

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center mobile-container">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Tv className="h-8 w-8 sm:h-12 sm:w-12 text-yellow-500 animate-pulse" />
          <span className="responsive-title text-yellow-500 ml-2">Futura4K</span>
        </div>
        <div className="w-12 h-1 sm:w-16 sm:h-1 bg-yellow-500 rounded-full mx-auto animate-pulse"></div>
        <p className="text-gray-400 mt-4 responsive-text">Loading your entertainment experience...</p>
      </div>
    </div>
  )
}
