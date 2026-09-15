'use client'

import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

type NewsItem = {
  id: number
  title: string
  slug: string
  category: string
  image: string
  excerpt: string
  author: string
  minutes: string
  published: boolean
  created_at: string
}

type NoticiasAdminProps = {
  news: NewsItem[]
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function NoticiasAdmin({
  news: initialNews,
}: NoticiasAdminProps) {
  const [news, setNews] = useState<NewsItem[]>(initialNews)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  async function eliminarNoticia(id: number) {
    const confirmar = window.confirm(
      '¿Seguro que quieres eliminar esta noticia? Esta acción no se puede deshacer.'
    )

    if (!confirmar) return

    setDeletingId(id)

    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id)

    if (error) {
      alert(`No se pudo eliminar la noticia: ${error.message}`)
      setDeletingId(null)
      return
    }

    setNews((currentNews) =>
      currentNews.filter((item) => item.id !== id)
    )

    setDeletingId(null)
  }

  async function cambiarPublicacion(
    id: number,
    published: boolean
  ) {
    const { error } = await supabase
      .from('news')
      .update({ published: !published })
      .eq('id', id)

    if (error) {
      alert(`No se pudo actualizar la noticia: ${error.message}`)
      return
    }

    setNews((currentNews) =>
      currentNews.map((item) =>
        item.id === id
          ? { ...item, published: !published }
          : item
      )
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#030b14]">

      {/* ENCABEZADO */}
      <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black uppercase text-white">
            Noticias
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {news.length} noticia{news.length === 1 ? '' : 's'} registrada
            {news.length === 1 ? '' : 's'}
          </p>
        </div>

        <Link
          href="/admin/noticias/nueva"
          className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-500"
        >
          + Nueva noticia
        </Link>
      </div>

      {/* LISTADO */}
      <div className="divide-y divide-white/10">

        {news.length === 0 ? (

          <div className="p-10 text-center">
            <p className="text-slate-400">
              No hay noticias registradas.
            </p>
          </div>

        ) : (

          news.map((item: NewsItem) => (

            <div
              key={item.id}
              className="flex flex-col gap-4 p-5 transition hover:bg-white/[0.02] lg:flex-row lg:items-center lg:justify-between"
            >

              {/* INFORMACIÓN */}
              <div className="min-w-0 flex-1">

                <div className="flex flex-wrap items-center gap-2">

                  <span className="rounded-full bg-sky-500/10 px-2.5 py-1 text-xs font-bold uppercase text-sky-400">
                    {item.category}
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      item.published
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-yellow-500/10 text-yellow-400'
                    }`}
                  >
                    {item.published ? 'Publicada' : 'Borrador'}
                  </span>

                </div>

                <h3 className="mt-3 truncate text-base font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-1 truncate text-sm text-slate-500">
                  /noticias/{item.slug}
                </p>

                <p className="mt-2 text-xs text-slate-600">
                  {new Date(item.created_at).toLocaleDateString(
                    'es-CO',
                    {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }
                  )}
                </p>

              </div>

              {/* BOTONES */}
              <div className="flex flex-wrap gap-2">

                <Link
                  href={`/noticias/${item.slug}`}
                  target="_blank"
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                  Ver
                </Link>

                <Link
                  href={`/admin/noticias/editar/${item.id}`}
                  className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-bold text-sky-400 transition hover:bg-sky-500/20"
                >
                  Editar
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    cambiarPublicacion(
                      item.id,
                      item.published
                    )
                  }
                  className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-bold text-yellow-400 transition hover:bg-yellow-500/20"
                >
                  {item.published
                    ? 'Despublicar'
                    : 'Publicar'}
                </button>

                <button
                  type="button"
                  disabled={deletingId === item.id}
                  onClick={() => eliminarNoticia(item.id)}
                  className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deletingId === item.id
                    ? 'Eliminando...'
                    : 'Eliminar'}
                </button>

              </div>

            </div>

          ))

        )}

      </div>
    </div>
  )
}