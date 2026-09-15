'use client'

import Image from 'next/image'
import { Play, Clock3, Radio } from 'lucide-react'
import { programs } from '@/lib/data'
import { useEffect, useState } from 'react'

type LiveData = {
  live: boolean
  videoId: string | null
  title: string | null
}

export default function LiveSection() {
  const [liveData, setLiveData] = useState<LiveData | null>(null)

  async function checkLive() {
    try {
      const response = await fetch('/api/youtube-live', {
        cache: 'no-store',
      })

      const data = await response.json()
      setLiveData(data)
    } catch (error) {
      console.error('Error comprobando transmisión:', error)
    }
  }

  useEffect(() => {
    checkLive()

    const interval = setInterval(() => {
      checkLive()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const isLive = liveData?.live

  return (
    <section className="grid gap-4 lg:grid-cols-[1.18fr_1fr]">
      {/* EN VIVO */}
      <div className="group relative min-h-[310px] overflow-hidden rounded-xl border border-white/10 bg-[#030b14]">
        {/* FONDO */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#07182a] via-[#030b14] to-black" />

        {/* BRILLO */}
        <div
          className={`absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl ${
            isLive ? 'bg-red-600/15' : 'bg-sky-500/10'
          }`}
        />

        {/* CONTENIDO */}
        <div className="relative z-10 flex min-h-[310px] flex-col justify-center p-7 sm:p-8 lg:max-w-[62%]">
          {/* ESTADO */}
          <div className="flex items-center gap-2">
            <span
              className={`h-3 w-3 rounded-full ${
                isLive
                  ? 'animate-pulse bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]'
                  : 'bg-slate-500'
              }`}
            />

            <span className="text-xs font-black tracking-widest">
              {isLive ? 'EN VIVO AHORA' : 'SEÑAL EN VIVO'}
            </span>
          </div>

          {/* TÍTULO */}
          <h2 className="mt-4 text-3xl font-black leading-tight">
            {isLive ? 'Estamos transmitiendo' : 'Canal del Río EN VIVO'}
          </h2>

          {/* DESCRIPCIÓN */}
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
            {isLive
              ? liveData?.title ||
                'Canal del Río está transmitiendo en este momento.'
              : 'Conéctate con la información, las noticias y los acontecimientos de nuestra región.'}
          </p>

          {/* BOTÓN */}
          <a
            href="/en-vivo"
            className={`mt-6 flex w-fit items-center gap-2 rounded-lg px-5 py-3 text-sm font-black transition ${
              isLive
                ? 'bg-red-600 shadow-lg shadow-red-900/20 hover:bg-red-500'
                : 'bg-sky-600 hover:bg-sky-500'
            }`}
          >
            {isLive ? (
              <Radio size={16} />
            ) : (
              <Play size={16} fill="currentColor" />
            )}

            {isLive ? 'VER EN VIVO' : 'VER SEÑAL'}
          </a>
        </div>

        {/* LOGO */}
        <Image
          src="/images/logo-canal-del-rio.png"
          alt="Canal del Río"
          width={420}
          height={280}
          className="absolute bottom-0 right-0 h-[230px] w-[42%] object-contain opacity-90 transition duration-500 group-hover:scale-105 sm:h-[260px]"
        />

        {/* ETIQUETA */}
        <div
          className={`absolute bottom-4 right-5 rounded border px-3 py-1 text-[10px] font-black tracking-widest ${
            isLive
              ? 'border-red-500/40 bg-red-500/10 text-red-400'
              : 'border-white/10 bg-black/30 text-slate-400'
          }`}
        >
          {isLive ? 'LIVE' : 'OFF AIR'}
        </div>
      </div>

      {/* PRÓXIMO PROGRAMA */}
      <div className="grid min-h-[310px] overflow-hidden rounded-xl border border-white/10 bg-[#030b14] sm:grid-cols-2 lg:grid-cols-1">
        {/* INFORMACIÓN */}
        <div className="relative flex flex-col justify-center p-7">
          <span className="text-xs font-black tracking-widest text-sky-400">
            PRÓXIMO PROGRAMA
          </span>

          <h3 className="mt-3 text-2xl font-black leading-tight">
            Informativo
            <br />
            Canal del Río
          </h3>

          <p className="mt-4 flex items-center gap-2 text-xs text-slate-300">
            <Clock3 size={15} className="text-sky-400" />
            Hoy 7:00 PM
          </p>

          <button className="mt-5 w-fit rounded-lg border border-sky-500/40 px-4 py-2 text-xs font-bold transition hover:border-sky-400 hover:bg-sky-500/10">
            Ver programación
          </button>
        </div>

        {/* IMAGEN */}
        <div className="relative min-h-[180px] overflow-hidden sm:min-h-0 lg:min-h-[150px]">
          <Image
            src={programs[0][1]}
            alt="Informativo Canal del Río"
            fill
            className="object-cover transition duration-500 hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  )
}