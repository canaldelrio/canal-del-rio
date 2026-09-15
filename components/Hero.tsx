import Image from 'next/image'
import { CalendarDays, Clock3 } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative mt-0 min-h-[410px] overflow-hidden rounded-b-lg">
      <Image
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1500&q=85"
        alt="Río al atardecer"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="hero-gradient absolute inset-0" />

      <div className="absolute bottom-7 left-7 max-w-[700px] sm:left-8">
        <span className="rounded bg-blue-600 px-3 py-1 text-xs font-bold">
          ÚLTIMA HORA
        </span>

        <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-[38px]">
          Avanza plan de recuperación del río en la región
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-slate-200 sm:text-base">
          Las autoridades y la comunidad trabajan juntas por un río más limpio
          y un futuro sostenible para todos.
        </p>

        <div className="mt-4 flex gap-5 text-xs text-slate-200">
          <span className="flex items-center gap-1">
            <CalendarDays size={15} />
            26 de agosto, 2026
          </span>

          <span className="flex items-center gap-1">
            <Clock3 size={15} />
            2 min de lectura
          </span>
        </div>
      </div>
    </section>
  )
}