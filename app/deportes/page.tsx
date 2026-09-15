import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  Trophy,
} from 'lucide-react'
import Header from '@/components/Header'

const deportes = [
  {
    title: 'Fútbol',
    description:
      'Noticias, resultados, análisis y actualidad del fútbol.',
    icon: '⚽',
  },
  {
    title: 'Deporte regional',
    description:
      'El talento deportivo de nuestra región y sus protagonistas.',
    icon: '🏆',
  },
  {
    title: 'Polideportivo',
    description:
      'Toda la información de las diferentes disciplinas deportivas.',
    icon: '🏅',
  },
  {
    title: 'Resultados',
    description:
      'Resultados, calendarios y datos de las principales competencias.',
    icon: '📊',
  },
]

export default function DeportesPage() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-b-xl border-x border-b border-white/10 bg-[#030b14] px-6 py-12 sm:px-10 lg:py-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />

          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="relative max-w-4xl">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-sky-400" />

              <span className="text-xs font-black uppercase tracking-[0.2em] text-sky-400">
                Canal del Río Deportes
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Deportes
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Toda la actualidad deportiva, resultados, protagonistas y
              acontecimientos que hacen vibrar a nuestra comunidad.
            </p>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="h-6 w-1 rounded-full bg-sky-500" />

              <h2 className="text-xl font-black uppercase tracking-tight">
                Especialidades deportivas
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-400">
              Información deportiva con identidad regional
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {deportes.map((deporte, index) => (
              <article
                key={deporte.title}
                className="group overflow-hidden rounded-xl border border-white/10 bg-[#07182a] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-[0_12px_35px_rgba(0,0,0,0.35)]"
              >
                <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a315a] via-[#071f38] to-[#030b14]">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-500/10 blur-2xl transition duration-500 group-hover:bg-sky-500/20" />

                  <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-600/10 blur-2xl" />

                  <div className="relative text-7xl transition duration-500 group-hover:scale-110">
                    {deporte.icon}
                  </div>

                  <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-xs font-black text-white backdrop-blur-sm">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="absolute bottom-0 left-0 h-1 w-full bg-sky-500/70" />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-black text-white transition group-hover:text-sky-400">
                    {deporte.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    {deporte.description}
                  </p>

                  <Link
                    href="/noticias?categoria=Deportes"
                    className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-black uppercase tracking-wide text-sky-400"
                  >
                    Ver noticias

                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-sky-500/20 bg-sky-500/5 transition group-hover:bg-sky-500/10">
                      <ArrowRight size={14} />
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-xl border border-sky-500/20 bg-gradient-to-r from-[#08274a] to-[#06162b]">
          <div className="flex flex-col items-center justify-between gap-5 px-6 py-7 text-center sm:flex-row sm:px-8 sm:text-left">
            <div>
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <CalendarDays size={18} className="text-sky-400" />

                <span className="text-xs font-black uppercase tracking-widest text-sky-400">
                  Actualidad deportiva
                </span>
              </div>

              <h2 className="mt-2 text-xl font-black text-white">
                Más deportes, más emoción, siempre contigo
              </h2>

              <p className="mt-1 text-sm text-slate-300">
                Sigue toda la información deportiva de Canal del Río.
              </p>
            </div>

            <Link
              href="/noticias?categoria=Deportes"
              className="flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-3 text-sm font-black text-white transition hover:bg-sky-500"
            >
              Ver noticias
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}