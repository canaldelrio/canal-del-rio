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
    .order('id', { ascending: false })
    .limit(4)

  if (error) {
    console.error('ERROR SUPABASE NEWS SECTION:', error)

    return null
  }

  return (
    <section id="noticias" className="mt-5">
      <div>

        {/* TÍTULO */}
        <h2 className="mb-3 flex items-center gap-2 text-xl font-black uppercase">
          <span className="h-5 w-0.5 bg-sky-500" />
          Noticias destacadas
        </h2>

        {/* NOTICIAS */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

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

        {/* VER TODAS */}
        <div className="flex justify-center pt-3">
          <Link
            href="/noticias"
            className="rounded border border-sky-500/30 px-10 py-2 text-sm font-bold transition hover:border-sky-500/60 hover:bg-sky-500/10"
          >
            Ver todas las noticias
          </Link>
        </div>

      </div>
    </section>
  )
}