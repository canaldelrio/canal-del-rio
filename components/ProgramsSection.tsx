import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { programs } from '@/lib/data'

export default function ProgramsSection() {
  return (
    <section className="mt-8 border-t border-white/10 pt-5">
      {/* ENCABEZADO */}
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-6 w-1 rounded-full bg-sky-500" />

            <h2 className="text-xl font-black uppercase tracking-tight">
              Nuestros programas
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-400">
            Información, análisis y entretenimiento para nuestra comunidad
          </p>
        </div>

        <a
          href="#"
          className="hidden text-xs font-bold text-sky-400 transition hover:text-sky-300 sm:block"
        >
          Ver todos →
        </a>
      </div>

      {/* PROGRAMAS */}
      <div className="relative">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {programs.map(([name, img]) => (
            <div
              key={name}
              className="group relative h-36 overflow-hidden rounded-xl border border-white/10 bg-[#07182a] shadow-lg"
            >
              <Image
                src={img}
                alt={name}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />

              {/* CAPA OSCURA */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition duration-300 group-hover:from-black/90" />

              {/* LÍNEA SUPERIOR */}
              <div className="absolute left-0 top-0 h-1 w-full bg-sky-500/80" />

              {/* NOMBRE */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="text-lg font-black uppercase tracking-tight text-white drop-shadow-lg">
                  {name}
                </span>

                <div className="mt-1 h-0.5 w-8 bg-sky-500 transition-all duration-300 group-hover:w-14" />
              </div>
            </div>
          ))}
        </div>

        {/* FLECHA IZQUIERDA */}
        <button
          aria-label="Programa anterior"
          className="absolute -left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/10 bg-[#07182a] p-2 shadow-lg transition hover:bg-[#0b2945] sm:block"
        >
          <ChevronLeft size={20} />
        </button>

        {/* FLECHA DERECHA */}
        <button
          aria-label="Programa siguiente"
          className="absolute -right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/10 bg-[#07182a] p-2 shadow-lg transition hover:bg-[#0b2945] sm:block"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}