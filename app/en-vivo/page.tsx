'use client'

import Link from 'next/link'
import { ArrowLeft, Radio } from 'lucide-react'
import { useEffect, useState } from 'react'

type LiveData = {
  live: boolean
  videoId: string | null
  title: string | null
  error?: string
}

export default function EnVivo() {
  const [liveData, setLiveData] = useState<LiveData | null>(null)
  const [loading, setLoading] = useState(true)

  async function checkLive() {
    try {
      const response = await fetch('/api/youtube-live', {
        cache: 'no-store',
      })

      const data = await response.json()
      setLiveData(data)
    } catch (error) {
      console.error('Error comprobando transmisión:', error)
      setLiveData({
        live: false,
        videoId: null,
        title: null,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkLive()

    const interval = setInterval(() => {
      checkLive()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-[#020811] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px]">

        {/* VOLVER */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>

        {/* TÍTULO */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm font-bold text-red-400">
            <Radio size={18} />
            EN VIVO
          </div>

          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            Canal del Río — Señal en directo
          </h1>

          <p className="mt-2 text-slate-400">
            Mira nuestra señal en vivo desde cualquier dispositivo.
          </p>
        </div>

        {/* REPRODUCTOR */}
        <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Radio className="mx-auto mb-3 animate-pulse" size={36} />
                <p className="text-slate-300">
                  Comprobando señal en vivo...
                </p>
              </div>
            </div>
          )}

          {!loading && liveData?.live && liveData.videoId && (
            <iframe
              src={`https://www.youtube.com/embed/${liveData.videoId}?autoplay=1&rel=0`}
              className="absolute inset-0 h-full w-full"
              style={{ border: 'none' }}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              title="Canal del Río EN VIVO"
            />
          )}

          {!loading && !liveData?.live && (
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
              <div>
                <Radio className="mx-auto mb-4 text-slate-500" size={48} />

                <h2 className="text-2xl font-black">
                  No estamos transmitiendo en este momento
                </h2>

                <p className="mt-3 text-slate-400">
                  Cuando Canal del Río inicie una transmisión,
                  aparecerá automáticamente aquí.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* INFORMACIÓN */}
        <div className="mt-6 rounded-xl border border-white/10 bg-[#07182a] p-6">
          <h2 className="text-xl font-black">
            Canal del Río
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Información, noticias y programación de nuestra región.
            Conéctate con nuestra señal en directo.
          </p>

          {liveData?.live && liveData.title && (
            <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 p-4">
              <div className="mb-1 flex items-center gap-2 text-sm font-bold text-red-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                TRANSMISIÓN ACTIVA
              </div>

              <p className="font-semibold text-white">
                {liveData.title}
              </p>
            </div>
          )}
        </div>

      </div>
    </main>
  )
}