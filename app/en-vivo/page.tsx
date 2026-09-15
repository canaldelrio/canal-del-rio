import Link from 'next/link'
import { ArrowLeft, Radio } from 'lucide-react'

export default function EnVivo() {
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
  <iframe
    src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FCRIO2023%2Fvideos%2F38098200656491601&show_text=false&autoplay=false"
    className="absolute inset-0 h-full w-full"
    style={{ border: 'none', overflow: 'hidden' }}
    scrolling="no"
    frameBorder="0"
    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    allowFullScreen
  />
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
        </div>

      </div>
    </main>
  )
}