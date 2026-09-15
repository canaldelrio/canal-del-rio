import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'

export default function ContactSection() {
  return (
    <section className="overflow-hidden rounded-xl border border-white/10 bg-[#030b14]">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="h-6 w-1 rounded-full bg-sky-500" />

          <h2 className="text-xl font-black uppercase tracking-tight">
            Contacto
          </h2>
        </div>

        <p className="mt-1 text-xs text-slate-400">
          Comunícate con Canal del Río
        </p>
      </div>

      <div className="p-5">
        <div className="space-y-3">

          {/* WHATSAPP */}
          <a
            href="https://wa.me/573167897997"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#081b30] p-3 transition hover:border-green-500/30 hover:bg-[#0b2945]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
              <MessageCircle size={19} />
            </div>

            <div>
              <p className="text-xs font-black text-white">
                WhatsApp
              </p>

              <p className="text-[11px] text-slate-400">
                316 789 79 97
              </p>
            </div>
          </a>

          {/* TELÉFONO */}
          <a
            href="tel:+573167897997"
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#081b30] p-3 transition hover:border-sky-500/30 hover:bg-[#0b2945]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
              <Phone size={19} />
            </div>

            <div>
              <p className="text-xs font-black text-white">
                Teléfono
              </p>

              <p className="text-[11px] text-slate-400">
                316 789 79 97
              </p>
            </div>
          </a>

          {/* CORREO */}
          <a
            href="mailto:contacto@canaldelrio.com"
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#081b30] p-3 transition hover:border-sky-500/30 hover:bg-[#0b2945]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
              <Mail size={19} />
            </div>

            <div>
              <p className="text-xs font-black text-white">
                Correo electrónico
              </p>

              <p className="text-[11px] text-slate-400">
                canaldelrio.oficial@gmail.com
              </p>
            </div>
          </a>

          {/* UBICACIÓN */}
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#081b30] p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
              <MapPin size={19} />
            </div>

            <div>
              <p className="text-xs font-black text-white">
                Cobertura 
              </p>

              <p className="text-[11px] text-slate-400">
                Nacional · Internacional · Regional · Local
              </p>
            </div>
          </div>

        </div>

        <div className="mt-4 rounded-lg border border-sky-500/10 bg-sky-500/[0.03] px-4 py-3 text-center">
          <p className="text-[11px] font-semibold text-slate-400">
            Canal del Río
          </p>

          <p className="mt-1 text-[11px] text-slate-500">
            Tu canal, tu comunidad, nuestra voz
          </p>
        </div>
      </div>
    </section>
  )
}