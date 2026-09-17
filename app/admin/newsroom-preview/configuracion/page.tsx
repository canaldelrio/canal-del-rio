"use client";

import { useState } from "react";

const initialSettings = {
  nombre: "Canal del Río",
  slogan: "Tu canal, tu comunidad, nuestra voz.",
  descripcion:
    "Medio de comunicación regional dedicado a informar con responsabilidad sobre los acontecimientos de Gamarra, el sur del Cesar y la región.",
  ubicacion: "Gamarra, Cesar, Colombia",
  correo: "canaldelrio.oficial@gmail.com",
  whatsapp: "3167897997",
  pais: "Colombia",
  idioma: "Español",
  zonaHoraria: "America/Bogota",
  estadoSitio: "Activo",
};

export default function ConfiguracionPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [saved, setSaved] = useState(false);

  const updateField = (field: keyof typeof settings, value: string) => {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleReset = () => {
    setSettings(initialSettings);
    setSaved(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="flex min-h-[76px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div>
            <div className="text-sm font-black tracking-tight text-slate-900 sm:text-base">
              CANAL DEL RÍO{" "}
              <span className="font-medium text-sky-500">
                | CONFIGURACIÓN
              </span>
            </div>

            <div className="mt-1 text-[9px] font-bold text-slate-400 sm:text-[10px]">
              Administración general del Newsroom
            </div>
          </div>

          <a
            href="/admin/newsroom-preview"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[10px] font-black text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600"
          >
            ← Volver al Newsroom
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Intro */}
        <div className="mb-6">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-600">
            Configuración
          </div>

          <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            General
          </h1>

          <p className="mt-2 max-w-2xl text-xs font-semibold leading-5 text-slate-500">
            Administra la información principal de Canal del Río y los
            parámetros generales del Newsroom.
          </p>
        </div>

        {/* Status */}
        {saved && (
          <div className="mb-5 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-sm font-black text-white">
              ✓
            </div>

            <div>
              <div className="text-xs font-black text-emerald-800">
                Cambios guardados correctamente
              </div>

              <div className="mt-0.5 text-[10px] font-semibold text-emerald-600">
                La configuración general ha sido actualizada.
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* General information */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sm font-black text-sky-600">
                  ◇
                </div>

                <div>
                  <h2 className="text-sm font-black text-slate-900">
                    Información del medio
                  </h2>

                  <p className="mt-1 text-[10px] font-semibold text-slate-400">
                    Datos principales de Canal del Río
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              {/* Nombre */}
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wide text-slate-500">
                  Nombre del medio
                </label>

                <input
                  type="text"
                  value={settings.nombre}
                  onChange={(event) =>
                    updateField("nombre", event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                />
              </div>

              {/* Slogan */}
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wide text-slate-500">
                  Slogan
                </label>

                <input
                  type="text"
                  value={settings.slogan}
                  onChange={(event) =>
                    updateField("slogan", event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wide text-slate-500">
                  Descripción del medio
                </label>

                <textarea
                  rows={4}
                  value={settings.descripcion}
                  onChange={(event) =>
                    updateField("descripcion", event.target.value)
                  }
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold leading-5 text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                />
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wide text-slate-500">
                  Ubicación
                </label>

                <input
                  type="text"
                  value={settings.ubicacion}
                  onChange={(event) =>
                    updateField("ubicacion", event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                />
              </div>

              {/* Contact */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-wide text-slate-500">
                    Correo oficial
                  </label>

                  <input
                    type="email"
                    value={settings.correo}
                    onChange={(event) =>
                      updateField("correo", event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-wide text-slate-500">
                    WhatsApp
                  </label>

                  <input
                    type="tel"
                    value={settings.whatsapp}
                    onChange={(event) =>
                      updateField("whatsapp", event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Regional settings */}
          <section className="h-fit rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-sm font-black text-slate-900">
                Preferencias regionales
              </h2>

              <p className="mt-1 text-[10px] font-semibold text-slate-400">
                Parámetros utilizados por el Newsroom
              </p>
            </div>

            <div className="space-y-5 p-5">
              {/* Country */}
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wide text-slate-500">
                  País
                </label>

                <select
                  value={settings.pais}
                  onChange={(event) =>
                    updateField("pais", event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                >
                  <option>Colombia</option>
                  <option>Venezuela</option>
                  <option>Ecuador</option>
                  <option>Panamá</option>
                </select>
              </div>

              {/* Language */}
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wide text-slate-500">
                  Idioma
                </label>

                <select
                  value={settings.idioma}
                  onChange={(event) =>
                    updateField("idioma", event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                >
                  <option>Español</option>
                  <option>English</option>
                </select>
              </div>

              {/* Timezone */}
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wide text-slate-500">
                  Zona horaria
                </label>

                <select
                  value={settings.zonaHoraria}
                  onChange={(event) =>
                    updateField("zonaHoraria", event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                >
                  <option value="America/Bogota">
                    América/Bogotá — Colombia
                  </option>
                  <option value="America/Caracas">
                    América/Caracas — Venezuela
                  </option>
                  <option value="America/Guayaquil">
                    América/Guayaquil — Ecuador
                  </option>
                </select>
              </div>

              {/* Site status */}
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wide text-slate-500">
                  Estado del sitio
                </label>

                <select
                  value={settings.estadoSitio}
                  onChange={(event) =>
                    updateField("estadoSitio", event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                >
                  <option>Activo</option>
                  <option>Mantenimiento</option>
                </select>
              </div>

              <div className="rounded-xl border border-sky-100 bg-sky-50 p-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />

                  <span className="text-[10px] font-black text-sky-900">
                    Estado actual: {settings.estadoSitio}
                  </span>
                </div>

                <p className="mt-2 text-[9px] font-semibold leading-4 text-sky-700">
                  Esta opción posteriormente controlará si el sitio público
                  está disponible o en mantenimiento.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-black text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Restablecer
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-sky-600 px-6 py-3 text-xs font-black text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700"
          >
            ✓ Guardar cambios
          </button>
        </div>
      </main>
    </div>
  );
}