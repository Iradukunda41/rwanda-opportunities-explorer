import ImageSlider from './ImageSlider'

export default function Banner({ total, savedCount }) {
  const linkBase =
    'rounded-full px-6 py-3 text-sm font-semibold transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-700'

  return (
    <header className="relative overflow-hidden bg-linear-to-br from-emerald-800 via-emerald-600 to-teal-500 text-white">
      <div
        aria-hidden="true"
        className="h-1.5 bg-linear-to-r from-sky-500 via-yellow-400 to-green-500"
      />

      {/* Sun: same size and place as before, top right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-10 top-12 h-40 w-40 rounded-full bg-amber-300 opacity-80 blur-2xl sm:h-56 sm:w-56"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-16 top-16 h-24 w-24 rounded-full bg-amber-200 sm:h-32 sm:w-32"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-white/10"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-36 pt-12 sm:pb-44 sm:pt-16">
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          {/* Left: text, buttons and stats */}
          <div>
            <p className="inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-50 backdrop-blur">
              Discover · Learn · Connect
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              Rwanda <span className="text-amber-300">Opportunities</span> Explorer
            </h1>

            <p className="mt-4 max-w-xl text-base text-emerald-50 sm:text-lg">
              Find workshops, career events, short courses and community activities across
              Rwanda. Sample content: all events are fictional.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#opportunities"
                className={`${linkBase} bg-amber-400 text-emerald-950 shadow-lift hover:bg-amber-300`}
              >
                Explore opportunities
              </a>
              <a
                href="#add-heading"
                className={`${linkBase} border border-white/60 text-white hover:bg-white/15`}
              >
                Add an opportunity
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap gap-3 text-sm font-medium" aria-label="Quick stats">
              <li className="rounded-full bg-white/15 px-4 py-1.5 backdrop-blur">
                {`📋 ${total} opportunities`}
              </li>
              <li
                className="rounded-full bg-white/15 px-4 py-1.5 backdrop-blur"
                aria-live="polite"
              >
                {`🔖 Saved: ${savedCount}`}
              </li>
            </ul>
          </div>

          {/* Right: slider, starts below the sun on wide screens */}
          <div className="md:pt-44">
            <ImageSlider />
          </div>
        </div>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-24 w-full sm:h-36"
      >
        <path
          fill="#064e3b"
          opacity="0.35"
          d="M0,96 C120,40 240,40 360,80 C480,120 600,60 720,50 C840,40 960,100 1080,90 C1200,80 1320,40 1440,70 L1440,160 L0,160 Z"
        />
        <path
          fill="#047857"
          opacity="0.5"
          d="M0,118 C140,70 280,70 420,100 C560,130 700,90 840,84 C980,78 1120,120 1260,108 C1340,101 1400,90 1440,96 L1440,160 L0,160 Z"
        />
        <path
          fill="#f8fafc"
          d="M0,138 C160,106 320,112 480,128 C640,144 800,120 960,112 C1120,104 1280,124 1440,134 L1440,160 L0,160 Z"
        />
      </svg>
    </header>
  )
}