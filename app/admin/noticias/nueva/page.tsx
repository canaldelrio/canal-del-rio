import NuevaNoticia from './NuevaNoticia'

export default function NuevaNoticiaPage() {
  return (
    <main className="min-h-screen bg-[#020912] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-8">
          <div className="text-sm font-black uppercase tracking-wider text-sky-400">
            Canal del Río
          </div>

          <h1 className="mt-2 text-4xl font-black">
            Nueva noticia
          </h1>

          <p className="mt-2 text-slate-400">
            Crea y publica una nueva noticia.
          </p>
        </div>

        <NuevaNoticia />
      </div>
    </main>
  )
}