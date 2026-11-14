import { useEffect, useState } from 'react'

const slides = [
  {
    id: 'workshop',
    src: '/images/workshop.jpg',
    label: '🛠️ Workshops',
    alt: 'Young people learning together at a workshop with laptops',
  },
  {
    id: 'learning',
    src: '/images/course.jpg',
    label: '📚 Short courses',
    alt: 'Students learning together in a classroom',
  },
  {
    id: 'career',
    src: '/images/career.jpg',
    label: '💼 Career events',
    alt: 'Young professionals meeting employers at a career fair',
  },
  {
    id: 'community',
    src: '/images/community.jpg',
    label: '🤝 Community activities',
    alt: 'Volunteers working together in the community',
  },
]

const SLIDE_DELAY = 4000 // milliseconds between automatic changes

export default function ImageSlider() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  // Wrap around: after the last photo comes the first, and the other way round
  const goPrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length)

  // Automatic sliding
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (paused || reduceMotion) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, SLIDE_DELAY)

    // Cleanup: stop the timer when paused changes or the component is removed
    return () => clearInterval(timer)
  }, [paused])

  const arrowClass =
    'absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg font-bold text-emerald-800 shadow-soft transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500'

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Types of opportunities on the website"
      className="relative mx-auto w-full max-w-lg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div aria-hidden="true" className="absolute -inset-3 rotate-3 rounded-3xl bg-amber-300/40" />

      <div className="relative h-64 overflow-hidden rounded-3xl border-4 border-white/40 bg-emerald-900/40 shadow-lift sm:h-72 md:h-72">
        {/* The track moves left; each photo is exactly as wide as the box */}
        <ul
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <li
              key={slide.id}
              aria-hidden={index !== current}
              className="relative h-full w-full shrink-0"
            >
              <img
                src={slide.src}
                alt={slide.alt}
                width="800"
                height="600"
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-emerald-800 shadow-soft">
                {slide.label}
              </span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous photo"
          className={`${arrowClass} left-3`}
        >
          ‹
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next photo"
          className={`${arrowClass} right-3`}
        >
          ›
        </button>
      </div>

      <div className="relative mt-5 flex items-center justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Show photo ${index + 1}: ${slide.label}`}
            aria-current={index === current}
            className={`h-2.5 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              index === current ? 'w-8 bg-amber-300' : 'w-2.5 bg-white/60 hover:bg-white'
            }`}
          />
        ))}
        <p className="ml-3 text-xs font-medium text-emerald-50" aria-live="polite">
          {`${current + 1} / ${slides.length}`}
        </p>
      </div>
    </section>
  )
}