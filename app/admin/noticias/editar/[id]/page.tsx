import EditarNoticia from './EditarNoticia'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function EditarNoticiaPage({ params }: Props) {
  const { id } = await params

  const noticiaId = Number(id)

  if (!Number.isInteger(noticiaId)) {
    notFound()
  }

  const { data: noticia, error } = await supabase
    .from('news')
    .select(
      'id, title, slug, category, image, excerpt, content, author, minutes, published'
    )
    .eq('id', noticiaId)
    .single()

  if (error || !noticia) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#020912] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-8">
          <div className="text-sm font-black uppercase tracking-wider text-sky-400">
            Canal del Río
          </div>

          <h1 className="mt-2 text-4xl font-black">
            Editar noticia
          </h1>

          <p className="mt-2 text-slate-400">
            Modifica la información de la noticia y guarda los cambios.
          </p>
        </div>

        <EditarNoticia noticia={noticia} />
      </div>
    </main>
  )
}