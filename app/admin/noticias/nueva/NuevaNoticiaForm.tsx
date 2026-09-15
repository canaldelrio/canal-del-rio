'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, Save } from 'lucide-react'

function crearSlug(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function NuevaNoticiaForm() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('Canal del Río')
  const [minutes, setMinutes] = useState('3')
  const [published, setPublished] = useState(true)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleTitleChange(value: string) {
    setTitle(value)
    setSlug(crearSlug(value))
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    setError('')
    setSuccess('')

    if (!title.trim()) {
      setError('Escribe el título de la noticia.')
      return
    }

    if (!category.trim()) {
      setError('Escribe la categoría.')
      return
    }

    if (!excerpt.trim()) {
      setError('Escribe la entradilla.')
      return
    }

    if (!content.trim()) {
      setError('Escribe el contenido de la noticia.')
      return
    }

    if (!slug.trim()) {
      setError('No se pudo generar el slug.')
      return
    }

    setLoading(true)

    const paragraphs = content
      .split(/\n\s*\n/)
      .map((paragraph: string) => paragraph.trim())
      .filter(Boolean)

    const { error: insertError } = await supabase
      .from('news')
      .insert({
        title: title.trim(),
        slug: slug.trim(),
        category: category.trim(),
        image: image.trim(),
        excerpt: excerpt.trim(),
        content: paragraphs,
        author: author.trim() || 'Canal del Río',
        minutes: minutes.trim() || '3',
        published,
      })

    if (insertError) {
      console.error(insertError)
      setError(insertError.message)
      setLoading(false)
      return
    }

    setSuccess('¡Noticia creada correctamente!')

    setTimeout(() => {
      router.push('/admin/noticias')
      router.refresh()
    }, 800)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-white/10 bg-[#030b14] p-5 shadow-xl sm:p-8"
    >

      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-400">
          {success}
        </div>
      )}

      {/* TÍTULO */}
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-bold text-slate-300"
        >
          Título
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => handleTitleChange(event.target.value)}
          placeholder="Escribe el título de la noticia"
          className="w-full rounded-lg border border-white/10 bg-[#020912] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-sky-500"
        />
      </div>

      {/* SLUG */}
      <div>
        <label
          htmlFor="slug"
          className="mb-2 block text-sm font-bold text-slate-300"
        >
          Slug
        </label>

        <input
          id="slug"
          type="text"
          value={slug}
          onChange={(event) => setSlug(crearSlug(event.target.value))}
          placeholder="titulo-de-la-noticia"
          className="w-full rounded-lg border border-white/10 bg-[#020912] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-sky-500"
        />

        <p className="mt-2 text-xs text-slate-500">
          URL: /noticias/{slug || 'titulo-de-la-noticia'}
        </p>
      </div>

      {/* CATEGORÍA */}
      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-sm font-bold text-slate-300"
        >
          Categoría
        </label>

        <input
          id="category"
          type="text"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="Regional"
          className="w-full rounded-lg border border-white/10 bg-[#020912] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-sky-500"
        />
      </div>

      {/* IMAGEN */}
      <div>
        <label
          htmlFor="image"
          className="mb-2 block text-sm font-bold text-slate-300"
        >
          URL de la imagen
        </label>

        <input
          id="image"
          type="url"
          value={image}
          onChange={(event) => setImage(event.target.value)}
          placeholder="https://..."
          className="w-full rounded-lg border border-white/10 bg-[#020912] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-sky-500"
        />

        <p className="mt-2 text-xs text-slate-500">
          Por ahora usamos una URL de imagen.
        </p>
      </div>

      {/* ENTRADILLA */}
      <div>
        <label
          htmlFor="excerpt"
          className="mb-2 block text-sm font-bold text-slate-300"
        >
          Entradilla
        </label>

        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(event) => setExcerpt(event.target.value)}
          placeholder="Resumen breve de la noticia..."
          rows={4}
          className="w-full resize-none rounded-lg border border-white/10 bg-[#020912] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-sky-500"
        />
      </div>

      {/* CONTENIDO */}
      <div>
        <label
          htmlFor="content"
          className="mb-2 block text-sm font-bold text-slate-300"
        >
          Contenido
        </label>

        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder={`Escribe aquí el contenido completo de la noticia.

Deja una línea en blanco entre cada párrafo.`}
          rows={14}
          className="w-full resize-y rounded-lg border border-white/10 bg-[#020912] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-sky-500"
        />

        <p className="mt-2 text-xs text-slate-500">
          Deja una línea en blanco entre párrafos.
        </p>
      </div>

      {/* AUTOR Y TIEMPO */}
      <div className="grid gap-5 sm:grid-cols-2">

        <div>
          <label
            htmlFor="author"
            className="mb-2 block text-sm font-bold text-slate-300"
          >
            Autor
          </label>

          <input
            id="author"
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#020912] px-4 py-3 text-white outline-none transition focus:border-sky-500"
          />
        </div>

        <div>
          <label
            htmlFor="minutes"
            className="mb-2 block text-sm font-bold text-slate-300"
          >
            Tiempo de lectura
          </label>

          <input
            id="minutes"
            type="text"
            value={minutes}
            onChange={(event) => setMinutes(event.target.value)}
            placeholder="3"
            className="w-full rounded-lg border border-white/10 bg-[#020912] px-4 py-3 text-white outline-none transition focus:border-sky-500"
          />
        </div>

      </div>

      {/* PUBLICAR */}
      <div className="rounded-lg border border-white/10 bg-[#020912] p-4">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={published}
            onChange={(event) => setPublished(event.target.checked)}
            className="h-4 w-4 accent-sky-500"
          />

          <span>
            <span className="block font-bold">
              Publicar inmediatamente
            </span>

            <span className="text-sm text-slate-500">
              Si está activado, la noticia aparecerá públicamente.
            </span>
          </span>
        </label>
      </div>

      {/* BOTONES */}
      <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">

        <button
          type="button"
          onClick={() => router.push('/admin/noticias')}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-6 py-3 font-bold text-slate-300 transition hover:bg-white/5"
        >
          <ArrowLeft size={17} />
          Cancelar
        </button>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-6 py-3 font-bold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save size={17} />

          {loading ? 'Guardando...' : 'Guardar noticia'}
        </button>

      </div>

    </form>
  )
}