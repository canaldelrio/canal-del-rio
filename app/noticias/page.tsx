import Header from '@/components/Header'
import NewsCard from '@/components/NewsCard'
import { supabase } from '@/lib/supabase'

export default async function NoticiasPage() {
  const { data: news, error } = await supabase
    .from('news')
    .select(
      'id, title, slug, category, image, excerpt, author, minutes, created_at'
    )
    .eq('published', true)
    .order('id', { ascending: false })

  if (error) {
    return (
      <main className="min-h-screen bg-[#020912] p-8 text-white">
        <h1 className="text-2xl font-bold text-red-400">
          Error de Supabase
        </h1>

        <pre className="mt-4 whitespace-pre-wrap text-sm">
          {JSON.stringify(error, null, 2)}
        </pre>
      </main>
    )
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#020912] px-4 pb-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">

          {/* ENCABEZADO */}
          <section className="border-b border-white/10 py-8">
            <div className="flex items-center gap-2 text-sm font-bold uppercase text-sky-400">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              Canal del Río
            </div>

            <h1 className="mt-2 text-3xl font-black uppercase sm:text-4xl">
              Noticias
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Las noticias más importantes de nuestra región y Colombia.
            </p>
          </section>

          {/* NOTICIAS */}
          <section className="mt-8">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-5 w-0.5 bg-sky-500" />

              <h2 className="text-xl font-black uppercase">
                Últimas noticias
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
          </section>

        </div>
      </main>
    </>
  )
}