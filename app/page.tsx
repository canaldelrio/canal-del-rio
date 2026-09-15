import {
  CloudSun,
  Facebook,
  Instagram,
  MessageCircle,
  Send,
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
            <div className="rounded-lg border border-white/10 bg-[#030b14] p-5">
              <SectionTitle title="Síguenos" />

              <p className="text-sm text-slate-300">
                Entérate primero de todo lo que pasa.
                <br />
                Síguenos en nuestras redes sociales.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Social
                  icon={<Facebook size={17} />}
                  text="Facebook"
                />

                <Social
                  icon={<Youtube size={17} />}
                  text="YouTube"
                />

                <Social
                  icon={<Instagram size={17} />}
                  text="Instagram"
                />

                <Social
                  icon={<span className="font-bold">♪</span>}
                  text="TikTok"
                />
              </div>
            </div>

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

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="mb-3 flex items-center gap-2 text-xl font-black uppercase">
      <span className="h-5 w-0.5 bg-sky-500" />
      {title}
    </h2>
  )
}

function Social({
  icon,
  text,
}: {
  icon: React.ReactNode
  text: string
}) {
  return (
    <div className="flex items-center gap-2 rounded bg-[#081b30] px-3 py-3 text-xs font-semibold">
      {icon}
      {text}
    </div>
  )
}