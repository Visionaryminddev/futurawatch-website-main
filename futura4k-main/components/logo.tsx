"use client"

import { Tv } from "lucide-react"
import Link from "next/link"

interface LogoProps {
  className?: string
  textSize?: string
  iconSize?: string
}

export function Logo({ className = "", textSize = "text-2xl", iconSize = "h-8 w-8" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <Tv className={`${iconSize} text-yellow-500`} />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      </div>
      <span
        className={`${textSize} font-bold bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent`}
      >
        FuturaWatch
      </span>
    </Link>
  )
}
