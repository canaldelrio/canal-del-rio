import Link from 'next/link'
import NoticiasAdmin from './NoticiasAdmin'
import { supabase } from '@/lib/supabase'

export default async function NoticiasAdminPage() {
  const { data: news, error } = await supabase
    .from('news')
    .select(
      'id, title, slug, category, image, excerpt, author, minutes, published, created_at'
    )
    .order('id', { ascending: false })

  if (error) {
    return (
      <main className="min-h-screen bg-[#020912] p-8 text-white">
        <h1 className="text-2xl font-black text-red-400">
          Error al cargar noticias
        </h1>

        <pre className="mt-4 whitespace-pre-wrap text-sm text-slate-400">
          {JSON.stringify(error, null, 2)}
        </pre>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#020912] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px]">

        {/* ENCABEZADO */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="text-sm font-black uppercase tracking-wider text-sky-400">
              Canal del Río
            </div>

            <h1 className="mt-2 text-4xl font-black">
              Administrar noticias
            </h1>

            <p className="mt-2 text-slate-400">
              Publica, oculta, edita o elimina noticias.
            </p>
          </div>


        </div>

        {/* LISTADO */}
        <section className="mt-8">
          <NoticiasAdmin news={news ?? []} />
        </section>

      </div>
    </main>
  )
}