import Image from 'next/image'
import { Camera, Images } from 'lucide-react'
import Header from '@/components/Header'

const galeria = [
  {
    title: 'Actualidad',
    description: 'Imágenes de los acontecimientos que son noticia.',
    image: '/images/galeria-actualidad.jpg',
  },
  {
    title: 'Nuestra región',
    description: 'Lugares, comunidades y protagonistas de nuestra región.',
    image: '/images/galeria-region.jpg',
  },
  {
    title: 'Eventos',
    description: 'Cobertura visual de eventos y actividades especiales.',
    image: '/images/galeria-eventos.jpg',
  },
  {
    title: 'Canal del Río',
    description: 'Momentos y experiencias de nuestro equipo de trabajo.',
    image: '/images/galeria-canal.jpg',
  },
]

export default function GaleriaPage() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-b-xl border-x border-b border-white/10 bg-[#030b14] px-6 py-12 sm:px-10 lg:py-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="relative max-w-4xl">
            <div className="flex items-center gap-2">
              <Camera size={18} className="text-sky-400" />

              <span className="text-xs font-black uppercase tracking-[0.2em] text-sky-400">
                Canal del Río
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Galería
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Imágenes de nuestra cobertura, nuestros territorios y los
              acontecimientos que hacen parte de la actualidad.
            </p>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="h-6 w-1 rounded-full bg-sky-500" />

              <h2 className="text-xl font-black uppercase tracking-tight">
                Galería de imágenes
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-400">
              Momentos y acontecimientos registrados por Canal del Río
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {galeria.map((item, index) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-xl border border-white/10 bg-[#07182a] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40"
              >
                <div className="relative h-64 overflow-hidden bg-[#0b2945]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#07182a] via-black/20 to-transparent" />

                  <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-xs font-black text-white backdrop-blur-sm">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-md bg-sky-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-white">
                    <Images size={12} />
                    Galería
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-black text-white transition group-hover:text-sky-400">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-xl border border-sky-500/20 bg-gradient-to-r from-[#08274a] to-[#06162b]">
          <div className="px-6 py-7 text-center sm:px-8">
            <Camera
              size={24}
              className="mx-auto text-sky-400"
            />

            <h2 className="mt-3 text-xl font-black text-white">
              Canal del Río en imágenes
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Una mirada visual a las noticias, acontecimientos y momentos
              que hacen parte de nuestra comunidad.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}