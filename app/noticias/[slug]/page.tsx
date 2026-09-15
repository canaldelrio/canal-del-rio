import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  Clock3,
  CalendarDays,
  Share2,
  MessageCircle,
  Facebook,
} from 'lucide-react'

import Header from '@/components/Header'
import ImageGroup from '@/components/ImageGroup'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type ContentBlock =
  | {
      type: 'text'
      content: string
    }
  | {
      type: 'image'
      url: string
    }
  | {
      type: 'video'
      url: string
    }
  | {
      type: 'image_group'
      images: string[]
    }

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: article, error } = await supabase
    .from('news')
    .select(
      'id, title, slug, category, image, media, content, content_blocks, excerpt, author, minutes, created_at'
    )
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  if (error) {
    console.error('Error buscando noticia:', error)
  }

  if (!article) {
    return (
      <>
        <Header />

        <main className="min-h-screen bg-[#020811] px-4 py-10 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[900px]">
            <Link
              href="/noticias"
              className="mb-8 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Volver a noticias
            </Link>

            <div className="rounded-xl border border-white/10 bg-[#07182a] p-10 text-center">
              <h1 className="text-3xl font-black">
                Noticia no encontrada
              </h1>

              <p className="mt-3 text-slate-400">
                La noticia que buscas no está disponible o ya no está
                publicada.
              </p>
            </div>
          </div>
        </main>
      </>
    )
  }

  const { data: relatedNews } = await supabase
    .from('news')
    .select(
      'id, title, slug, category, image, excerpt, author, minutes, created_at'
    )
    .eq('published', true)
    .neq('id', article.id)
    .eq('category', article.category)
    .order('created_at', { ascending: false })
    .limit(3)

  const contentBlocks: ContentBlock[] = Array.isArray(
    article.content_blocks
  )
    ? article.content_blocks.filter((block: any) => {
        if (!block || typeof block !== 'object') {
          return false
        }

        if (block.type === 'text') {
          return typeof block.content === 'string'
        }

        if (block.type === 'image' || block.type === 'video') {
          return (
            typeof block.url === 'string' &&
            block.url.length > 0
          )
        }

        if (block.type === 'image_group') {
          return (
            Array.isArray(block.images) &&
            block.images.length > 0 &&
            block.images.every(
              (image: any) =>
                typeof image === 'string' && image.length > 0
            )
          )
        }

        return false
      })
    : []

  const content =
    typeof article.content === 'string'
      ? article.content
      : ''

  const shareUrl = `https://canaldelrio.com.co/noticias/${article.slug}`
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(article.title)

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#020811] px-4 pb-16 text-white sm:px-6 lg:px-8">
        <article className="mx-auto max-w-[1100px]">

          {/* VOLVER */}
          <div className="pt-7">
            <Link
              href="/noticias"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-sky-400"
            >
              <ArrowLeft size={16} />
              Volver a noticias
            </Link>
          </div>

          {/* ENCABEZADO */}
          <header className="mt-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-md bg-sky-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                {article.category || 'Noticias'}
              </span>

              <span className="text-xs font-semibold text-slate-500">
                Canal del Río
              </span>
            </div>

            <h1 className="mt-5 max-w-5xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="mt-5 max-w-4xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                {article.excerpt}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-white/10 py-4 text-xs text-slate-400">

              {article.author && (
                <span>
                  Por{' '}
                  <strong className="text-slate-200">
                    {article.author}
                  </strong>
                </span>
              )}

              {article.created_at && (
                <span className="flex items-center gap-1.5">
                  <CalendarDays
                    size={14}
                    className="text-sky-400"
                  />

                  {new Date(
                    article.created_at
                  ).toLocaleDateString('es-CO', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              )}

              <span className="flex items-center gap-1.5">
                <Clock3
                  size={14}
                  className="text-sky-400"
                />

                {article.minutes || '3'} min de lectura
              </span>

            </div>
          </header>

          {/* IMAGEN PRINCIPAL */}
          {article.image && (
            <div className="relative mt-7 overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
              <Image
                src={article.image}
                alt={article.title}
                width={1600}
                height={1000}
                priority
                className="h-auto max-h-[700px] w-full object-contain"
                sizes="(max-width: 1100px) 100vw, 1100px"
              />
            </div>
          )}

          {/* CUERPO + COMPARTIR */}
          <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_260px]">

            {/* CUERPO */}
            <div className="min-w-0">
              <div className="rounded-xl border border-white/10 bg-[#07182a] p-6 sm:p-8 lg:p-10">

                {contentBlocks.length > 0 ? (
                  <div className="space-y-7">

                    {contentBlocks.map((block, index) => {

                      {/* TEXTO */}
                      if (block.type === 'text') {
                        return (
                          <div
                            key={`text-${index}`}
                            className="whitespace-pre-line text-[16px] leading-8 text-slate-200 sm:text-[17px]"
                          >
                            {block.content}
                          </div>
                        )
                      }

                      {/* IMAGEN INDIVIDUAL */}
                      if (block.type === 'image') {
                        return (
                          <figure
                            key={`image-${index}`}
                            className="overflow-hidden rounded-xl border border-white/10 bg-black"
                          >
                            <Image
                              src={block.url}
                              alt={`${article.title} - imagen ${
                                index + 1
                              }`}
                              width={1600}
                              height={1000}
                              className="h-auto max-h-[700px] w-full object-contain"
                              sizes="(max-width: 768px) 100vw, 800px"
                            />
                          </figure>
                        )
                      }

                      {/* CONTENEDOR DE IMÁGENES */}
                      if (block.type === 'image_group') {
                        return (
                          <ImageGroup
                            key={`image-group-${index}`}
                            images={block.images}
                            title={article.title}
                          />
                        )
                      }

                      {/* VIDEO */}
                      return (
                        <div
                          key={`video-${index}`}
                          className="overflow-hidden rounded-xl border border-white/10 bg-black"
                        >
                          <video
                            src={block.url}
                            controls
                            preload="metadata"
                            className="h-auto max-h-[700px] w-full bg-black"
                          />
                        </div>
                      )
                    })}

                  </div>
                ) : (
                  <div className="whitespace-pre-line text-[16px] leading-8 text-slate-200 sm:text-[17px]">
                    {content}
                  </div>
                )}

              </div>
            </div>

            {/* COMPARTIR */}
            <aside className="h-fit lg:sticky lg:top-24">

              <div className="rounded-xl border border-white/10 bg-[#07182a] p-5">

                <div className="flex items-center gap-2">
                  <Share2
                    size={17}
                    className="text-sky-400"
                  />

                  <h2 className="text-sm font-black uppercase tracking-wide">
                    Compartir
                  </h2>
                </div>

                <div className="mt-4 grid gap-2">

                  {/* WHATSAPP */}
                  <a
                    href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-xs font-black text-white transition hover:bg-green-500"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>

                  {/* FACEBOOK */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-xs font-black text-white transition hover:bg-blue-500"
                  >
                    <Facebook size={16} />
                    Facebook
                  </a>

                </div>
              </div>

              <div className="mt-4 rounded-xl border border-sky-500/20 bg-gradient-to-br from-[#08274a] to-[#06162b] p-5">

                <span className="text-[10px] font-black uppercase tracking-widest text-sky-400">
                  Canal del Río
                </span>

                <h3 className="mt-2 text-lg font-black">
                  Información que conecta con la gente
                </h3>

                <Link
                  href="/noticias"
                  className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-sky-500/30 px-4 py-2.5 text-xs font-black text-sky-400 transition hover:bg-sky-500/10"
                >
                  Ver más noticias

                  <ArrowLeft
                    size={14}
                    className="rotate-180"
                  />
                </Link>

              </div>

            </aside>
          </div>

          {/* NOTICIAS RELACIONADAS */}
          {relatedNews && relatedNews.length > 0 && (
            <section className="mt-10">

              <div className="mb-5">

                <div className="flex items-center gap-2">
                  <span className="h-6 w-1 rounded-full bg-sky-500" />

                  <h2 className="text-xl font-black uppercase tracking-tight">
                    Más noticias
                  </h2>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  Otras noticias de{' '}
                  {article.category || 'Canal del Río'}
                </p>

              </div>

              <div className="grid gap-5 md:grid-cols-3">

                {relatedNews.map((item) => (
                  <Link
                    key={item.id}
                    href={`/noticias/${item.slug}`}
                    className="group overflow-hidden rounded-xl border border-white/10 bg-[#07182a] transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40"
                  >

                    <div className="relative h-44 overflow-hidden bg-[#0b2945]">

                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs font-bold text-slate-500">
                          Canal del Río
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#07182a] via-transparent to-transparent" />

                      <div className="absolute bottom-3 left-3">
                        <span className="rounded-md bg-sky-600 px-2 py-1 text-[9px] font-black uppercase tracking-wide">
                          {item.category || 'Noticias'}
                        </span>
                      </div>

                    </div>

                    <div className="p-4">

                      <h3 className="line-clamp-3 text-base font-black leading-6 text-white transition group-hover:text-sky-400">
                        {item.title}
                      </h3>

                      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
                        <Clock3
                          size={13}
                          className="text-sky-400"
                        />

                        {item.minutes || '3'} min de lectura
                      </div>

                    </div>

                  </Link>
                ))}

              </div>

            </section>
          )}

        </article>
      </main>
    </>
  )
}