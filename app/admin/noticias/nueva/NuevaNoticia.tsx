'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/cliente'

type ContentBlock =
  | {
      type: 'text'
      id: string
      content: string
    }
  | {
      type: 'image'
      id: string
      file: File | null
      url: string
      preview: string
    }
  | {
      type: 'video'
      id: string
      file: File | null
      url: string
      preview: string
    }
  | {
      type: 'image_group'
      id: string
      images: {
        id: string
        file: File | null
        url: string
        preview: string
      }[]
    }

type SavedContentBlock =
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

function crearId() {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`
}

export default function NuevaNoticia() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('Noticias')
  const [subcategory, setSubcategory] = useState('')

  const [mainImageFile, setMainImageFile] =
    useState<File | null>(null)

  const [mainImagePreview, setMainImagePreview] =
    useState('')

  const [excerpt, setExcerpt] = useState('')
  const [contentBlocks, setContentBlocks] =
    useState<ContentBlock[]>([])

  const [author, setAuthor] = useState('')
  const [minutes, setMinutes] = useState('3')
  const [published, setPublished] = useState(true)

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    return () => {
      if (mainImagePreview) {
        URL.revokeObjectURL(mainImagePreview)
      }

      contentBlocks.forEach((block) => {
        if (
          (block.type === 'image' ||
            block.type === 'video') &&
          block.preview
        ) {
          URL.revokeObjectURL(block.preview)
        }

        if (block.type === 'image_group') {
          block.images.forEach((image) => {
            if (image.preview) {
              URL.revokeObjectURL(image.preview)
            }
          })
        }
      })
    }
  }, [mainImagePreview, contentBlocks])

  useEffect(() => {
    if (title.trim()) {
      setSlug(crearSlug(title))
    }
  }, [title])

  function seleccionarImagenPrincipal(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError(
        'La imagen principal debe ser una imagen válida.'
      )
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(
        'La imagen principal no puede superar 5 MB.'
      )
      return
    }

    setError('')

    if (mainImagePreview) {
      URL.revokeObjectURL(mainImagePreview)
    }

    setMainImageFile(file)
    setMainImagePreview(URL.createObjectURL(file))
  }

  function agregarTexto() {
    setContentBlocks((prev) => [
      ...prev,
      {
        type: 'text',
        id: crearId(),
        content: '',
      },
    ])
  }

  function agregarMultimedia(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(
      event.target.files ?? []
    )

    if (!files.length) return

    const nuevosBloques: ContentBlock[] = []

    for (const file of files) {
      if (file.type.startsWith('image/')) {
        if (file.size > 10 * 1024 * 1024) {
          setError(
            `La imagen "${file.name}" supera el límite de 10 MB.`
          )
          continue
        }

        nuevosBloques.push({
          type: 'image',
          id: crearId(),
          file,
          url: '',
          preview: URL.createObjectURL(file),
        })
      } else if (file.type.startsWith('video/')) {
        if (file.size > 100 * 1024 * 1024) {
          setError(
            `El video "${file.name}" supera el límite de 100 MB.`
          )
          continue
        }

        nuevosBloques.push({
          type: 'video',
          id: crearId(),
          file,
          url: '',
          preview: URL.createObjectURL(file),
        })
      } else {
        setError(
          `El archivo "${file.name}" no es una imagen ni un video válido.`
        )
      }
    }

    if (nuevosBloques.length) {
      setContentBlocks((prev) => [
        ...prev,
        ...nuevosBloques,
      ])

      setError('')
    }

    event.target.value = ''
  }

  function agregarContenedorImagenes(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(
      event.target.files ?? []
    )

    if (!files.length) return

    const images: {
      id: string
      file: File
      url: string
      preview: string
    }[] = []

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setError(
          `El archivo "${file.name}" no es una imagen válida.`
        )
        continue
      }

      if (file.size > 10 * 1024 * 1024) {
        setError(
          `La imagen "${file.name}" supera el límite de 10 MB.`
        )
        continue
      }

      images.push({
        id: crearId(),
        file,
        url: '',
        preview: URL.createObjectURL(file),
      })
    }

    if (images.length) {
      setContentBlocks((prev) => [
        ...prev,
        {
          type: 'image_group',
          id: crearId(),
          images,
        },
      ])

      setError('')
    }

    event.target.value = ''
  }

  function cambiarTexto(
    id: string,
    content: string
  ) {
    setContentBlocks((prev) =>
      prev.map((block) =>
        block.id === id &&
        block.type === 'text'
          ? {
              ...block,
              content,
            }
          : block
      )
    )
  }

  function agregarImagenAlContenedor(
    blockId: string,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(
      event.target.files ?? []
    )

    if (!files.length) return

    const nuevasImagenes: {
      id: string
      file: File
      url: string
      preview: string
    }[] = []

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setError(
          `El archivo "${file.name}" no es una imagen válida.`
        )
        continue
      }

      if (file.size > 10 * 1024 * 1024) {
        setError(
          `La imagen "${file.name}" supera el límite de 10 MB.`
        )
        continue
      }

      nuevasImagenes.push({
        id: crearId(),
        file,
        url: '',
        preview: URL.createObjectURL(file),
      })
    }

    if (nuevasImagenes.length) {
      setContentBlocks((prev) =>
        prev.map((block) =>
          block.id === blockId &&
          block.type === 'image_group'
            ? {
                ...block,
                images: [
                  ...block.images,
                  ...nuevasImagenes,
                ],
              }
            : block
        )
      )

      setError('')
    }

    event.target.value = ''
  }

  function eliminarImagenDelContenedor(
    blockId: string,
    imageId: string
  ) {
    setContentBlocks((prev) =>
      prev.map((block) => {
        if (
          block.id !== blockId ||
          block.type !== 'image_group'
        ) {
          return block
        }

        const image = block.images.find(
          (item) => item.id === imageId
        )

        if (image?.preview) {
          URL.revokeObjectURL(image.preview)
        }

        return {
          ...block,
          images: block.images.filter(
            (item) => item.id !== imageId
          ),
        }
      })
    )
  }

  function moverImagenDentroDelContenedor(
    blockId: string,
    imageIndex: number,
    direction: 'left' | 'right'
  ) {
    setContentBlocks((prev) =>
      prev.map((block) => {
        if (
          block.id !== blockId ||
          block.type !== 'image_group'
        ) {
          return block
        }

        const newImages = [...block.images]

        const newIndex =
          direction === 'left'
            ? imageIndex - 1
            : imageIndex + 1

        if (
          newIndex < 0 ||
          newIndex >= newImages.length
        ) {
          return block
        }

        const [moved] = newImages.splice(
          imageIndex,
          1
        )

        newImages.splice(newIndex, 0, moved)

        return {
          ...block,
          images: newImages,
        }
      })
    )
  }

  function eliminarBloque(id: string) {
    setContentBlocks((prev) => {
      const block = prev.find(
        (item) => item.id === id
      )

      if (!block) return prev

      if (
        (block.type === 'image' ||
          block.type === 'video') &&
        block.preview
      ) {
        URL.revokeObjectURL(block.preview)
      }

      if (block.type === 'image_group') {
        block.images.forEach((image) => {
          if (image.preview) {
            URL.revokeObjectURL(image.preview)
          }
        })
      }

      return prev.filter(
        (item) => item.id !== id
      )
    })
  }

  function moverBloque(
    index: number,
    direction: 'up' | 'down'
  ) {
    setContentBlocks((prev) => {
      const newBlocks = [...prev]

      const newIndex =
        direction === 'up'
          ? index - 1
          : index + 1

      if (
        newIndex < 0 ||
        newIndex >= newBlocks.length
      ) {
        return prev
      }

      const [moved] = newBlocks.splice(
        index,
        1
      )

      newBlocks.splice(newIndex, 0, moved)

      return newBlocks
    })
  }

  async function subirArchivo(
    file: File,
    carpeta: string
  ) {
    const extension =
      file.name.split('.').pop() || 'file'

    const nombre =
      `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${extension}`

    const ruta = `${carpeta}/${nombre}`

    const { error: uploadError } =
      await supabase.storage
        .from('news-image')
        .upload(ruta, file)

    if (uploadError) {
      throw uploadError
    }

    const {
      data: publicData,
    } = supabase.storage
      .from('news-image')
      .getPublicUrl(ruta)

    return publicData.publicUrl
  }

  function obtenerTextoCompleto() {
    return contentBlocks
      .filter(
        (
          block
        ): block is Extract<
          ContentBlock,
          { type: 'text' }
        > => block.type === 'text'
      )
      .map((block) =>
        block.content.trim()
      )
      .filter(Boolean)
      .join('\n\n')
  }

  async function guardarNoticia() {
    if (saving) return

    setError('')
    setSaving(true)

    try {
      // =====================================================
      // 1. COMPROBAR CONFIGURACIÓN DE SUPABASE
      // =====================================================

      if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ) {
        throw new Error(
          'Supabase no está configurado correctamente. Revisa las variables NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY.'
        )
      }

      // =====================================================
      // 2. COMPROBAR SESIÓN
      // =====================================================

      const {
        data: sessionData,
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError) {
        console.error(
          'ERROR OBTENIENDO SESIÓN:',
          sessionError
        )

        throw new Error(
          `No se pudo obtener la sesión de Supabase: ${sessionError.message}`
        )
      }

      const session =
        sessionData.session

      if (!session) {
        throw new Error(
          'No hay una sesión de administrador activa. Cierra sesión, vuelve a ingresar al panel y prueba nuevamente.'
        )
      }

      console.log(
        'SESIÓN ENCONTRADA:',
        session.user.id
      )

      // =====================================================
      // 3. COMPROBAR USUARIO AUTENTICADO
      // =====================================================

      const {
        data: userData,
        error: authError,
      } = await supabase.auth.getUser()

      if (authError) {
        console.error(
          'ERROR DE AUTENTICACIÓN:',
          authError
        )

        throw new Error(
          `No se pudo verificar el usuario de Supabase: ${authError.message}`
        )
      }

      const user = userData.user

      if (!user) {
        throw new Error(
          'Supabase encontró la sesión, pero no pudo identificar al usuario.'
        )
      }

      console.log(
        'USUARIO AUTENTICADO:',
        user.id
      )

      // =====================================================
      // 4. VALIDACIONES
      // =====================================================

      if (!title.trim()) {
        throw new Error(
          'Debes escribir un título.'
        )
      }

      if (!slug.trim()) {
        throw new Error(
          'Debes escribir un slug.'
        )
      }

      if (!excerpt.trim()) {
        throw new Error(
          'Debes escribir una entradilla.'
        )
      }

      if (!mainImageFile) {
        throw new Error(
          'Debes seleccionar una imagen principal.'
        )
      }

      if (
        category === 'Deportes' &&
        !subcategory.trim()
      ) {
        throw new Error(
          'Debes seleccionar una sección deportiva.'
        )
      }

      const textoCompleto =
        obtenerTextoCompleto()

      if (!textoCompleto) {
        throw new Error(
          'Debes agregar al menos un bloque de texto.'
        )
      }

      const gruposVacios =
        contentBlocks.some(
          (block) =>
            block.type === 'image_group' &&
            block.images.length === 0
        )

      if (gruposVacios) {
        throw new Error(
          'Hay un contenedor de imágenes vacío.'
        )
      }

      // =====================================================
      // 5. SUBIR IMAGEN PRINCIPAL
      // =====================================================

      console.log(
        'Subiendo imagen principal...'
      )

      const imageUrl =
        await subirArchivo(
          mainImageFile,
          'main'
        )

      if (!imageUrl) {
        throw new Error(
          'Supabase no devolvió la URL de la imagen principal.'
        )
      }

      console.log(
        'Imagen principal subida:',
        imageUrl
      )

      // =====================================================
      // 6. PROCESAR BLOQUES
      // =====================================================

      const savedBlocks:
        SavedContentBlock[] = []

      for (const block of contentBlocks) {
        // ---------------------------------------------------
        // TEXTO
        // ---------------------------------------------------

        if (block.type === 'text') {
          const contenido =
            block.content.trim()

          if (contenido) {
            savedBlocks.push({
              type: 'text',
              content: contenido,
            })
          }

          continue
        }

        // ---------------------------------------------------
        // IMAGEN / VIDEO
        // ---------------------------------------------------

        if (
          block.type === 'image' ||
          block.type === 'video'
        ) {
          let url = block.url

          if (block.file) {
            console.log(
              `Subiendo ${block.type}...`
            )

            url = await subirArchivo(
              block.file,
              block.type === 'image'
                ? 'content-images'
                : 'content-videos'
            )

            console.log(
              `${block.type} subido:`,
              url
            )
          }

          if (!url) {
            throw new Error(
              `No se pudo obtener la URL del ${block.type} del contenido.`
            )
          }

          savedBlocks.push({
            type: block.type,
            url,
          })

          continue
        }

        // ---------------------------------------------------
        // GRUPO DE IMÁGENES
        // ---------------------------------------------------

        if (
          block.type === 'image_group'
        ) {
          const imageUrls: string[] = []

          for (const image of block.images) {
            let url = image.url

            if (image.file) {
              console.log(
                'Subiendo imagen del grupo...'
              )

              url = await subirArchivo(
                image.file,
                'content-images'
              )

              console.log(
                'Imagen del grupo subida:',
                url
              )
            }

            if (url) {
              imageUrls.push(url)
            }
          }

          if (imageUrls.length === 0) {
            throw new Error(
              'Uno de los contenedores de imágenes no contiene imágenes válidas.'
            )
          }

          savedBlocks.push({
            type: 'image_group',
            images: imageUrls,
          })
        }
      }

      // =====================================================
      // 7. CREAR MEDIA
      // =====================================================

      const media = savedBlocks.flatMap(
        (block) => {
          if (
            block.type === 'image' ||
            block.type === 'video'
          ) {
            return [
              {
                type: block.type,
                url: block.url,
              },
            ]
          }

          if (
            block.type === 'image_group'
          ) {
            return block.images.map(
              (url) => ({
                type: 'image',
                url,
              })
            )
          }

          return []
        }
      )

      // =====================================================
      // 8. PREPARAR NOTICIA
      // =====================================================

      const noticia = {
        title: title.trim(),

        slug: slug.trim(),

        category:
          category.trim() || 'Noticias',

        subcategory:
          category === 'Deportes'
            ? subcategory.trim()
            : null,

        image: imageUrl,

        media,

        content: textoCompleto,

        content_blocks:
          savedBlocks,

        excerpt:
          excerpt.trim(),

        author:
          author.trim() ||
          'Canal del Río',

        minutes:
          minutes.trim() || '3',

        published,
      }

      console.log(
        'ENVIANDO NOTICIA A SUPABASE:',
        noticia
      )

      // =====================================================
      // 9. INSERTAR EN NEWS
      // =====================================================

      const {
        data: noticiaCreada,
        error: insertError,
      } = await supabase
        .from('news')
        .insert(noticia)
        .select()
        .single()

      if (insertError) {
        console.error(
          'ERROR INSERTANDO EN NEWS:',
          insertError
        )

        throw new Error(
          [
            'Supabase rechazó la noticia.',
            `Código: ${insertError.code || 'N/D'}`,
            `Mensaje: ${insertError.message || 'N/D'}`,
            `Detalles: ${insertError.details || 'N/D'}`,
            `Ayuda: ${insertError.hint || 'N/D'}`,
          ].join('\n')
        )
      }

      if (!noticiaCreada) {
        throw new Error(
          'Supabase no devolvió la noticia creada después del INSERT.'
        )
      }

      console.log(
        'NOTICIA GUARDADA CORRECTAMENTE:',
        noticiaCreada
      )

      // =====================================================
      // 10. REDIRECCIÓN
      // =====================================================

      router.push('/admin/noticias')
      router.refresh()
    } catch (error) {
      console.error(
        '===================================='
      )

      console.error(
        'ERROR COMPLETO GUARDANDO NOTICIA:',
        error
      )

      console.error(
        '===================================='
      )

      if (
        error &&
        typeof error === 'object'
      ) {
        const supabaseError =
          error as {
            message?: string
            details?: string
            hint?: string
            code?: string
          }

        console.error({
          code:
            supabaseError.code || null,

          message:
            supabaseError.message || null,

          details:
            supabaseError.details || null,

          hint:
            supabaseError.hint || null,
        })
      }

      setError(
        error instanceof Error
          ? error.message
          : 'No fue posible guardar la noticia.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <span className="h-7 w-1 rounded-full bg-sky-500" />

          <h1 className="text-2xl font-black uppercase tracking-tight text-white">
            Nueva noticia
          </h1>
        </div>

        <p className="mt-2 text-sm text-slate-400">
          Crea y publica una nueva noticia en
          Canal del Río.
        </p>
      </div>

      {error && (
        <div className="mb-6 whitespace-pre-line rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* INFORMACIÓN PRINCIPAL */}

        <section className="rounded-xl border border-white/10 bg-[#030b14] p-5">
          <h2 className="mb-5 text-lg font-black uppercase text-white">
            Información principal
          </h2>

          <div className="space-y-5">
            {/* TÍTULO */}

            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-bold text-slate-200"
              >
                Título
              </label>

              <input
                id="title"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="Escribe el título de la noticia"
                className="w-full rounded-lg border border-white/10 bg-[#081b30] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-sky-500/50"
              />
            </div>

            {/* SLUG */}

            <div>
              <label
                htmlFor="slug"
                className="mb-2 block text-sm font-bold text-slate-200"
              >
                Slug
              </label>

              <input
                id="slug"
                value={slug}
                onChange={(event) =>
                  setSlug(
                    crearSlug(
                      event.target.value
                    )
                  )
                }
                placeholder="slug-de-la-noticia"
                className="w-full rounded-lg border border-white/10 bg-[#081b30] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-sky-500/50"
              />
            </div>

            {/* CATEGORÍA */}

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-bold text-slate-200"
              >
                Categoría
              </label>

              <select
                id="category"
                value={category}
                onChange={(event) => {
                  setCategory(
                    event.target.value
                  )
                  setSubcategory('')
                }}
                className="w-full rounded-lg border border-white/10 bg-[#081b30] px-4 py-3 text-sm text-white outline-none focus:border-sky-500/50"
              >
                <option value="Noticias">
                  Noticias
                </option>

                <option value="Política">
                  Política
                </option>

                <option value="Judicial">
                  Judicial
                </option>

                <option value="Regional">
                  Regional
                </option>

                <option value="Nacional">
                  Nacional
                </option>

                <option value="Internacional">
                  Internacional
                </option>

                <option value="Deportes">
                  Deportes
                </option>

                <option value="Cultura">
                  Cultura
                </option>

                <option value="Economía">
                  Economía
                </option>

                <option value="Tecnología">
                  Tecnología
                </option>

                <option value="Entretenimiento">
                  Entretenimiento
                </option>
              </select>
            </div>

            {/* SUBCATEGORÍA DEPORTIVA */}

            {category === 'Deportes' && (
              <div>
                <label
                  htmlFor="subcategory"
                  className="mb-2 block text-sm font-bold text-slate-200"
                >
                  Sección deportiva
                </label>

                <select
                  id="subcategory"
                  value={subcategory}
                  onChange={(event) =>
                    setSubcategory(
                      event.target.value
                    )
                  }
                  className="w-full rounded-lg border border-white/10 bg-[#081b30] px-4 py-3 text-sm text-white outline-none focus:border-sky-500/50"
                >
                  <option value="">
                    Selecciona una sección
                  </option>

                  <option value="Fútbol">
                    Fútbol
                  </option>

                  <option value="Deporte regional">
                    Deporte regional
                  </option>

                  <option value="Polideportivo">
                    Polideportivo
                  </option>

                  <option value="Resultados">
                    Resultados
                  </option>
                </select>

                <p className="mt-2 text-xs text-slate-500">
                  Esta sección determina dónde
                  aparecerá la noticia dentro de
                  Deportes.
                </p>
              </div>
            )}

            {/* ENTRADILLA */}

            <div>
              <label
                htmlFor="excerpt"
                className="mb-2 block text-sm font-bold text-slate-200"
              >
                Entradilla
              </label>

              <textarea
                id="excerpt"
                value={excerpt}
                onChange={(event) =>
                  setExcerpt(
                    event.target.value
                  )
                }
                rows={4}
                placeholder="Escribe una breve introducción de la noticia"
                className="w-full resize-y rounded-lg border border-white/10 bg-[#081b30] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-sky-500/50"
              />
            </div>

            {/* AUTOR Y TIEMPO */}

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="author"
                  className="mb-2 block text-sm font-bold text-slate-200"
                >
                  Autor
                </label>

                <input
                  id="author"
                  value={author}
                  onChange={(event) =>
                    setAuthor(
                      event.target.value
                    )
                  }
                  placeholder="Canal del Río"
                  className="w-full rounded-lg border border-white/10 bg-[#081b30] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-sky-500/50"
                />
              </div>

              <div>
                <label
                  htmlFor="minutes"
                  className="mb-2 block text-sm font-bold text-slate-200"
                >
                  Tiempo de lectura
                </label>

                <input
                  id="minutes"
                  value={minutes}
                  onChange={(event) =>
                    setMinutes(
                      event.target.value
                    )
                  }
                  placeholder="3"
                  className="w-full rounded-lg border border-white/10 bg-[#081b30] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-sky-500/50"
                />
              </div>
            </div>
          </div>
        </section>

        {/* IMAGEN PRINCIPAL */}

        <section className="rounded-xl border border-white/10 bg-[#030b14] p-5">
          <h2 className="mb-2 text-lg font-black uppercase text-white">
            Imagen principal
          </h2>

          <p className="mb-5 text-xs text-slate-500">
            Esta será la imagen principal que
            aparecerá en la portada y al abrir la
            noticia.
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={
              seleccionarImagenPrincipal
            }
            className="block w-full rounded-lg border border-white/10 bg-[#081b30] p-3 text-sm text-slate-300 file:mr-4 file:rounded-md file:border-0 file:bg-sky-500 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-sky-400"
          />

          {mainImagePreview && (
            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <img
                src={mainImagePreview}
                alt="Vista previa"
                className="max-h-[450px] w-full object-cover"
              />
            </div>
          )}
        </section>

        {/* CONTENIDO */}

        <section className="rounded-xl border border-white/10 bg-[#030b14] p-5">
          <div className="mb-5">
            <h2 className="text-lg font-black uppercase text-white">
              Contenido de la noticia
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Organiza el artículo colocando
              textos, imágenes, videos y
              documentos en el orden que quieras.
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={agregarTexto}
              className="rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sky-500"
            >
              + Agregar texto
            </button>

            <label className="cursor-pointer rounded-lg border border-white/10 bg-[#081b30] px-4 py-2.5 text-sm font-bold text-white transition hover:border-sky-500/30 hover:bg-[#0b2945]">
              + Agregar imagen/video

              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={agregarMultimedia}
                className="hidden"
              />
            </label>

            <label className="cursor-pointer rounded-lg border border-white/10 bg-[#081b30] px-4 py-2.5 text-sm font-bold text-white transition hover:border-sky-500/30 hover:bg-[#0b2945]">
              + Contenedor de imágenes

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={
                  agregarContenedorImagenes
                }
                className="hidden"
              />
            </label>
          </div>

          <div className="space-y-5">
            {contentBlocks.length === 0 && (
              <div className="rounded-xl border border-dashed border-white/10 bg-[#081b30]/40 px-5 py-10 text-center">
                <p className="text-sm font-semibold text-slate-400">
                  Todavía no has agregado
                  contenido.
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  Agrega texto, imágenes, videos o
                  un contenedor de imágenes.
                </p>
              </div>
            )}

            {contentBlocks.map(
              (block, index) => (
                <div
                  key={block.id}
                  className="rounded-xl border border-white/10 bg-[#081b30] p-4"
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-black uppercase tracking-wider text-sky-400">
                      {block.type === 'text' &&
                        `Texto ${index + 1}`}

                      {block.type === 'image' &&
                        `Imagen ${index + 1}`}

                      {block.type === 'video' &&
                        `Video ${index + 1}`}

                      {block.type ===
                        'image_group' &&
                        `Contenedor de imágenes ${index + 1}`}
                    </span>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          moverBloque(
                            index,
                            'up'
                          )
                        }
                        disabled={index === 0}
                        className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-slate-300 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        ↑
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          moverBloque(
                            index,
                            'down'
                          )
                        }
                        disabled={
                          index ===
                          contentBlocks.length - 1
                        }
                        className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-slate-300 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        ↓
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          eliminarBloque(
                            block.id
                          )
                        }
                        className="rounded-md border border-red-500/20 px-3 py-1.5 text-xs text-red-400"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>

                  {block.type === 'text' && (
                    <textarea
                      value={block.content}
                      onChange={(event) =>
                        cambiarTexto(
                          block.id,
                          event.target.value
                        )
                      }
                      rows={7}
                      placeholder="Escribe aquí el contenido de esta parte de la noticia..."
                      className="w-full resize-y rounded-lg border border-white/10 bg-[#030b14] px-4 py-3 text-sm leading-7 text-white outline-none placeholder:text-slate-600 focus:border-sky-500/50"
                    />
                  )}

                  {block.type === 'image' && (
                    <div className="overflow-hidden rounded-lg border border-white/10">
                      <img
                        src={
                          block.preview ||
                          block.url
                        }
                        alt="Imagen del contenido"
                        className="max-h-[600px] w-full object-contain"
                      />
                    </div>
                  )}

                  {block.type === 'video' && (
                    <video
                      src={
                        block.preview ||
                        block.url
                      }
                      controls
                      className="max-h-[600px] w-full rounded-lg bg-black"
                    />
                  )}

                  {block.type ===
                    'image_group' && (
                    <div>
                      <div className="mb-4 rounded-lg border border-sky-500/10 bg-sky-500/[0.03] px-4 py-3">
                        <p className="text-xs font-bold text-sky-400">
                          Contenedor de imágenes
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Estas imágenes se
                          mostrarán como una sola
                          secuencia en la noticia.
                        </p>
                      </div>

                      {block.images.length ===
                        0 && (
                        <div className="rounded-lg border border-dashed border-white/10 p-8 text-center">
                          <p className="text-xs text-slate-500">
                            No hay imágenes en
                            este contenedor.
                          </p>
                        </div>
                      )}

                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {block.images.map(
                          (
                            image,
                            imageIndex
                          ) => (
                            <div
                              key={image.id}
                              className="overflow-hidden rounded-lg border border-white/10 bg-[#030b14]"
                            >
                              <div className="relative">
                                <img
                                  src={
                                    image.preview ||
                                    image.url
                                  }
                                  alt={`Página ${
                                    imageIndex + 1
                                  }`}
                                  className="aspect-[3/4] w-full object-contain bg-black"
                                />

                                <div className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-1 text-[10px] font-bold text-white">
                                  Página{' '}
                                  {imageIndex +
                                    1}
                                </div>
                              </div>

                              <div className="flex items-center justify-between gap-2 p-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    moverImagenDentroDelContenedor(
                                      block.id,
                                      imageIndex,
                                      'left'
                                    )
                                  }
                                  disabled={
                                    imageIndex ===
                                    0
                                  }
                                  className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-slate-300 disabled:opacity-30"
                                >
                                  ←
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    moverImagenDentroDelContenedor(
                                      block.id,
                                      imageIndex,
                                      'right'
                                    )
                                  }
                                  disabled={
                                    imageIndex ===
                                    block.images
                                      .length -
                                      1
                                  }
                                  className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-slate-300 disabled:opacity-30"
                                >
                                  →
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    eliminarImagenDelContenedor(
                                      block.id,
                                      image.id
                                    )
                                  }
                                  className="rounded-md border border-red-500/20 px-3 py-1.5 text-xs text-red-400"
                                >
                                  Quitar
                                </button>
                              </div>
                            </div>
                          )
                        )}
                      </div>

                      <label className="mt-4 inline-flex cursor-pointer rounded-lg border border-white/10 bg-[#030b14] px-4 py-2.5 text-xs font-bold text-white transition hover:border-sky-500/30">
                        + Agregar más páginas

                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(event) =>
                            agregarImagenAlContenedor(
                              block.id,
                              event
                            )
                          }
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </section>

        {/* PUBLICACIÓN */}

        <section className="rounded-xl border border-white/10 bg-[#030b14] p-5">
          <h2 className="mb-5 text-lg font-black uppercase text-white">
            Publicación
          </h2>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={published}
              onChange={(event) =>
                setPublished(
                  event.target.checked
                )
              }
              className="h-4 w-4 rounded border-white/20 bg-[#081b30]"
            />

            <span className="text-sm font-semibold text-slate-300">
              Publicar inmediatamente
            </span>
          </label>
        </section>

        {/* BOTONES */}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() =>
              router.push(
                '/admin/noticias'
              )
            }
            disabled={saving}
            className="rounded-lg border border-white/10 bg-[#081b30] px-6 py-3 text-sm font-bold text-slate-300 transition hover:bg-[#0b2945] disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={guardarNoticia}
            disabled={saving}
            className="rounded-lg bg-sky-600 px-6 py-3 text-sm font-black text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? 'Guardando...'
              : 'Guardar noticia'}
          </button>
        </div>
      </div>
    </div>
  )
}