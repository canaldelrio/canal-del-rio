'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Facebook,
  Instagram,
  Menu,
  Search,
  Youtube,
  X,
} from 'lucide-react'
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020b16]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <Link
          href="/"
          className="relative h-12 w-[180px] shrink-0 sm:w-[220px]"
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
        <nav className="hidden items-center gap-5 xl:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative px-1 py-7 text-[13px] font-semibold text-slate-300 transition hover:text-white"
            >
              {link.name}

              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-sky-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          {sesionActiva && (
            <Link
              href="/admin/noticias"
              className="ml-2 rounded-lg bg-sky-600 px-4 py-2 text-xs font-black text-white transition hover:bg-sky-500"
            >
              Administración
            </Link>
          )}
        </nav>

        {/* REDES + BUSCAR */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://www.facebook.com/CRIO2023"
            aria-label="Facebook"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-500/10 hover:text-blue-400"
          >
            <Facebook size={18} />
          </a>

          <a
            href="https://www.youtube.com/@CANALDELRIO2026"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <Youtube size={18} />
          </a>

          <a
            href="https://www.instagram.com/canaldelrio/"
            aria-label="Instagram"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-pink-500/10 hover:text-pink-400"
          >
            <Instagram size={18} />
          </a>

          <a
            href="https://www.tiktok.com/@canal.del.rio?is_from_webapp=1&sender_device=pc"
            aria-label="TikTok"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-cyan-500/10 hover:text-cyan-400"
          >
            <span className="text-lg font-black">♪</span>
          </a>

          <span className="mx-1 h-6 w-px bg-white/10" />

          <button
            type="button"
            aria-label="Buscar"
            className="rounded-lg p-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <Search size={20} />
          </button>
        </div>

        {/* BOTÓN MENÚ MÓVIL */}
        <button
          type="button"
          className="rounded-lg p-2 text-slate-200 transition hover:bg-white/5 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* MENÚ MÓVIL */}
      {open && (
        <div className="border-t border-white/10 bg-[#020b16] px-4 py-4 shadow-2xl lg:hidden">
          <nav className="mx-auto max-w-[1440px]">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-white/5 py-3 text-sm font-semibold text-slate-300 transition hover:text-sky-400"
              >
                {link.name}
              </Link>
            ))}

            {sesionActiva && (
              <Link
                href="/admin/noticias"
                onClick={() => setOpen(false)}
                className="mt-4 block rounded-lg bg-sky-600 px-4 py-3 text-center text-sm font-black text-white transition hover:bg-sky-500"
              >
                Administración
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}