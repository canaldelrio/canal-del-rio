import {
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import LiveSection from '@/components/LiveSection'
import NewsSection from '@/components/NewsSection'
import ProgramsSection from '@/components/ProgramsSection'
import SendNewsSection from '@/components/SendNewsSection'
import WeatherSection from '@/components/WeatherSection'

export default function Home() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-[1440px] px-4 pb-12 sm:px-6 lg:px-8">
        <Hero />

        <LiveSection />

        <NewsSection />

        <section className="mt-5 lg:grid lg:grid-cols-[1fr_380px] lg:gap-7">
          <div>
            <ProgramsSection />
          </div>

          <aside className="mt-7 space-y-3 lg:mt-0">

            {/* REDES SOCIALES */}
            <section className="overflow-hidden rounded-xl border border-white/10 bg-[#030b14]">
              <div className="border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-1 rounded-full bg-sky-500" />
                  <h2 className="text-xl font-black uppercase tracking-tight">
                    Síguenos
                  </h2>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  Entérate primero de todo lo que pasa
                </p>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-2 gap-3">

                  <a
                    href="https://www.facebook.com/CRIO2023"
                    className="group flex items-center gap-3 rounded-lg border border-white/10 bg-[#081b30] p-3 transition hover:border-sky-500/40 hover:bg-[#0b2945]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/15 text-blue-400">
                      <Facebook size={18} />
                    </div>

                    <div>
                      <div className="text-xs font-bold text-white">
                        Facebook
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Canal del Río
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://www.youtube.com/@CANALDELRIO2026"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg border border-white/10 bg-[#081b30] p-3 transition hover:border-red-500/40 hover:bg-[#0b2945]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600/15 text-red-400">
                      <Youtube size={18} />
                    </div>

                    <div>
                      <div className="text-xs font-bold text-white">
                        YouTube
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Canal del Río
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://www.instagram.com/canaldelrio/"
                    className="group flex items-center gap-3 rounded-lg border border-white/10 bg-[#081b30] p-3 transition hover:border-pink-500/40 hover:bg-[#0b2945]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-600/15 text-pink-400">
                      <Instagram size={18} />
                    </div>

                    <div>
                      <div className="text-xs font-bold text-white">
                        Instagram
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Canal del Río
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://www.tiktok.com/@canal.del.rio?is_from_webapp=1&sender_device=pc"
                    className="group flex items-center gap-3 rounded-lg border border-white/10 bg-[#081b30] p-3 transition hover:border-cyan-500/40 hover:bg-[#0b2945]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400">
                      <span className="text-lg font-black">♪</span>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-white">
                        TikTok
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Canal del Río
                      </div>
                    </div>
                  </a>

                </div>

                <div className="mt-4 rounded-lg border border-sky-500/10 bg-sky-500/[0.03] px-4 py-3 text-center">
                  <p className="text-[11px] text-slate-400">
                    Información que conecta con la gente
                  </p>
                </div>
              </div>
            </section>

            {/* CLIMA */}
            <WeatherSection />

            {/* ENVIAR NOTICIA */}
            <SendNewsSection />

          </aside>
        </section>
      </main>
    </>
  )
}