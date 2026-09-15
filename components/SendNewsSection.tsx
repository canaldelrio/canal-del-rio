import { MessageCircle, Send } from 'lucide-react'

export default function SendNewsSection() {
  return (
    <div className="rounded-lg bg-gradient-to-br from-[#0a315a] to-[#061c35] p-6">
      <SectionTitle title="¿Tienes una noticia?" />

      <p className="text-sm text-slate-200">
        Envíanos tu información, fotos o videos.
        <br />
        Tu comunidad, nuestra voz.
      </p>

     <a
  href="https://wa.me/573167897997?text=📰%20REPORTE%20CIUDADANO%0A━━━━━━━━━━━━━━%0A%0A👤%20Nombre:%0A📍%20Municipio:%0A📌%20Sector%2FBarrio:%0A📰%20Título:%0A📝%20¿Qué%20ocurrió?%0A🕐%20Fecha%20y%20hora:%0A%0A📎%20Evidencia:%0A☐%20Foto%0A☐%20Video"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-4 flex w-fit items-center gap-2 rounded bg-blue-600 px-5 py-3 text-sm font-bold hover:bg-blue-500"
>
  <Send size={15} />
  Enviar noticia
</a>

      <div className="mt-4 flex items-center gap-2 text-lg font-bold">
        <MessageCircle className="text-green-400" />
        316 789 79 97
      </div>
    </div>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="mb-3 flex items-center gap-2 text-xl font-black uppercase">
      <span className="h-5 w-0.5 bg-sky-500" />
      {title}
    </h2>
  )
}