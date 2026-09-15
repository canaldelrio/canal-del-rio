import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react'

type NewsItem = {
  id: number
  title: string
  slug: string
  category: string
  image: string
  date: string
  minutes: string
  author: string
  excerpt: string
  content: string[] | string
}

export default function NewsCard({
  item,
}: {
  item: NewsItem
}) {
  return (
    <Link
      href={`/noticias/${item.slug}`}
      className="group block h-full"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#07182a] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-[0_12px_35px_rgba(0,0,0,0.35)]">

        {/* IMAGEN */}
        <div className="relative h-44 overflow-hidden">
          <Image
            src={
              item.image ||
              'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85'
            }
            alt={item.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          />

          {/* DEGRADADO */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07182a] via-black/10 to-transparent" />

          {/* CATEGORÍA */}
          <div className="absolute bottom-3 left-4">
            <span className="rounded-md bg-sky-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-white shadow-lg">
              {item.category || 'Noticias'}
            </span>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="flex flex-1 flex-col p-4">

          <h3 className="line-clamp-3 text-[17px] font-black leading-6 text-white transition group-hover:text-sky-400">
            {item.title}
          </h3>

          {/* EXTRACTO */}
          {item.excerpt && (
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">
              {item.excerpt}
            </p>
          )}

          {/* FECHA Y TIEMPO */}
          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <CalendarDays
                  size={13}
                  className="text-sky-400"
                />
                {item.date}
              </span>

              <span className="flex items-center gap-1.5">
                <Clock3
                  size={13}
                  className="text-sky-400"
                />
                {item.minutes || '3 min'}
              </span>
            </div>

            {/* LEER NOTICIA */}
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wide text-sky-400 transition group-hover:text-sky-300">
                Leer noticia
              </span>

              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 transition-all duration-300 group-hover:border-sky-500/40 group-hover:bg-sky-500/10">
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </div>

        </div>
      </article>
    </Link>
  )
}