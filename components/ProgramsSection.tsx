import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { programs } from '@/lib/data'

export default function ProgramsSection() {
  return (
    <section className="mt-8 border-t border-white/10 pt-4">
      <div className="flex items-center justify-between">
        <SectionTitle title="Nuestros programas" />

        <a className="cursor-pointer text-sm text-sky-400 hover:text-sky-300">
          Ver todos los programas
        </a>
      </div>

      <div className="relative">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {programs.map(([name, img]) => (
            <div
              key={name}
              className="group relative h-32 overflow-hidden rounded-lg"
            >
              <Image
                src={img}
                alt={name}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/50" />

              <span className="absolute inset-0 flex items-center justify-center px-4 text-center text-2xl font-black italic">
                {name}
              </span>
            </div>
          ))}
        </div>

        <button
          aria-label="Programa anterior"
          className="absolute -left-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-[#07182a] p-1 hover:bg-[#0b2945] sm:block"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          aria-label="Programa siguiente"
          className="absolute -right-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-[#07182a] p-1 hover:bg-[#0b2945] sm:block"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
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