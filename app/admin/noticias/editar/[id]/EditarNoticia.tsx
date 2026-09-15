'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Noticia = {
  id: number
  title: string
  slug: string
  category: string
  image: string
  excerpt: string
  content: string
  author: string
  minutes: string
  published: boolean
}

type Props = {
  noticia: Noticia
}

function crearSlug(texto: string) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function EditarNoticia({ noticia }: Props) {
  const router = useRouter()

  const [title, setTitle] = useState(noticia.title)
  const [slug, setSlug] = useState(noticia.slug)
  const [category, setCategory] = useState(noticia.category)
  const [image, setImage] = useState(noticia.image || '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState(
    noticia.image || ''
  )
  const [excerpt, setExcerpt] = useState(noticia.excerpt)
  const [content, setContent] = useState(noticia.content)
  const [author, setAuthor] = useState(noticia.author)
  const [minutes, setMinutes] = useState(noticia.minutes)
  const [published, setPublished] = useState(noticia.published)

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function cambiarTitulo(value: string) {
    setTitle(value)

    if (!slug || slug === crearSlug(noticia.title)) {
      setSlug(crearSlug(value))
    }
  }

  function seleccionarImagen(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]

    if (!file) {
      setImageFile(null)
      setImagePreview(image)
      return
    }

    if (!file.type.startsWith('image/')) {
      setError('El archivo seleccionado debe ser una imagen.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no puede superar los 5 MB.')
      return
    }

    setError('')
    setImageFile(file)

    const previewUrl = URL.createObjectURL(file)
    setImagePreview(previewUrl)
  }

  async function subirImagen(): Promise<string | null> {
    if (!imageFile) {
      return image.trim() || null
    }

    const extension =
      imageFile.name.split('.').pop()?.toLowerCase() || 'jpg'

    const nombreArchivo = `${Date.now()}-${crearSlug(
      title
    )}.${extension}`

    const { error: uploadError } = await supabase.storage
      .from('news-image')
      .upload(nombreArchivo, imageFile, {
        cacheControl: '3600',
        upsert: false,
        contentType: imageFile.type,
      })

    if (uploadError) {
      console.error(uploadError)

      setError(
        `No se pudo subir la imagen: ${uploadError.message}`
      )

      return null
    }

    const { data } = supabase.storage
      .from('news-image')
      .getPublicUrl(nombreArchivo)

    return data.publicUrl
  }

  async function guardarCambios(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    setError('')

    if (!title.trim()) {
      setError('Debes escribir un título.')
      return
    }

    if (!slug.trim()) {
      setError('Debes escribir un slug.')
      return
    }

    if (!excerpt.trim()) {
      setError('Debes escribir una entradilla.')
      return
    }

    if (!content.trim()) {
      setError('Debes escribir el contenido de la noticia.')
      return
    }

    setSaving(true)

    let imageUrl = image.trim()

    if (imageFile) {
      const nuevaImagen = await subirImagen()

      if (!nuevaImagen) {
        setSaving(false)
        return
      }

      imageUrl = nuevaImagen
    }

    const { error: updateError } = await supabase
      .from('news')
      .update({
        title: title.trim(),
        slug: slug.trim(),
        category: category.trim() || 'Noticias',
        image: imageUrl,
        excerpt: excerpt.trim(),
        content: content.trim(),
        author: author.trim() || 'Canal del Río',
        minutes: minutes.trim() || '3',
        published,
      })
      .eq('id', noticia.id)

    if (updateError) {
      console.error(updateError)

      if (updateError.code === '23505') {
        setError(
          'Ya existe otra noticia con ese slug. Cambia el slug e inténtalo nuevamente.'
        )
      } else {
        setError(
          `No se pudo actualizar la noticia: ${updateError.message}`
        )
      }

      setSaving(false)
      return
    }

    router.push('/admin/noticias')
    router.refresh()
  }

  return (
    <form
      onSubmit={guardarCambios}
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#030b14]"
    >
      <div className="space-y-6 p-5 sm:p-7">

        {/* TÍTULO */}
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-bold text-slate-200"
          >
            Título *
          </label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) =>
              cambiarTitulo(event.target.value)
            }
            className="w-full rounded-lg border border-white/10 bg-[#020912] px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-sky-500"
          />
        </div>

        {/* SLUG */}
        <div>
          <label
            htmlFor="slug"
            className="mb-2 block text-sm font-bold text-slate-200"
          >
            Slug *
          </label>

          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(event) =>
              setSlug(crearSlug(event.target.value))
            }
            className="w-full rounded-lg border border-white/10 bg-[#020912] px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-sky-500"
          />

          <p className="mt-2 text-xs text-slate-500">
            URL: /noticias/{slug}
          </p>
        </div>

        {/* CATEGORÍA + AUTOR */}
        <div className="grid gap-6 sm:grid-cols-2">

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-bold text-slate-200"
            >
              Categoría
            </label>

            <input
              id="category"
              type="text"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              className="w-full rounded-lg border border-white/10 bg-[#020912] px-4 py-3 text-white outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label
              htmlFor="author"
              className="mb-2 block text-sm font-bold text-slate-200"
            >
              Autor
            </label>

            <input
              id="author"
              type="text"
              value={author}
              onChange={(event) =>
                setAuthor(event.target.value)
              }
              className="w-full rounded-lg border border-white/10 bg-[#020912] px-4 py-3 text-white outline-none focus:border-sky-500"
            />
          </div>

        </div>

        {/* IMAGEN */}
        <div>
          <label
            htmlFor="imageFile"
            className="mb-2 block text-sm font-bold text-slate-200"
          >
            Imagen de la noticia
          </label>

          <input
            id="imageFile"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={seleccionarImagen}
            className="block w-full cursor-pointer rounded-lg border border-white/10 bg-[#020912] px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-md file:border-0 file:bg-sky-600 file:px-4 file:py-2 file:font-bold file:text-white hover:file:bg-sky-500"
          />

          <p className="mt-2 text-xs text-slate-500">
            Selecciona una nueva imagen solo si quieres reemplazar la actual.
            Máximo 5 MB.
          </p>

          {imagePreview && (
            <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#020912]">
              <img
                src={imagePreview}
                alt="Imagen de la noticia"
                className="max-h-[400px] w-full object-cover"
              />
            </div>
          )}

          <div className="mt-4">
            <label
              htmlFor="image"
              className="mb-2 block text-xs font-bold text-slate-400"
            >
              URL pública de imagen
            </label>

            <input
              id="image"
              type="url"
              value={image}
              onChange={(event) => {
                setImage(event.target.value)
                setImagePreview(event.target.value)
              }}
              placeholder="https://..."
              className="w-full rounded-lg border border-white/10 bg-[#020912] px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-sky-500"
            />
          </div>
        </div>

        {/* ENTRADILLA */}
        <div>
          <label
            htmlFor="excerpt"
            className="mb-2 block text-sm font-bold text-slate-200"
          >
            Entradilla *
          </label>

          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(event) =>
              setExcerpt(event.target.value)
            }
            rows={3}
            className="w-full resize-y rounded-lg border border-white/10 bg-[#020912] px-4 py-3 text-white outline-none focus:border-sky-500"
          />
        </div>

        {/* CONTENIDO */}
        <div>
          <label
            htmlFor="content"
            className="mb-2 block text-sm font-bold text-slate-200"
          >
            Contenido *
          </label>

          <textarea
            id="content"
            value={content}
            onChange={(event) =>
              setContent(event.target.value)
            }
            rows={14}
            className="w-full resize-y rounded-lg border border-white/10 bg-[#020912] px-4 py-3 text-white outline-none focus:border-sky-500"
          />
        </div>

        {/* TIEMPO */}
        <div className="sm:w-1/2">
          <label
            htmlFor="minutes"
            className="mb-2 block text-sm font-bold text-slate-200"
          >
            Tiempo de lectura
          </label>

          <input
            id="minutes"
            type="text"
            value={minutes}
            onChange={(event) =>
              setMinutes(event.target.value)
            }
            className="w-full rounded-lg border border-white/10 bg-[#020912] px-4 py-3 text-white outline-none focus:border-sky-500"
          />
        </div>

        {/* PUBLICAR */}
        <div className="rounded-xl border border-white/10 bg-[#020912] p-4">
          <label className="flex cursor-pointer items-center gap-3">

            <input
              type="checkbox"
              checked={published}
              onChange={(event) =>
                setPublished(event.target.checked)
              }
              className="h-5 w-5 accent-sky-500"
            />

            <div>
              <div className="font-bold text-white">
                Publicar noticia
              </div>

              <div className="text-sm text-slate-500">
                Si está activado, la noticia aparecerá publicada.
              </div>
            </div>

          </label>
        </div>

        {/* ERROR */}
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm font-semibold text-red-400">
            {error}
          </div>
        )}

      </div>

      {/* BOTONES */}
      <div className="flex flex-col gap-3 border-t border-white/10 bg-[#020912] p-5 sm:flex-row sm:justify-end">

        <Link
          href="/admin/noticias"
          className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 text-sm font-bold text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          Cancelar
        </Link>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? 'Guardando cambios...' : 'Guardar cambios'}
        </button>

      </div>
    </form>
  )
}