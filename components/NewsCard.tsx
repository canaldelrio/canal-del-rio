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
      className="group block"
    >
      <article className="overflow-hidden rounded-lg border border-white/10 bg-[#07182a] shadow-glow transition duration-300 hover:-translate-y-1 hover:border-sky-500/40">

        {/* IMAGEN */}
        <div className="relative h-36">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 25vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#07182a] via-transparent to-transparent" />

          <span className="absolute bottom-0 left-4 translate-y-1/2 rounded bg-blue-600 px-2 py-1 text-[11px] font-bold">
            {item.category}
          </span>
        </div>

        {/* CONTENIDO */}
        <div className="p-4 pt-6">

          <h3 className="min-h-[74px] text-lg font-bold leading-6 transition group-hover:text-sky-400">
            {item.title}
          </h3>

          {/* FECHA Y TIEMPO */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-300">

            <span className="flex items-center gap-1">
              <CalendarDays size={14} />
              {item.date}
            </span>

            <span className="flex items-center gap-1">
              <Clock3 size={14} />
              {item.minutes}
            </span>

          </div>

          {/* LEER NOTICIA */}
          <div className="mt-4 border-t border-white/10 pt-3">

            <span className="flex items-center gap-2 text-sm font-bold text-sky-400 transition group-hover:text-sky-300">
              Leer noticia

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>

          </div>

        </div>

      </article>
    </Link>
  )
}