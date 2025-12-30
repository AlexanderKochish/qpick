'use client'
import { Box, Button, Container, Typography, IconButton } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { useState, useEffect, useCallback } from 'react'
import s from './banner.module.css'
import { useRouter } from 'next/navigation'

const slides = [
  {
    id: 1,
    title: 'The latest gadgets',
    subtitle: 'Discover the world of technology with the best devices',
    buttonText: 'View all products',
    image: '/header.avif',
    filter: 'brightness(100%) contrast(100%) saturate(200%) hue-rotate(308deg)',
    overlay: 'rgba(120, 119, 198, 0.3)',
  },
  {
    id: 2,
    title: 'Discounts up to 50%',
    subtitle: 'This week only, special offers on equipment',
    buttonText: 'View promotions',
    image: '/header.avif',
    filter: 'brightness(100%) contrast(110%) saturate(180%) hue-rotate(180deg)',
    overlay: 'rgba(59, 130, 246, 0.3)',
  },
  {
    id: 3,
    title: 'Free shipping',
    subtitle: 'Free delivery throughout the city for orders over 5,000€',
    buttonText: 'Find out the terms and conditions',
    image: '/header.avif',
    filter: 'brightness(100%) contrast(120%) saturate(160%) hue-rotate(90deg)',
    overlay: 'rgba(34, 197, 94, 0.3)',
  },
]

const Banner = () => {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [])

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      goToNextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [currentSlide, isAutoPlaying, goToNextSlide])

  const handleMouseEnter = () => {
    setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsAutoPlaying(true)
  }

  return (
    <Box
      className={s.hero}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={s.slidesContainer}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${s.slide} ${index === currentSlide ? s.active : ''}`}
            style={{
              backgroundImage: `url(${slide.image})`,
              filter: slide.filter,
              opacity: index === currentSlide ? 1 : 0,
              transform: `translateX(${100 * (index - currentSlide)}%)`,
            }}
          />
        ))}

        <div
          className={s.overlay}
          style={{
            background: `radial-gradient(
              circle at 20% 80%,
              ${slides[currentSlide].overlay} 0%,
              transparent 50%
            )`,
          }}
        />
      </div>

      <Container maxWidth="lg">
        <Box className={s.heroContent}>
          <div className={s.textContainer}>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`${s.textSlide} ${index === currentSlide ? s.textActive : ''}`}
              >
                <Typography variant="h2" className={s.heroTitle}>
                  {slide.title}
                </Typography>
                <Typography variant="h5" className={s.heroSubtitle}>
                  {slide.subtitle}
                </Typography>
              </div>
            ))}
          </div>

          <Button
            variant="contained"
            size="large"
            className={s.heroButton}
            onClick={() => router.push('/products')}
          >
            {slides[currentSlide].buttonText}
          </Button>

          {slides.length > 1 && (
            <>
              <IconButton
                className={s.navButton}
                onClick={goToPrevSlide}
                sx={{ left: 16 }}
                aria-label="Предыдущий слайд"
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                className={s.navButton}
                onClick={goToNextSlide}
                sx={{ right: 16 }}
                aria-label="Следующий слайд"
              >
                <ChevronRight />
              </IconButton>
            </>
          )}

          {slides.length > 1 && (
            <div className={s.dots}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`${s.dot} ${index === currentSlide ? s.activeDot : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Перейти к слайду ${index + 1}`}
                />
              ))}
            </div>
          )}

          {slides.length > 1 && (
            <div className={s.progressBar}>
              <div
                className={s.progress}
                style={{
                  animationDuration: '5s',
                  animationPlayState: isAutoPlaying ? 'running' : 'paused',
                }}
              />
            </div>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default Banner
