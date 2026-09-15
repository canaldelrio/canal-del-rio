'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { supabase } from '@/lib/supabase/cliente'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [cerrandoSesion, setCerrandoSesion] = useState(false)

  async function cerrarSesion() {
    setCerrandoSesion(true)

    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Error al cerrar sesión:', error)
      setCerrandoSesion(false)
      return
    }

    router.replace('/login')
    router.refresh()
  }

  const enlaces = [
    {
      nombre: 'Noticias',
      href: '/admin/noticias',
      icono: '📰',
    },
    {
      nombre: 'Nueva noticia',
      href: '/admin/noticias/nueva',
      icono: '➕',
    },
  ]

  return (
    <div className="min-h-screen bg-[#020912] text-white">
      <div className="flex min-h-screen">

        {/* MENÚ LATERAL */}
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#030b14] md:flex md:flex-col">

          {/* LOGO */}
          <div className="border-b border-white/10 p-6">
            <div className="text-xs font-black uppercase tracking-[0.2em] text-sky-400">
              Canal del Río
            </div>

            <div className="mt-2 text-xl font-black">
              Administración
            </div>
          </div>

          {/* NAVEGACIÓN */}
          <nav className="flex-1 space-y-2 p-4">
            {enlaces.map((enlace) => {
              const activo =
                pathname === enlace.href ||
                (enlace.href === '/admin/noticias' &&
                  pathname.startsWith('/admin/noticias/editar'))

              return (
                <Link
                  key={enlace.href}
                  href={enlace.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold transition ${
                    activo
                      ? 'bg-sky-600 text-white'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{enlace.icono}</span>
                  <span>{enlace.nombre}</span>
                </Link>
              )
            })}
          </nav>

          {/* PARTE INFERIOR */}
          <div className="border-t border-white/10 p-4">

            {/* VER SITIO */}
            <Link
              href="/"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <span>🏠</span>
              <span>Ver sitio</span>
            </Link>

            {/* CERRAR SESIÓN */}
            <button
              type="button"
              onClick={cerrarSesion}
              disabled={cerrandoSesion}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-bold text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>🚪</span>

              <span>
                {cerrandoSesion
                  ? 'Cerrando sesión...'
                  : 'Cerrar sesión'}
              </span>
            </button>

          </div>
        </aside>

        {/* CONTENIDO */}
        <div className="min-w-0 flex-1">

          {/* BARRA SUPERIOR EN MÓVIL */}
          <div className="flex items-center justify-between border-b border-white/10 bg-[#030b14] px-4 py-4 md:hidden">

            <div>
              <div className="text-xs font-black uppercase tracking-wider text-sky-400">
                Canal del Río
              </div>

              <div className="font-black">
                Administración
              </div>
            </div>

            <button
              type="button"
              onClick={cerrarSesion}
              disabled={cerrandoSesion}
              className="rounded-lg border border-red-500/20 px-3 py-2 text-xs font-bold text-red-400 disabled:opacity-50"
            >
              {cerrandoSesion
                ? 'Saliendo...'
                : 'Cerrar sesión'}
            </button>

          </div>

          {/* PÁGINA */}
          {children}

        </div>
      </div>
    </div>
  )
}