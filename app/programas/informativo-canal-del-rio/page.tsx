'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Play,
  Radio,
} from 'lucide-react'
import Header from '@/components/Header'
import { useEffect, useState } from 'react'

const emisiones = [
  {
    name: 'Primera Edición',
    time: '5:00 a. m. – 7:00 a. m.',
    description: 'Las noticias para comenzar el día bien informado.',
    start: 5,
    end: 7,
  },
  {
    name: 'Mediodía',
    time: '12:00 p. m. – 1:30 p. m.',
    description: 'La información más importante de la jornada.',
    start: 12,
    end: 13.5,
  },
  {
    name: 'Edición Central',
    time: '7:00 p. m. – 8:00 p. m.',
    description: 'El resumen de las noticias que marcaron el día.',
    start: 19,
    end: 20,
  },
]

export default function InformativoCanalDelRioPage() {
  const [hora, setHora] = useState(new Date())

  const [liveData, setLiveData] = useState<{
    live: boolean
    videoId: string | null
    title: string | null
  }>({
    live: false,
    videoId: null,
    title: null,
  })

  useEffect(() => {
    const actualizarHora = () => {
      setHora(new Date())
    }

    actualizarHora()

    const interval = setInterval(actualizarHora, 30000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const consultarLive = async () => {
      try {
        const response = await fetch('/api/youtube-video', {
          cache: 'no-store',
        })

        if (!response.ok) {
          setLiveData({
            live: false,
            videoId: null,
            title: null,
          })

          return
        }

        const data = await response.json()

        setLiveData({
          live: data.live === true,
          videoId: data.videoId ?? null,
          title: data.title ?? null,
        })
      } catch {
        setLiveData({
          live: false,
          videoId: null,
          title: null,
        })
      }
    }

    consultarLive()

    const interval = setInterval(consultarLive, 30000)

    return () => clearInterval(interval)
  }, [])

  const formatoColombia = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Bogota',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })

  const partes = formatoColombia.formatToParts(hora)

  const diaTexto =
    partes.find((parte) => parte.type === 'weekday')?.value ?? ''

  const horaTexto =
    partes.find((parte) => parte.type === 'hour')?.value ?? '0'

  const minutoTexto =
    partes.find((parte) => parte.type === 'minute')?.value ?? '0'

  const horaActual = Number(horaTexto)
  const minutoActual = Number(minutoTexto)

  const diasDeEmision = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const esDiaDeEmision = diasDeEmision.includes(diaTexto)

  const horaDecimal = horaActual + minutoActual / 60

  const transmisionEsInformativo =
    liveData.live &&
    Boolean(liveData.videoId) &&
    Boolean(
      liveData.title?.toLowerCase().includes('informativo')
    )

  const emisionActiva = esDiaDeEmision
    ? emisiones.find(
        (emision) =>
          horaDecimal >= emision.start &&
          horaDecimal < emision.end
      ) ?? null
    : null

  const estaRealmenteEnVivo =
    Boolean(emisionActiva) &&
    transmisionEsInformativo

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#020811] px-4 pb-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <section className="relative overflow-hidden rounded-b-xl border-x border-b border-white/10 bg-[#030b14] px-6 py-12 sm:px-10 lg:py-16">
            <div
              className={`absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl ${
                estaRealmenteEnVivo
                  ? 'bg-red-500/15'
                  : 'bg-sky-500/10'
              }`}
            />

            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="relative max-w-4xl">
              <Link
                href="/programas"
                className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white"
              >
                <ArrowLeft size={16} />
                Volver a programas
              </Link>

              <div className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${
                    estaRealmenteEnVivo
                      ? 'animate-pulse bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.8)]'
                      : 'bg-slate-500'
                  }`}
                />

                <span
                  className={`text-xs font-black uppercase tracking-[0.2em] ${
                    estaRealmenteEnVivo
                      ? 'text-red-400'
                      : 'text-sky-400'
                  }`}
                >
                  {estaRealmenteEnVivo
                    ? 'Estamos en vivo'
                    : 'Informativo Canal del Río'}
                </span>
              </div>

              <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Informativo
                <br />
                <span className="text-sky-400">
                  Canal del Río
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Noticias, actualidad y los acontecimientos más
                importantes de Colombia, nuestra región y el mundo.
              </p>

              {estaRealmenteEnVivo && emisionActiva && (
                <div className="mt-6 inline-flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
                  <Radio size={18} className="text-red-400" />

                  <div>
                    <div className="text-xs font-black uppercase tracking-widest text-red-400">
                      EN VIVO AHORA
                    </div>

                    <div className="mt-1 text-sm font-bold text-white">
                      {emisionActiva.name}
                    </div>
                  </div>
                </div>
              )}

              {estaRealmenteEnVivo && liveData.videoId && (
                <div className="mt-8 overflow-hidden rounded-xl border border-red-500/30 bg-black shadow-2xl">
                  <div className="aspect-video w-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${liveData.videoId}?autoplay=1&mute=1&rel=0`}
                      title="Informativo Canal del Río en vivo"
                      className="h-full w-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="mt-8">
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 rounded-full bg-sky-500" />

                <h2 className="text-xl font-black uppercase tracking-tight">
                  Emisiones
                </h2>
              </div>

              <p className="mt-1 text-xs text-slate-400">
                Lunes a sábado · Tres emisiones diarias
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {emisiones.map((emision, index) => {
                const activa =
                  estaRealmenteEnVivo &&
                  emisionActiva?.name === emision.name

                return (
                  <article
                    key={emision.name}
                    className={`group overflow-hidden rounded-xl border bg-[#07182a] transition-all duration-300 ${
                      activa
                        ? 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.12)]'
                        : 'border-white/10 hover:-translate-y-1 hover:border-sky-500/40'
                    }`}
                  >
                    <div
                      className={`relative flex h-40 items-center justify-center overflow-hidden ${
                        activa
                          ? 'bg-gradient-to-br from-[#3a1015] via-[#071f38] to-[#030b14]'
                          : 'bg-gradient-to-br from-[#0a315a] via-[#071f38] to-[#030b14]'
                      }`}
                    >
                      <div
                        className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl ${
                          activa
                            ? 'bg-red-500/15'
                            : 'bg-sky-500/10'
                        }`}
                      />

                      <div className="relative text-center">
                        {activa ? (
                          <>
                            <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-red-400">
                              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
                              EN VIVO
                            </div>

                            <Radio
                              size={42}
                              className="mx-auto mt-3 text-red-400"
                            />
                          </>
                        ) : (
                          <>
                            <span className="text-xs font-black uppercase tracking-widest text-sky-400">
                              Emisión{' '}
                              {String(index + 1).padStart(2, '0')}
                            </span>

                            <Clock3
                              size={42}
                              className="mx-auto mt-3 text-sky-400 transition duration-500 group-hover:scale-110"
                            />
                          </>
                        )}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3
                        className={`text-xl font-black transition ${
                          activa
                            ? 'text-red-400'
                            : 'text-white group-hover:text-sky-400'
                        }`}
                      >
                        {emision.name}
                      </h3>

                      <div
                        className={`mt-3 flex items-center gap-2 text-sm font-bold ${
                          activa
                            ? 'text-red-400'
                            : 'text-sky-400'
                        }`}
                      >
                        <Clock3 size={15} />
                        {emision.time}
                      </div>

                      <p className="mt-3 text-xs leading-5 text-slate-400">
                        {emision.description}
                      </p>

                      <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <CalendarDays size={14} />
                        Lunes a sábado
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="mt-8">
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 rounded-full bg-sky-500" />

                <h2 className="text-xl font-black uppercase tracking-tight">
                  Emisiones anteriores
                </h2>
              </div>

              <p className="mt-1 text-xs text-slate-400">
                Aquí podrás encontrar las emisiones anteriores del
                Informativo Canal del Río
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#07182a] px-6 py-14 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[#0b2945]">
                <Play size={26} className="text-sky-400" />
              </div>

              <h3 className="mt-5 text-xl font-black">
                Próximamente encontrarás nuestras emisiones
              </h3>

              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-400">
                Las emisiones que realicemos quedarán disponibles
                aquí para que puedas volver a verlas cuando quieras.
              </p>
            </div>
          </section>

          <section className="mt-8 overflow-hidden rounded-xl border border-red-500/20 bg-gradient-to-r from-[#260b10] to-[#07182a]">
            <div className="flex flex-col items-center justify-between gap-5 px-6 py-7 text-center sm:flex-row sm:px-8 sm:text-left">
              <div>
                <div className="flex items-center justify-center gap-2 sm:justify-start">
                  <span className="h-3 w-3 rounded-full bg-red-500" />

                  <span className="text-xs font-black uppercase tracking-widest text-red-400">
                    Señal del Informativo
                  </span>
                </div>

                <h2 className="mt-2 text-xl font-black text-white">
                  Mira Canal del Río en vivo
                </h2>

                <p className="mt-1 text-sm text-slate-300">
                  Cuando una emisión esté al aire, podrás verla
                  directamente desde nuestra señal.
                </p>
              </div>

              <Link
                href="/en-vivo"
                className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-black text-white transition hover:bg-red-500"
              >
                <Radio size={17} />
                Ver en vivo
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}