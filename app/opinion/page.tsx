import Link from 'next/link'
import { ArrowRight, MessageSquareQuote, PenLine } from 'lucide-react'
import Header from '@/components/Header'

export default function OpinionPage() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-b-xl border-x border-b border-white/10 bg-[#030b14] px-6 py-12 sm:px-10 lg:py-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="relative max-w-4xl">
            <div className="flex items-center gap-2">
              <MessageSquareQuote size={18} className="text-sky-400" />

              <span className="text-xs font-black uppercase tracking-[0.2em] text-sky-400">
                Canal del Río
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Opinión
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Análisis, reflexiones y diferentes puntos de vista sobre los
              temas que marcan la actualidad.
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-7 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 rounded-full bg-sky-500" />

                <h2 className="text-xl font-black uppercase tracking-tight">
                  Análisis y opinión
                </h2>
              </div>

              <p className="mt-1 text-xs text-slate-400">
                Ideas, análisis y perspectivas sobre nuestra actualidad
              </p>
            </div>

            <div className="space-y-5">
              <article className="group overflow-hidden rounded-xl border border-white/10 bg-[#07182a] p-6 transition-all duration-300 hover:border-sky-500/40">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                    <PenLine size={22} />
                  </div>

                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-sky-400">
                      Columna de opinión
                    </span>

                    <h3 className="mt-2 text-2xl font-black text-white transition group-hover:text-sky-400">
                      Las voces que ayudan a entender nuestra realidad
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      Un espacio para analizar los acontecimientos que
                      impactan a nuestras comunidades y generar conversación
                      alrededor de los temas de interés público.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs text-slate-500">
                    Canal del Río
                  </span>

                  <span className="flex items-center gap-2 text-xs font-black text-sky-400">
                    Leer más
                    <ArrowRight size={14} />
                  </span>
                </div>
              </article>

              <article className="group overflow-hidden rounded-xl border border-white/10 bg-[#07182a] p-6 transition-all duration-300 hover:border-sky-500/40">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                    <MessageSquareQuote size={22} />
                  </div>

                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-sky-400">
                      Punto de vista
                    </span>

                    <h3 className="mt-2 text-2xl font-black text-white transition group-hover:text-sky-400">
                      La actualidad también se analiza
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      Opiniones y perspectivas sobre los acontecimientos
                      nacionales, internacionales, regionales y locales.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs text-slate-500">
                    Canal del Río
                  </span>

                  <span className="flex items-center gap-2 text-xs font-black text-sky-400">
                    Leer más
                    <ArrowRight size={14} />
                  </span>
                </div>
              </article>
            </div>
          </div>

          <aside className="h-fit overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#08274a] via-[#07182a] to-[#030b14]">
            <div className="p-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-sky-400">
                Canal del Río
              </span>

              <h2 className="mt-3 text-2xl font-black text-white">
                Tu opinión también cuenta
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                La opinión abre espacios para el análisis, el diálogo y la
                construcción de ideas alrededor de nuestra realidad.
              </p>

              <Link
                href="/contacto"
                className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 py-3 text-sm font-black text-white transition hover:bg-sky-500"
              >
                Contáctanos
                <ArrowRight size={16} />
              </Link>
            </div>
          </aside>
        </section>
      </main>
    </>
  )
}