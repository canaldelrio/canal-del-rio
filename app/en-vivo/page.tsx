'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  Clock3,
  Play,
  Radio,
  Youtube,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'

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

  const isLive = liveData?.live && liveData.videoId

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#020811] px-4 pb-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <section className="relative overflow-hidden rounded-b-xl border-x border-b border-white/10 bg-[#030b14] px-6 py-12 sm:px-10 lg:py-16">
            <div
              className={`absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl ${
                isLive ? 'bg-red-500/15' : 'bg-sky-500/10'
              }`}
            />

            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="relative max-w-4xl">
              <Link
                href="/"
                className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white"
              >
                <ArrowLeft size={16} />
                Volver al inicio
              </Link>

              <div className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${
                    isLive
                      ? 'animate-pulse bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.8)]'
                      : 'bg-slate-500'
                  }`}
                />

                <span
                  className={`text-xs font-black uppercase tracking-[0.2em] ${
                    isLive ? 'text-red-400' : 'text-slate-400'
                  }`}
                >
                  {isLive ? 'Estamos en vivo' : 'Señal en vivo'}
                </span>
              </div>

              <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Canal del Río
                <br />
                <span className="text-sky-400">EN VIVO</span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                {isLive
                  ? liveData?.title ||
                    'Canal del Río está transmitiendo en este momento.'
                  : 'Conéctate con nuestra señal y acompaña la información, las noticias y los acontecimientos de nuestra región.'}
              </p>
            </div>
          </section>

          <section className="mt-8 grid gap-7 lg:grid-cols-[1fr_340px]">
            <div>
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Radio
                        className="mx-auto mb-4 animate-pulse text-sky-400"
                        size={42}
                      />

                      <p className="text-sm font-semibold text-slate-300">
                        Comprobando señal en vivo...
                      </p>
                    </div>
                  </div>
                )}

                {!loading && isLive && (
                  <iframe
                    src={`https://www.youtube.com/embed/${liveData.videoId}?autoplay=1&rel=0`}
                    className="absolute inset-0 h-full w-full"
                    style={{ border: 'none' }}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    title="Canal del Río EN VIVO"
                  />
                )}

                {!loading && !isLive && (
                  <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                    <div>
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-[#07182a]">
                        <Radio
                          size={36}
                          className="text-slate-500"
                        />
                      </div>

                      <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                        No estamos transmitiendo
                      </h2>

                      <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400">
                        Cuando Canal del Río inicie una transmisión, el
                        reproductor se activará automáticamente.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {isLive && liveData?.title && (
                <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/[0.05] p-5">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-400">
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
                    Transmisión activa
                  </div>

                  <h2 className="mt-2 text-lg font-black text-white">
                    {liveData.title}
                  </h2>
                </div>
              )}
            </div>

            <aside className="space-y-4">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#07182a]">
                <div className="border-b border-white/10 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-1 rounded-full bg-sky-500" />

                    <h2 className="text-xl font-black uppercase tracking-tight">
                      Nuestra señal
                    </h2>
                  </div>

                  <p className="mt-1 text-xs text-slate-400">
                    Canal del Río en directo
                  </p>
                </div>

                <div className="relative h-40 overflow-hidden">
                  <Image
                    src="/images/logo-canal-del-rio.png"
                    alt="Canal del Río"
                    fill
                    className="object-contain p-6"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#07182a] via-transparent to-transparent" />
                </div>

                <div className="p-5">
                  <p className="text-sm leading-6 text-slate-400">
                    Información que conecta con la gente. Sigue nuestra
                    señal desde cualquier dispositivo.
                  </p>

                  <a
                    href="https://www.youtube.com/@CANALDELRIO2026"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-xs font-black text-red-400 transition hover:bg-red-500/10"
                  >
                    <Youtube size={16} />
                    Visitar YouTube
                  </a>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#07182a] p-5">
                <div className="flex items-center gap-2">
                  <Clock3 size={17} className="text-sky-400" />

                  <h2 className="text-sm font-black uppercase tracking-wide">
                    Programación
                  </h2>
                </div>

                <p className="mt-3 text-xs leading-5 text-slate-400">
                  Consulta nuestros programas y contenidos para conocer lo
                  que viene en Canal del Río.
                </p>

                <Link
                  href="/programas"
                  className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-sky-500/30 px-4 py-2.5 text-xs font-black text-sky-400 transition hover:bg-sky-500/10"
                >
                  <Play size={14} fill="currentColor" />
                  Ver programas
                </Link>
              </div>
            </aside>
          </section>

          <section className="mt-8 overflow-hidden rounded-xl border border-sky-500/20 bg-gradient-to-r from-[#08274a] to-[#06162b]">
            <div className="flex flex-col items-center justify-between gap-5 px-6 py-7 text-center sm:flex-row sm:text-left sm:px-8">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-sky-400">
                  Canal del Río
                </span>

                <h2 className="mt-2 text-xl font-black text-white">
                  Información que conecta con la gente
                </h2>

                <p className="mt-1 text-sm text-slate-300">
                  Noticias, actualidad y acontecimientos de nuestra región.
                </p>
              </div>

              <Link
                href="/noticias"
                className="flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-3 text-sm font-black text-white transition hover:bg-sky-500"
              >
                Ver noticias
                <ArrowLeft size={16} className="rotate-180" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}