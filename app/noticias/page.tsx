import Header from '@/components/Header'
import NewsCard from '@/components/NewsCard'
import { supabase } from '@/lib/supabase'
import { Newspaper, Search } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const categorias = [
  'Todas',
  'Nacional',
  'Internacional',
  'Regional',
  'Local',
  'Deportes',
  'Opinión',
]

const seccionesDeportivas = [
  'Fútbol',
  'Deporte regional',
  'Polideportivo',
  'Resultados',
]

export default async function NoticiasPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string
    categoria?: string
    subcategoria?: string
  }>
}) {
  const params = await searchParams

  const query = params.q?.trim() || ''

  const categoria =
    params.categoria?.trim() || 'Todas'

  const subcategoria =
    params.subcategoria?.trim() || ''

  let newsQuery = supabase
    .from('news')
    .select(
      'id, title, slug, category, subcategory, image, excerpt, author, minutes, created_at'
    )
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (query) {
    newsQuery = newsQuery.or(
      `title.ilike.%${query}%,category.ilike.%${query}%,subcategory.ilike.%${query}%,excerpt.ilike.%${query}%`
    )
  }

  if (categoria !== 'Todas') {
    newsQuery = newsQuery.ilike(
      'category',
      categoria
    )
  }

  if (subcategoria) {
    newsQuery = newsQuery.ilike(
      'subcategory',
      subcategoria
    )
  }

  const { data: news, error } =
    await newsQuery

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

  const mostrandoSeccionDeportiva =
    categoria === 'Deportes' &&
    seccionesDeportivas.includes(
      subcategoria
    )

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#020912] px-4 pb-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">

          <section className="relative overflow-hidden rounded-b-xl border-x border-b border-white/10 bg-[#030b14] px-6 py-12 sm:px-10 lg:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />

            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="relative max-w-4xl">
              <div className="flex items-center gap-2">
                <Newspaper
                  size={18}
                  className="text-sky-400"
                />

                <span className="text-xs font-black uppercase tracking-[0.2em] text-sky-400">
                  Canal del Río
                </span>
              </div>

              <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Noticias
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Información nacional, internacional,
                regional y local. Noticias que conectan
                con nuestra comunidad.
              </p>
            </div>
          </section>

          <section className="mt-8">
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 rounded-full bg-sky-500" />

                <h2 className="text-xl font-black uppercase tracking-tight">
                  Buscar noticias
                </h2>
              </div>

              <p className="mt-1 text-xs text-slate-400">
                Encuentra rápidamente una noticia publicada
                por Canal del Río
              </p>
            </div>

            <form
              method="GET"
              className="flex flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="search"
                  name="q"
                  defaultValue={query}
                  placeholder="Buscar por título, categoría o palabra clave..."
                  className="h-12 w-full rounded-lg border border-white/10 bg-[#07182a] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/30"
                />

                {categoria !== 'Todas' && (
                  <input
                    type="hidden"
                    name="categoria"
                    value={categoria}
                  />
                )}

                {subcategoria && (
                  <input
                    type="hidden"
                    name="subcategoria"
                    value={subcategoria}
                  />
                )}
              </div>

              <button
                type="submit"
                className="h-12 rounded-lg bg-sky-600 px-7 text-sm font-black text-white transition hover:bg-sky-500"
              >
                Buscar
              </button>

              {(query ||
                categoria !== 'Todas' ||
                subcategoria) && (
                <a
                  href="/noticias"
                  className="flex h-12 items-center justify-center rounded-lg border border-white/10 px-5 text-sm font-bold text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                  Limpiar
                </a>
              )}
            </form>
          </section>

          <section className="mt-8">
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 rounded-full bg-sky-500" />

                <h2 className="text-xl font-black uppercase tracking-tight">
                  Categorías
                </h2>
              </div>

              <p className="mt-1 text-xs text-slate-400">
                Explora las noticias por tema
              </p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {categorias.map((item) => {
                const activa =
                  categoria === item &&
                  !subcategoria

                const paramsCategoria =
                  new URLSearchParams()

                if (query) {
                  paramsCategoria.set(
                    'q',
                    query
                  )
                }

                if (item !== 'Todas') {
                  paramsCategoria.set(
                    'categoria',
                    item
                  )
                }

                const href =
                  paramsCategoria.toString()
                    ? `/noticias?${paramsCategoria.toString()}`
                    : '/noticias'

                return (
                  <a
                    key={item}
                    href={href}
                    className={`whitespace-nowrap rounded-lg border px-4 py-2.5 text-xs font-black transition ${
                      activa
                        ? 'border-sky-500 bg-sky-600 text-white'
                        : 'border-white/10 bg-[#07182a] text-slate-400 hover:border-sky-500/40 hover:text-white'
                    }`}
                  >
                    {item}
                  </a>
                )
              })}
            </div>
          </section>

          {categoria === 'Deportes' && (
            <section className="mt-6">
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-1 rounded-full bg-sky-500" />

                  <h2 className="text-xl font-black uppercase tracking-tight">
                    Especialidades deportivas
                  </h2>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  Explora las noticias por disciplina
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={`/noticias?categoria=Deportes${
                    query
                      ? `&q=${encodeURIComponent(query)}`
                      : ''
                  }`}
                  className={`rounded-lg border px-4 py-2.5 text-xs font-black transition ${
                    !subcategoria
                      ? 'border-sky-500 bg-sky-600 text-white'
                      : 'border-white/10 bg-[#07182a] text-slate-400 hover:border-sky-500/40 hover:text-white'
                  }`}
                >
                  Todos
                </a>

                {seccionesDeportivas.map(
                  (seccion) => {
                    const activa =
                      subcategoria ===
                      seccion

                    const paramsSeccion =
                      new URLSearchParams()

                    paramsSeccion.set(
                      'categoria',
                      'Deportes'
                    )

                    paramsSeccion.set(
                      'subcategoria',
                      seccion
                    )

                    if (query) {
                      paramsSeccion.set(
                        'q',
                        query
                      )
                    }

                    return (
                      <a
                        key={seccion}
                        href={`/noticias?${paramsSeccion.toString()}`}
                        className={`rounded-lg border px-4 py-2.5 text-xs font-black transition ${
                          activa
                            ? 'border-sky-500 bg-sky-600 text-white'
                            : 'border-white/10 bg-[#07182a] text-slate-400 hover:border-sky-500/40 hover:text-white'
                        }`}
                      >
                        {seccion}
                      </a>
                    )
                  }
                )}
              </div>
            </section>
          )}

          <section className="mt-8">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-6 w-1 rounded-full bg-sky-500" />

                  <h2 className="text-xl font-black uppercase tracking-tight">
                    {query ||
                    categoria !== 'Todas' ||
                    subcategoria
                      ? 'Resultados'
                      : 'Últimas noticias'}
                  </h2>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  {query
                    ? `Resultados para: "${query}"`
                    : mostrandoSeccionDeportiva
                      ? `Noticias de Deportes · ${subcategoria}`
                      : categoria !== 'Todas'
                        ? `Noticias de ${categoria}`
                        : 'La información más reciente de Canal del Río'}
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#07182a] px-4 py-2">
                <span className="text-xs text-slate-400">
                  Noticias encontradas:{' '}
                </span>

                <span className="text-sm font-black text-sky-400">
                  {news?.length || 0}
                </span>
              </div>
            </div>

            {news && news.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {news.map((item) => (
                  <NewsCard
                    key={item.id}
                    item={{
                      ...item,
                      date: new Date(
                        item.created_at
                      ).toLocaleDateString(
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
            ) : (
              <div className="rounded-xl border border-white/10 bg-[#07182a] px-6 py-16 text-center">
                <Search
                  size={42}
                  className="mx-auto text-slate-600"
                />

                <h3 className="mt-4 text-xl font-black text-white">
                  No encontramos noticias
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Intenta con otra palabra o selecciona
                  otra categoría.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  )
}