import Header from '@/components/Header'
import ContactSection from '@/components/ContactSection'

export default function ContactoPage() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-b-xl border-x border-b border-white/10 bg-[#030b14] px-6 py-12 sm:px-10 lg:py-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-sky-400">
              Canal del Río
            </span>

            <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              Estamos para escucharte
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              ¿Tienes una noticia, una denuncia, una propuesta comercial o
              quieres comunicarte con nuestro equipo? Estamos disponibles
              para recibir tus mensajes.
            </p>
          </div>
        </section>

        <section className="mt-7 grid gap-7 lg:grid-cols-[1fr_380px]">
          <div className="rounded-xl border border-white/10 bg-[#030b14] p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <span className="h-6 w-1 rounded-full bg-sky-500" />

              <h2 className="text-xl font-black uppercase tracking-tight">
                Comunícate con nosotros
              </h2>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Canal del Río es un medio regional comprometido con informar,
              conectar y dar voz a nuestra comunidad.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#07182a] p-5">
                <h3 className="text-sm font-black text-white">
                  Noticias
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Envíanos información, fotografías o videos sobre hechos
                  que estén ocurriendo en tu comunidad.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#07182a] p-5">
                <h3 className="text-sm font-black text-white">
                  Publicidad
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Comunícate con nosotros para conocer nuestras opciones
                  comerciales y espacios publicitarios.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#07182a] p-5">
                <h3 className="text-sm font-black text-white">
                  Radio
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  También puedes comunicarte con nuestro equipo para
                  información relacionada con Canal del Río Radio.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#07182a] p-5">
                <h3 className="text-sm font-black text-white">
                  Alianzas
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Estamos abiertos a proyectos, alianzas y propuestas que
                  aporten a nuestra región.
                </p>
              </div>
            </div>
          </div>

          <aside>
            <ContactSection />
          </aside>
        </section>
      </main>
    </>
  )
}