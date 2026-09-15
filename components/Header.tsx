'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Menu, Search, Youtube } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/cliente'

const links = [
  { name: 'Inicio', href: '/' },
  { name: 'Noticias', href: '/noticias' },
  { name: 'En Vivo', href: '/en-vivo' },
  { name: 'Programas', href: '/programas' },
  { name: 'Deportes', href: '/deportes' },
  { name: 'Opinión', href: '/opinion' },
  { name: 'Galería', href: '/galeria' },
  { name: 'Contacto', href: '/contacto' },
  { name: 'Clima', href: '/clima' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [sesionActiva, setSesionActiva] = useState(false)

  useEffect(() => {
    let montado = true

    async function comprobarSesion() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (montado) {
        setSesionActiva(!!session)
      }
    }

    comprobarSesion()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (montado) {
        setSesionActiva(!!session)
      }
    })

    return () => {
      montado = false
      subscription.unsubscribe()
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020b16]/95 backdrop-blur">
      <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-6 lg:px-8">
        {/* LOGO */}
        <Link
          href="/"
          className="relative h-12 w-[190px] shrink-0 overflow-hidden sm:w-[230px]"
        >
          <Image
            src="/images/logo-header.png"
            alt="Canal del Río"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* MENÚ DESKTOP */}
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-[15px] transition hover:text-sky-400 ${
                i === 0
                  ? 'border-b-2 border-sky-500 pb-6 pt-6 text-white'
                  : 'text-slate-200'
              }`}
            >
              {link.name}
            </a>
          ))}

          {/* SOLO USUARIO AUTENTICADO */}
          {sesionActiva && (
            <Link
              href="/admin/noticias"
              className="rounded-lg bg-sky-600 px-4 py-2 text-[15px] font-bold text-white transition hover:bg-sky-500"
            >
              Administración
            </Link>
          )}
        </nav>

        {/* ICONOS */}
        <div className="hidden items-center gap-4 md:flex">
          <Facebook size={18} className="text-blue-500" />
          <Youtube size={18} className="text-red-500" />
          <Instagram size={18} className="text-pink-400" />
          <span className="text-lg font-bold text-white">♪</span>
          <span className="mx-1 h-5 w-px bg-white/10" />
          <Search size={22} />
        </div>

        {/* BOTÓN MENÚ MÓVIL */}
        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          <Menu />
        </button>
      </div>

      {/* MENÚ MÓVIL */}
      {open && (
        <div className="border-t border-white/10 bg-[#020b16] px-6 py-4 lg:hidden">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-slate-200 transition hover:text-sky-400"
            >
              {link.name}
            </a>
          ))}

          {/* SOLO USUARIO AUTENTICADO */}
          {sesionActiva && (
            <Link
              href="/admin/noticias"
              onClick={() => setOpen(false)}
              className="mt-3 block rounded-lg bg-sky-600 px-4 py-3 text-center font-bold text-white transition hover:bg-sky-500"
            >
              Administración
            </Link>
          )}
        </div>
      )}
    </header>
  )
}