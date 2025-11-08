'use client'
import { useState, useCallback, TouchEvent, ReactNode, useEffect } from 'react'
import s from './slider.module.css'

interface SliderProps {
  slides: ReactNode[]
  autoPlayInterval?: number
  swipeThreshold?: number
  showDots?: boolean
}

function Slider({
  slides,
  autoPlayInterval = 0,
  swipeThreshold = 50,
  showDots = true,
}: SliderProps) {
  const [current, setCurrent] = useState(0)
  const [startX, setStartX] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)

  const autoPlay = useCallback(() => {
    if (autoPlayInterval > 0) {
      const timer = setInterval(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
      }, autoPlayInterval)
      return () => clearInterval(timer)
    }
  }, [autoPlayInterval, slides.length])

  const handleTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    setIsSwiping(true)
    setStartX(e.touches[0].clientX)
  }, [])

  const handleTouchMove = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      if (!isSwiping) return

      const currentX = e.touches[0].clientX
      const diff = startX - currentX

      if (Math.abs(diff) > 10) {
        e.preventDefault()
      }
    },
    [isSwiping, startX]
  )

  const handleTouchEnd = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      if (!isSwiping) return

      const endX = e.changedTouches[0].clientX
      const diff = startX - endX
      setIsSwiping(false)

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
        } else {
          setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
        }
      }
    },
    [isSwiping, startX, swipeThreshold, slides.length]
  )

  const goToSlide = useCallback((index: number) => {
    setCurrent(index)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [slides.length])

  useEffect(() => {
    return autoPlay()
  }, [autoPlay])

  const slideStyle = {
    transform: `translateX(-${current * 100}%)`,
    transition: isSwiping ? 'none' : 'transform 0.3s ease',
  }

  return (
    <div className={s.miniSlider}>
      <div
        className={s.slidesContainer}
        style={slideStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="Слайдер"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={s.slide}
            aria-hidden={index !== current}
            role="group"
            aria-label={`Слайд ${index + 1} из ${slides.length}`}
          >
            {slide}
          </div>
        ))}
      </div>

      {showDots && (
        <div className={s.dots} role="tablist">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${s.dot} ${index === current ? s.active : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Перейти к слайду ${index + 1}`}
              aria-selected={index === current}
              role="tab"
              type="button"
            />
          ))}
        </div>
      )}

      {slides.length > 1 && (
        <>
          <button
            className={s.navButton}
            onClick={prevSlide}
            aria-label="Предыдущий слайд"
          >
            ‹
          </button>
          <button
            className={s.navButton}
            onClick={nextSlide}
            aria-label="Следующий слайд"
          >
            ›
          </button>
        </>
      )}
    </div>
  )
}

export default Slider
