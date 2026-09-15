import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Facebook,
  MessageCircle,
  Share2,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

type NewsArticle = {
  id: number
  title: string
  slug: string
  category: string
  image: string
  excerpt: string
  content: string[] | string
  author: string
  minutes: string
  created_at: string
}

type MoreNewsItem = {
  id: number
  title: string
  slug: string
  category: string
  image: string
  excerpt: string
  author: string
  minutes: string
}

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // BUSCAR NOTICIA POR EL SLUG REAL DE SUPABASE
  const { data: article, error } = await supabase
    .from('news')
    .select(
      'id, title, slug, category, image, excerpt, content, author, minutes, created_at'
    )
    .eq('slug', slug)
    .eq('published', true)
    .single()

  // SI NO EXISTE
  if (error || !article) {
    return (
      <main className="min-h-screen bg-[#020912] px-6 py-24 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-red-400">
            <span className="text-3xl font-black">!</span>
          </div>

          <h1 className="mt-7 text-4xl font-black">
            Noticia no encontrada
          </h1>

          <p className="mt-4 text-slate-400">
            La noticia que buscas no está disponible o fue retirada.
          </p>

          <Link
            href="/noticias"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-bold transition hover:bg-blue-500"
          >
            <ArrowLeft size={18} />
            Volver a noticias
          </Link>
        </div>
      </main>
    )
  }

  // FECHA REAL
  const formattedDate = new Date(article.created_at).toLocaleDateString(
    'es-CO',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  )

  // URL REAL DE LA NOTICIA
  const articleUrl = `https://canaldelrio.com/noticias/${article.slug}`

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `${article.title} - Canal del Río ${articleUrl}`
  )}`

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    articleUrl
  )}`

  // CONTENIDO
  const paragraphs: string[] = Array.isArray(article.content)
    ? article.content
    : article.content
        .split(/\n\s*\n/)
        .map((paragraph: string) => paragraph.trim())
        .filter((paragraph: string) => Boolean(paragraph))

  // MÁS NOTICIAS
  const { data: moreNewsData, error: moreNewsError } = await supabase
    .from('news')
    .select(
      'id, title, slug, category, image, excerpt, author, minutes'
    )
    .eq('published', true)
    .neq('id', article.id)
    .order('id', { ascending: false })
    .limit(3)

  const moreNews: MoreNewsItem[] = moreNewsData ?? []

  console.log('MÁS NOTICIAS:', moreNews)
  console.log('ERROR MÁS NOTICIAS:', moreNewsError)

  return (
    <main className="min-h-screen bg-[#020912] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#08284a] via-[#020912] to-[#020912]" />

        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-3xl" />

        <div className="absolute -left-40 bottom-0 h-[300px] w-[300px] rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1280px] px-4 pb-10 pt-7 sm:px-6 lg:px-8">

          {/* VOLVER */}
          <Link
            href="/noticias"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-sky-400"
          >
            <ArrowLeft
              size={17}
              className="transition-transform group-hover:-translate-x-1"
            />

            Volver a noticias
          </Link>

          {/* CATEGORÍA */}
          <div className="mt-8 flex items-center gap-3">
            <span className="h-1 w-12 rounded-full bg-sky-500" />

            <span className="text-sm font-black uppercase tracking-[0.18em] text-sky-400">
              {article.category}
            </span>
          </div>

          {/* TÍTULO */}
          <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
            {article.title}
          </h1>

          {/* ENTRADILLA */}
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300 sm:text-xl">
            {article.excerpt}
          </p>

          {/* INFORMACIÓN */}
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-sm text-slate-400">

            <span className="flex items-center gap-2">
              <CalendarDays size={17} className="text-sky-400" />
              {formattedDate}
            </span>

            <span className="flex items-center gap-2">
              <Clock3 size={17} className="text-sky-400" />
              {article.minutes}
            </span>

            <span className="hidden h-4 w-px bg-white/10 sm:block" />

            <span className="font-semibold text-slate-300">
              {article.author}
            </span>

          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <article className="mx-auto max-w-[1280px] px-4 pb-20 pt-8 sm:px-6 lg:px-8">

        {/* IMAGEN */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#030b14] shadow-2xl">

          <div className="relative aspect-[16/8] w-full">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              className="object-cover transition duration-700 hover:scale-[1.01]"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#020912]/80 via-transparent to-transparent" />
          </div>

          {/* MARCA */}
          <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-xs font-black uppercase tracking-wider backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />

            Canal del Río
          </div>
        </div>

        {/* CUERPO */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">

          {/* TEXTO */}
          <div className="max-w-3xl">

            {/* ENTRADA */}
            <div className="border-l-4 border-sky-500 pl-5">
              <p className="text-xl font-bold leading-8 text-white sm:text-2xl">
                {article.excerpt}
              </p>
            </div>

            {/* CONTENIDO REAL */}
            <div className="mt-8 space-y-7 text-base leading-8 text-slate-300 sm:text-lg">
              {paragraphs.map(
                (paragraph: string, index: number) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                )
              )}
            </div>

            {/* AUTOR */}
            <div className="mt-10 flex items-center gap-4 border-y border-white/10 py-5">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-700 font-black">
                CR
              </div>

              <div>
                <div className="text-sm font-bold text-white">
                  {article.author}
                </div>

                <div className="text-xs text-slate-500">
                  Canal del Río · Información regional
                </div>
              </div>

            </div>

            {/* COMPARTIR */}
            <div className="mt-8">
              <div className="flex flex-wrap items-center gap-3">

                <span className="mr-2 flex items-center gap-2 text-sm font-bold text-slate-300">
                  <Share2 size={17} />
                  Compartir noticia
                </span>

                {/* WHATSAPP */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Compartir por WhatsApp"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 transition hover:scale-105 hover:bg-green-500"
                >
                  <MessageCircle size={18} />
                </a>

                {/* FACEBOOK */}
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Compartir en Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 transition hover:scale-105 hover:bg-blue-500"
                >
                  <Facebook size={18} />
                </a>

              </div>
            </div>

          </div>

          {/* SIDEBAR */}
          <aside className="space-y-4">

            {/* IDENTIDAD */}
            <div className="rounded-2xl border border-white/10 bg-[#030b14] p-5">

              <div className="flex items-center gap-2 text-sm font-black uppercase">
                <span className="h-5 w-1 rounded-full bg-sky-500" />

                Canal del Río
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Noticias, información y actualidad de nuestra región.
              </p>

            </div>

            {/* WHATSAPP */}
            <div className="overflow-hidden rounded-2xl border border-sky-500/20 bg-gradient-to-br from-[#0a315a] to-[#061522] p-5">

              <div className="text-sm font-black uppercase tracking-wide text-sky-400">
                ¿Tienes una noticia?
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Envíanos información, fotografías o videos.
              </p>

              <a
                href="https://wa.me/573167897997"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-bold transition hover:bg-green-500"
              >
                <MessageCircle size={18} />
                Enviar por WhatsApp
              </a>

            </div>

            {/* MÁS NOTICIAS */}
            <div className="rounded-2xl border border-white/10 bg-[#030b14] p-5">

              <div className="flex items-center gap-2 text-sm font-black uppercase">
                <span className="h-5 w-1 rounded-full bg-sky-500" />

                Más noticias
              </div>

              <div className="mt-4 space-y-3">

                {moreNews.length > 0 ? (
                  moreNews.map((item: MoreNewsItem) => (
                    <Link
                      key={item.id}
                      href={`/noticias/${item.slug}`}
                      className="group block border-b border-white/10 pb-3 last:border-0"
                    >

                      <div className="text-xs font-bold text-sky-400">
                        {item.category}
                      </div>

                      <div className="mt-1 text-sm font-bold leading-5 text-slate-200 transition group-hover:text-sky-400">
                        {item.title}
                      </div>

                      <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-500">
                        Leer noticia

                        <ArrowRight
                          size={12}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </div>

                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">
                    No hay más noticias disponibles.
                  </p>
                )}

              </div>
            </div>

          </aside>
        </div>
      </article>
    </main>
  )
}