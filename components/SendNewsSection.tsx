import { MessageCircle, Send, Camera, Video } from 'lucide-react'

export default function SendNewsSection() {
  return (
    <section className="overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#0a315a] via-[#08274a] to-[#06162b]">
      {/* ENCABEZADO */}
      <div className="border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="h-6 w-1 rounded-full bg-sky-400" />

          <h2 className="text-xl font-black uppercase tracking-tight">
            ¿Tienes una noticia?
          </h2>
        </div>

        <p className="mt-1 text-xs text-slate-300">
          Ayúdanos a contar lo que ocurre en tu comunidad
        </p>
      </div>

      <div className="p-5">
        {/* MENSAJE */}
        <p className="text-sm leading-6 text-slate-200">
          Envíanos información, fotos o videos sobre hechos que estén
          ocurriendo en tu municipio.
        </p>

        {/* EVIDENCIA */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/10 p-3">
            <Camera size={18} className="text-sky-400" />

            <span className="text-xs font-semibold">
              Fotos
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/10 p-3">
            <Video size={18} className="text-sky-400" />

            <span className="text-xs font-semibold">
              Videos
            </span>
          </div>
        </div>

        {/* WHATSAPP */}
        <a
          href="https://wa.me/573167897997?text=%F0%9F%93%B0%20REPORTE%20CIUDADANO%0A%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%E2%94%81%0A%0A%F0%9F%91%A4%20Nombre%3A%0A%F0%9F%93%8D%20Municipio%3A%0A%F0%9F%93%8C%20Sector%2FBarrio%3A%0A%F0%9F%93%B0%20T%C3%ADtulo%3A%0A%F0%9F%93%9D%20%C2%BFQu%C3%A9%20ocurri%C3%B3%3F%0A%F0%9F%95%90%20Fecha%20y%20hora%3A%0A%0A%F0%9F%93%8E%20Evidencia%3A%0A%E2%98%90%20Foto%0A%E2%98%90%20Video"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-black transition hover:bg-green-500"
        >
          <Send size={16} />
          Enviar noticia por WhatsApp
        </a>

        {/* CONTACTO */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <MessageCircle
            size={20}
            className="text-green-400"
          />

          <span className="text-lg font-black tracking-wide">
            316 789 79 97
          </span>
        </div>

        <p className="mt-1 text-center text-[11px] text-slate-400">
          Canal del Río · Tu canal, tu comunidad, nuestra voz
        </p>
      </div>
    </section>
  )
}