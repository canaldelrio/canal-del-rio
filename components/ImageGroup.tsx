'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function ImageGroup({
  images,
  title,
}: {
  images: string[]
  title: string
}) {
  const [current, setCurrent] = useState(0)

  if (!images.length) {
    return null
  }

  const anterior = () => {
    setCurrent((actual) =>
      actual > 0 ? actual - 1 : actual
    )
  }

  const siguiente = () => {
    setCurrent((actual) =>
      actual < images.length - 1 ? actual + 1 : actual
    )
  }

  return (
    <figure className="overflow-hidden rounded-xl border border-white/10 bg-black">
      <div className="relative flex min-h-[300px] items-center justify-center bg-black">
        <Image
          src={images[current]}
          alt={`${title} - página ${current + 1}`}
          width={1600}
          height={2200}
          className="h-auto max-h-[800px] w-full object-contain"
          sizes="(max-width: 768px) 100vw, 800px"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={anterior}
              disabled={current === 0}
              aria-label="Página anterior"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-lg transition hover:bg-sky-600 disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowLeft size={20} />
            </button>

            <button
              type="button"
              onClick={siguiente}
              disabled={current === images.length - 1}
              aria-label="Página siguiente"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-lg transition hover:bg-sky-600 disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowRight size={20} />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/75 px-3 py-1.5 text-[11px] font-bold text-white">
              Página {current + 1} de {images.length}
            </div>
          </>
        )}
      </div>
    </figure>
  )
}