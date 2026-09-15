import Link from 'next/link'
import NewsCard from '@/components/NewsCard'
import { supabase } from '@/lib/supabase'

export default async function NewsSection() {
  const { data: news, error } = await supabase
    .from('news')
    .select(
      'id, title, slug, category, image, excerpt, author, minutes, created_at'
    )
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(4)

  if (error) {
    console.error('ERROR SUPABASE NEWS SECTION:', error)
    return null
  }

  return (
    <section id="noticias" className="mt-7">
      <div>
        {/* ENCABEZADO */}
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-6 w-1 rounded-full bg-sky-500" />

              <h2 className="text-xl font-black uppercase tracking-tight">
                Noticias destacadas
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-400">
              Las noticias más recientes de Canal del Río
            </p>
          </div>

          <Link
            href="/noticias"
            className="hidden text-xs font-bold text-sky-400 transition hover:text-sky-300 sm:block"
          >
            Ver todas →
          </Link>
        </div>

        {/* NOTICIAS */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {news?.map((item) => (
            <NewsCard
              key={item.id}
              item={{
                ...item,
                date: new Date(item.created_at).toLocaleDateString(
                  'es-CO',
                  {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }
                ),
                content: [],
              }}
            />
          ))}
        </div>

        {/* BOTÓN MÓVIL */}
        <div className="flex justify-center pt-5 sm:hidden">
          <Link
            href="/noticias"
            className="rounded border border-sky-500/30 px-8 py-2 text-sm font-bold transition hover:border-sky-500/60 hover:bg-sky-500/10"
          >
            Ver todas las noticias
          </Link>
        </div>
      </div>
    </section>
  )
}