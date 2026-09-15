import Link from 'next/link'
import {
  ArrowRight,
  Clock3,
  Radio,
  Trophy,
  Mic2,
  Landmark,
} from 'lucide-react'
import Header from '@/components/Header'

const programas = [
  {
    name: 'Informativo Canal del Río',
    slug: 'informativo-canal-del-rio',
    description:
      'Las noticias más importantes de Colombia, nuestra región y el mundo, con información en vivo durante toda la jornada.',
    icon: Radio,
    schedule: 'Lunes a sábado · 5:00 a. m. · 12:00 p. m. · 7:00 p. m.',
    status: 'EN VIVO Y PROGRAMADO',
  },
  {
    name: 'Deportes del Río',
    slug: 'deportes-del-rio',
    description:
      'Partidos, transmisiones especiales, resultados y toda la emoción deportiva de nuestra comunidad.',
    icon: Trophy,
    schedule: 'Programación especial',
    status: 'SEGÚN PROGRAMACIÓN',
  },
  {
    name: 'Voces del Río',
    slug: 'voces-del-rio',
    description:
      'Un espacio para escuchar historias, protagonistas y las voces que hacen parte de nuestra comunidad.',
    icon: Mic2,
    schedule: 'Próximamente',
    status: 'PRÓXIMAMENTE',
  },
  {
    name: 'Cultura y Tradición',
    slug: 'cultura-y-tradicion',
    description:
      'Historias, costumbres, personajes y tradiciones que hacen parte de nuestra identidad.',
    icon: Landmark,
    schedule: 'Programación especial',
    status: 'SEGÚN PROGRAMACIÓN',
  },
]

export default function ProgramasPage() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-b-xl border-x border-b border-white/10 bg-[#030b14] px-6 py-12 sm:px-10 lg:py-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="relative max-w-4xl">
            <div className="flex items-center gap-2">
              <Radio size={18} className="text-sky-400" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-sky-400">
                Canal del Río
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Nuestros programas
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Información, noticias, deportes, cultura y las historias de
              nuestra comunidad, en espacios creados para cada audiencia.
            </p>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="h-6 w-1 rounded-full bg-sky-500" />
              <h2 className="text-xl font-black uppercase tracking-tight">
                Programación
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-400">
              Conoce cada espacio de Canal del Río
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {programas.map((programa, index) => {
              const Icon = programa.icon

              return (
                <Link
                  key={programa.slug}
                  href={`/programas/${programa.slug}`}
                  className="group block h-full"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#07182a] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-[0_12px_35px_rgba(0,0,0,0.35)]">
                    <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a315a] via-[#071f38] to-[#030b14]">
                      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-500/10 blur-2xl transition duration-500 group-hover:bg-sky-500/20" />

                      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-600/10 blur-2xl" />

                      <Icon
                        size={72}
                        strokeWidth={1.5}
                        className="relative text-sky-400 transition duration-500 group-hover:scale-110 group-hover:text-sky-300"
                      />

                      <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-xs font-black text-white backdrop-blur-sm">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      <div className="absolute bottom-0 left-0 h-1 w-full bg-sky-500/70" />
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-3">
                        <span
                          className={`rounded-md px-2.5 py-1 text-[9px] font-black uppercase tracking-wide ${
                            programa.status === 'PRÓXIMAMENTE'
                              ? 'bg-slate-600/30 text-slate-400'
                              : 'bg-sky-600 text-white'
                          }`}
                        >
                          {programa.status}
                        </span>
                      </div>

                      <h3 className="text-xl font-black leading-tight text-white transition group-hover:text-sky-400">
                        {programa.name}
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-slate-400">
                        {programa.description}
                      </p>

                      <div className="mt-auto pt-5">
                        <div className="flex items-start gap-2 border-t border-white/10 pt-4 text-xs text-slate-400">
                          <Clock3
                            size={14}
                            className="mt-0.5 shrink-0 text-sky-400"
                          />
                          <span>{programa.schedule}</span>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-xs font-black uppercase tracking-wide text-sky-400">
                          <span>Ver programa</span>

                          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-sky-500/20 bg-sky-500/5 transition group-hover:bg-sky-500/10">
                            <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-xl border border-sky-500/20 bg-gradient-to-r from-[#08274a] to-[#06162b]">
          <div className="flex flex-col items-center justify-between gap-5 px-6 py-7 text-center sm:flex-row sm:px-8 sm:text-left">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-sky-400">
                Canal del Río
              </span>

              <h2 className="mt-2 text-xl font-black text-white">
                Cada programa, una historia diferente
              </h2>

              <p className="mt-1 text-sm text-slate-300">
                Consulta la programación, transmisiones y episodios de cada
                espacio.
              </p>
            </div>

            <Link
              href="/en-vivo"
              className="flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-3 text-sm font-black text-white transition hover:bg-sky-500"
            >
              <Radio size={17} />
              Ver señal general
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}