"use client"

import { useEffect, useState } from "react"

interface SlidingTextProps {
  texts: string[]
  className?: string
  speed?: number // milliseconds between text changes
}

export function SlidingText({ texts, className = "", speed = 3000 }: SlidingTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (texts.length <= 1) return

    const interval = setInterval(() => {
      setIsVisible(false)
      
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        setIsVisible(true)
      }, 300) // Half second for fade transition
    }, speed)

    return () => clearInterval(interval)
  }, [texts.length, speed])

  return (
    <div className="w-full overflow-hidden flex justify-center items-center min-h-[2rem] sm:min-h-[2.5rem]">
      <span 
        className={`
          transition-opacity duration-300 
          ${isVisible ? 'opacity-100' : 'opacity-0'} 
          ${className}
          block w-full text-center
          px-2 sm:px-4
          leading-tight
          break-words
          max-w-full
        `}
        style={{
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          hyphens: 'auto'
        }}
      >
        {texts[currentTextIndex]}
      </span>
    </div>
  )
}

export default SlidingText
