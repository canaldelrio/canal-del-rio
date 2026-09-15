'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, Clock3 } from 'lucide-react'
import { useEffect, useState } from 'react'

type News = {
  id: number
  title: string
  slug: string
  category: string
  image: string | null
  excerpt: string | null
  minutes: string | null
  created_at: string
}

export default function Hero() {
  const [article, setArticle] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadLatestNews() {
      try {
        const response = await fetch('/api/latest-news', {
          cache: 'no-store',
        })

        if (!response.ok) {
          throw new Error('No se pudo cargar la noticia')
        }

        const data = await response.json()

        setArticle(data.article || null)
      } catch (error) {
        console.error('Error cargando noticia principal:', error)
      } finally {
        setLoading(false)
      }
    }

    loadLatestNews()
  }, [])

  if (loading) {
    return (
      <section className="relative mt-0 min-h-[410px] overflow-hidden rounded-b-lg bg-[#07182a]">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-sm text-slate-400">
            Cargando noticia...
          </p>
        </div>
      </section>
    )
  }

  if (!article) {
    return (
      <section className="relative mt-0 min-h-[410px] overflow-hidden rounded-b-lg bg-[#07182a]">
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div>
            <span className="rounded bg-blue-600 px-3 py-1 text-xs font-bold">
              CANAL DEL RÍO
            </span>

            <h1 className="mt-4 text-3xl font-black">
              Información que conecta con la gente
            </h1>

            <p className="mt-3 text-slate-400">
              Aquí aparecerán nuestras noticias más recientes.
            </p>
          </div>
        </div>
      </section>
    )
  }

  const date = new Date(article.created_at).toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Link
      href={`/noticias/${article.slug}`}
      className="group block"
    >
      <section className="relative mt-0 min-h-[410px] overflow-hidden rounded-b-lg">

        <Image
          src={
            article.image ||
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1500&q=85'
          }
          alt={article.title}
          fill
          priority
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="100vw"
        />

        <div className="hero-gradient absolute inset-0" />

        <div className="absolute bottom-7 left-7 max-w-[700px] sm:left-8">

          <span className="rounded bg-blue-600 px-3 py-1 text-xs font-bold">
            {article.category || 'ÚLTIMA HORA'}
          </span>

          <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-[38px]">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="mt-2 max-w-2xl text-sm text-slate-200 sm:text-base">
              {article.excerpt}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-5 text-xs text-slate-200">

            <span className="flex items-center gap-1">
              <CalendarDays size={15} />
              {date}
            </span>

            <span className="flex items-center gap-1">
              <Clock3 size={15} />
              {article.minutes || '3'} min de lectura
            </span>

          </div>

        </div>
      </section>
    </Link>
  )
}