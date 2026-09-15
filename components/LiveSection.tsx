'use client'

import Image from 'next/image'
import { Play, Clock3 } from 'lucide-react'
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
    <section className="grid gap-0 lg:grid-cols-[1.18fr_1fr]">

      {/* EN VIVO */}
      <div className="relative overflow-hidden rounded-b-lg bg-[#030b14] p-7 lg:rounded-bl-lg lg:rounded-br-none">

        <div className="relative z-10 max-w-[55%]">

          <span className="flex items-center gap-2 text-sm font-bold">
            <i
              className={`h-3 w-3 rounded-full ${
                isLive ? 'animate-pulse bg-red-500' : 'bg-slate-500'
              }`}
            />

            {isLive ? 'EN VIVO' : 'SEÑAL EN VIVO'}
          </span>

          <h2 className="mt-3 text-2xl font-black">
            {isLive ? 'Estamos transmitiendo' : 'Señal en directo'}
          </h2>

          <p className="mt-2 text-sm text-slate-300">
            {isLive
              ? liveData?.title || 'Canal del Río está transmitiendo ahora.'
              : 'Conéctate con lo que pasa ahora en nuestra región y el mundo.'}
          </p>

          <a
            href="/en-vivo"
            className={`mt-5 flex w-fit items-center gap-2 rounded px-5 py-3 text-sm font-bold ${
              isLive
                ? 'bg-red-600 hover:bg-red-500'
                : 'bg-blue-600 hover:bg-blue-500'
            }`}
          >
            <Play size={15} fill="currentColor" />

            {isLive ? 'Ver EN VIVO' : 'Ver en vivo'}
          </a>

        </div>

        <Image
          src="/images/logo-canal-del-rio.png"
          alt="Canal del Río"
          width={420}
          height={280}
          className="absolute right-2 top-3 h-[250px] w-[46%] object-contain"
        />
      </div>

      {/* PRÓXIMO PROGRAMA */}
      <div className="grid grid-rows-2 rounded-b-lg border border-white/10 bg-[#030b14]">

        <div className="relative overflow-hidden p-7">

          <div className="relative z-10">

            <span className="text-xs font-bold text-sky-400">
              PRÓXIMO PROGRAMA
            </span>

            <h3 className="mt-3 text-xl font-black">
              Informativo
              <br />
              Canal del Río
            </h3>

            <p className="mt-3 flex items-center gap-2 text-xs">
              <Clock3 size={14} className="text-sky-400" />
              Hoy 7:00 PM
            </p>

            <button className="mt-3 rounded border border-sky-500/60 px-3 py-2 text-xs font-semibold">
              Ver programación
            </button>

          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg">

          <Image
            src={programs[0][1]}
            alt="Informativo Canal del Río"
            fill
            className="object-cover"
          />

        </div>
      </div>

    </section>
  )
}