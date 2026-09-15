'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/cliente'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function iniciarSesion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError('')

    if (!email.trim()) {
      setError('Escribe tu correo electrónico.')
      return
    }

    if (!password) {
      setError('Escribe tu contraseña.')
      return
    }

    setLoading(true)

    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (error) {
      console.error(error)

      setError(
        'Correo o contraseña incorrectos. Verifica tus datos e inténtalo nuevamente.'
      )

      setLoading(false)
      return
    }

    router.push('/admin/noticias')
    router.refresh()
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020912] px-4 py-8 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="text-sm font-black uppercase tracking-wider text-sky-400">
            Canal del Río
          </div>

          <h1 className="mt-3 text-4xl font-black">
            Iniciar sesión
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Accede al panel de administración
          </p>
        </div>

        <form
          onSubmit={iniciarSesion}
          className="overflow-hidden rounded-2xl border border-white/10 bg-[#030b14] shadow-2xl"
        >
          <div className="space-y-5 p-6 sm:p-8">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-slate-200"
              >
                Correo electrónico
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@canaldelrio.com"
                className="w-full rounded-lg border border-white/10 bg-[#020912] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-sky-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-bold text-slate-200"
              >
                Contraseña
              </label>

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-white/10 bg-[#020912] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-sky-500"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm font-semibold text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-sky-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-slate-600">
          Canal del Río · Panel administrativo
        </p>
      </div>
    </main>
  )
}