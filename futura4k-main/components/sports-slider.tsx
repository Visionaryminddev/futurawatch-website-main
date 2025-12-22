"use client"

import { useState, useEffect } from "react"
import { useTranslate } from "@/hooks/use-translate"

export default function SportsSlider() {
  const translate = useTranslate()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    translate("hero.slider.champions"),
    translate("hero.slider.euro"),
    translate("hero.slider.worldCup")
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 py-3 overflow-hidden">
      <div className="relative h-8 flex items-center justify-center">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
              index === currentSlide
                ? "opacity-100 transform translate-x-0"
                : index < currentSlide
                ? "opacity-0 transform -translate-x-full"
                : "opacity-0 transform translate-x-full"
            }`}
          >
            <p className="text-white text-sm sm:text-base md:text-lg font-semibold text-center px-4 whitespace-nowrap">
              {slide}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
