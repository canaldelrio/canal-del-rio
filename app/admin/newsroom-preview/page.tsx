"use client";

import { useState } from "react";

type MenuItem = {
  label: string;
  icon: string;
};

const menuMain: MenuItem[] = [
  { label: "Dashboard", icon: "▦" },
  { label: "Noticias", icon: "▤" },
  { label: "Redactar noticias", icon: "✎" },
  { label: "Medios / Archivos", icon: "▧" },
  { label: "Corresponsales", icon: "◎" },
  { label: "Métricas", icon: "◔" },
  { label: "Programación", icon: "◷" },
  { label: "IA Newsroom", icon: "✦" },
];

const menuAdmin: MenuItem[] = [
  { label: "Categorías", icon: "▦" },
  { label: "Marca y diseño", icon: "◇" },
  { label: "Configuración", icon: "⚙" },
];

const latestNews = [
  {
    category: "POLÍTICA",
    status: "EN VIVO",
    title:
      "Congreso aprueba monto de $634,9 billones para el Presupuesto de 2027",
    location: "Bogotá",
    time: "Hace 12 min",
    views: "2.4K",
    comments: "86",
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=600&q=80",
  },
  {
    category: "SEGURIDAD",
    status: "URGENTE",
    title:
      "Autoridades adelantan operativo de seguridad en el sur del Cesar",
    location: "Aguachica",
    time: "Hace 28 min",
    views: "1.8K",
    comments: "54",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
  },
  {
    category: "DEPORTES",
    status: "NUEVO",
    title: "Gamarra suma medallas y destaca en el atletismo juvenil",
    location: "Gamarra",
    time: "Hace 1 h",
    views: "1.2K",
    comments: "31",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80",
  },
];

function LatestNews() {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-sky-600">
            Actualidad
          </p>

          <h2 className="mt-1 text-lg font-black tracking-tight text-slate-900">
            Últimas noticias
          </h2>
        </div>

        <button
          type="button"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-black uppercase tracking-wide text-slate-600 transition hover:border-sky-200 hover:text-sky-600"
        >
          Ver todas
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {latestNews.map((news) => (
          <article
            key={news.title}
            className="grid grid-cols-[88px_minmax(0,1fr)] gap-3 px-4 py-3 transition hover:bg-slate-50"
          >
            <div className="relative h-[88px] w-[88px] overflow-hidden rounded-xl bg-slate-100">
              <img
                src={news.image}
                alt={news.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />

              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-sky-50 px-2 py-1 text-[9px] font-black uppercase tracking-wide text-sky-700">
                  {news.category}
                </span>

                <span className="rounded-md bg-slate-100 px-2 py-1 text-[9px] font-black uppercase tracking-wide text-slate-500">
                  {news.status}
                </span>
              </div>

              <h3 className="mt-2 line-clamp-2 text-sm font-black leading-snug text-slate-900">
                {news.title}
              </h3>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold text-slate-400">
                <span>📍 {news.location}</span>
                <span>{news.time}</span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-500">
                  ◉ {news.views} visualizaciones
                </span>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-500">
                  ◌ {news.comments} comentarios
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const municipalities = [
  "Gamarra",
  "Aguachica",
  "La Gloria",
  "Río Viejo",
  "San Alberto",
];

function SidebarItem({
  item,
  active = false,
  onClick,
}: {
  item: MenuItem;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[12px] font-bold transition ${
        active
          ? "bg-sky-500/15 text-sky-300"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm ${
          active
            ? "bg-sky-500/15 text-sky-300"
            : "bg-white/5 text-slate-500 group-hover:text-slate-300"
        }`}
      >
        {item.icon}
      </span>

      <span>{item.label}</span>
    </button>
  );
}

function MetricCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string;
  icon: string;
  accent: string;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black ${accent}`}
        >
          {icon}
        </div>

        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          Hoy
        </span>
      </div>

      <div className="mt-4">
        <div className="text-2xl font-black tracking-tight text-slate-900">
          {value}
        </div>

        <div className="mt-1 text-[11px] font-bold text-slate-500">
          {label}
        </div>
      </div>
    </div>
  );
}

function EditorPanel() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-black text-slate-900">
            Editor de noticias
          </h2>

          <p className="mt-1 text-[10px] font-semibold text-slate-400">
            Construye la noticia por bloques
          </p>
        </div>

        <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wide text-slate-500">
          Borrador
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <label className="mb-1.5 block text-[10px] font-black uppercase tracking-wide text-slate-500">
            Titular
          </label>

          <input
            type="text"
            placeholder="Escribe el titular de la noticia..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[10px] font-black uppercase tracking-wide text-slate-500">
            Entradilla
          </label>

          <textarea
            rows={3}
            placeholder="Resume la información principal..."
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-semibold leading-5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[10px] font-black uppercase tracking-wide text-slate-500">
            Imagen principal
          </label>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-[10px] font-black text-slate-500 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
          >
            <span className="text-base">▧</span>
            Seleccionar imagen principal
          </button>
        </div>

        <div>
          <label className="mb-1.5 block text-[10px] font-black uppercase tracking-wide text-slate-500">
            Contenido
          </label>

          <textarea
            rows={5}
            placeholder="Escribe el desarrollo de la noticia..."
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-semibold leading-5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[10px] font-black text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
          >
            + Agregar texto
          </button>

          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[10px] font-black text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
          >
            + Agregar imagen / video
          </button>

          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[10px] font-black text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
          >
            + Contenedor de imágenes
          </button>
        </div>
      </div>
    </div>
  );
}

function PreviewPanel() {
  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-black text-slate-900">
            Vista previa
          </h2>

          <p className="mt-1 text-[10px] font-semibold text-slate-400">
            Así verá la noticia tu audiencia
          </p>
        </div>

        <span className="rounded-lg bg-white px-2.5 py-1.5 text-[9px] font-black text-slate-500 shadow-sm">
          WEB
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex h-32 items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-sky-900">
          <div className="text-center">
            <div className="text-3xl font-black text-white/20">CDR</div>

            <div className="mt-1 text-[9px] font-black uppercase tracking-[0.2em] text-white/50">
              Imagen principal
            </div>
          </div>
        </div>

        <div className="p-5">
          <span className="rounded-md bg-sky-50 px-2 py-1 text-[9px] font-black text-sky-700">
            REGIÓN
          </span>

          <h3 className="mt-3 text-lg font-black leading-6 text-slate-900">
            El titular de la noticia aparecerá aquí
          </h3>

          <p className="mt-3 text-[11px] font-semibold leading-5 text-slate-500">
            La entradilla de la noticia se visualizará en este espacio antes
            del desarrollo completo de la información.
          </p>

          <div className="mt-4 border-t border-slate-100 pt-3 text-[9px] font-bold text-slate-400">
            Canal del Río · Gamarra, Cesar
          </div>
        </div>
      </div>
    </div>
  );
}

function EditorialCenter() {
  const [showAiEditor, setShowAiEditor] = useState(false);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-500" />

            <h2 className="text-sm font-black text-slate-900">
              Centro Editorial
            </h2>
          </div>

          <p className="mt-1 text-[10px] font-semibold text-slate-400">
            Redacción, edición y publicación de contenidos
          </p>
        </div>

        <span className="hidden rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[9px] font-black text-slate-500 sm:block">
          NEWSROOM
        </span>
      </div>

      {showAiEditor && (
        <div className="mb-4 rounded-2xl border border-sky-200 bg-sky-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-sm font-black text-white">
              ✦
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-xs font-black text-sky-900">
                Editor de noticias con IA
              </div>

              <p className="mt-1 text-[10px] font-semibold leading-4 text-sky-700">
                Aquí se abrirá el flujo para generar el titular, entradilla,
                estructura y contenido de la noticia con inteligencia
                artificial.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="rounded-lg bg-white px-3 py-2 text-[9px] font-black text-sky-700 shadow-sm transition hover:bg-sky-100"
                >
                  Generar estructura
                </button>

                <button
                  type="button"
                  onClick={() => setShowAiEditor(false)}
                  className="rounded-lg border border-sky-200 px-3 py-2 text-[9px] font-black text-sky-700 transition hover:bg-white"
                >
                  Cerrar IA
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid w-full min-w-0 grid-cols-1 gap-4 2xl:grid-cols-2">
        <EditorPanel />
        <PreviewPanel />

        <div className="col-span-1 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end 2xl:col-span-2">
          <button
            type="button"
            onClick={() => setShowAiEditor(true)}
            className="rounded-xl border border-sky-200 bg-sky-50 px-5 py-3 text-xs font-black text-sky-700 transition hover:border-sky-300 hover:bg-sky-100"
          >
            ✦ Generar con IA
          </button>

          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-black text-slate-600 transition hover:border-sky-300 hover:text-sky-600"
          >
            Guardar borrador
          </button>

          <button
            type="button"
            className="rounded-xl bg-sky-600 px-6 py-3 text-xs font-black text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700"
          >
            ✓ Publicar noticia
          </button>
        </div>
      </div>
    </section>
  );
}

function CorrespondentsPanel() {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-black text-slate-900">
              Red de corresponsales
            </h2>

            <p className="mt-1 text-[10px] font-semibold text-slate-400">
              Cobertura territorial
            </p>
          </div>

          <span className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[9px] font-black text-emerald-600">
            5 activos
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="relative h-44 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
          <div className="absolute inset-0 opacity-40">
            <div className="h-full w-full bg-[radial-gradient(circle_at_30%_35%,rgba(14,165,233,.28),transparent_24%),radial-gradient(circle_at_65%_55%,rgba(15,23,42,.16),transparent_26%),linear-gradient(135deg,#e2e8f0,#f8fafc)]" />
          </div>

          <div className="absolute left-[34%] top-[23%] h-3 w-3 rounded-full border-2 border-white bg-sky-600 shadow-lg" />

          <span className="absolute left-[38%] top-[19%] rounded-md bg-white px-2 py-1 text-[8px] font-black text-slate-700 shadow-sm">
            Gamarra
          </span>

          <div className="absolute left-[57%] top-[38%] h-3 w-3 rounded-full border-2 border-white bg-sky-600 shadow-lg" />

          <span className="absolute left-[61%] top-[34%] rounded-md bg-white px-2 py-1 text-[8px] font-black text-slate-700 shadow-sm">
            Aguachica
          </span>

          <div className="absolute left-[29%] top-[62%] h-3 w-3 rounded-full border-2 border-white bg-sky-600 shadow-lg" />

          <span className="absolute left-[33%] top-[58%] rounded-md bg-white px-2 py-1 text-[8px] font-black text-slate-700 shadow-sm">
            La Gloria
          </span>

          <div className="absolute left-[70%] top-[69%] h-3 w-3 rounded-full border-2 border-white bg-sky-600 shadow-lg" />

          <span className="absolute left-[45%] top-[75%] rounded-md bg-white px-2 py-1 text-[8px] font-black text-slate-700 shadow-sm">
            Río Viejo
          </span>

          <div className="absolute left-[79%] top-[27%] h-3 w-3 rounded-full border-2 border-white bg-sky-600 shadow-lg" />

          <span className="absolute left-[62%] top-[21%] rounded-md bg-white px-2 py-1 text-[8px] font-black text-slate-700 shadow-sm">
            San Alberto
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {municipalities.map((municipality) => (
            <span
              key={municipality}
              className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[8px] font-black text-slate-500"
            >
              {municipality}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function AgendaPanel() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-black text-slate-900">
            Agenda / Programación
          </h2>

          <p className="mt-1 text-[10px] font-semibold text-slate-400">
            Próximas coberturas
          </p>
        </div>

        <span className="rounded-lg bg-sky-50 px-2 py-1 text-[9px] font-black text-sky-700">
          3
        </span>
      </div>

      <div className="mt-4 space-y-2.5">
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="text-[9px] font-black text-sky-600">
            HOY · 7:00 PM
          </div>

          <div className="mt-1 text-[10px] font-black text-slate-700">
            Informe regional de seguridad
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <div className="text-[9px] font-black text-sky-600">
            MAÑANA · 9:00 AM
          </div>

          <div className="mt-1 text-[10px] font-black text-slate-700">
            Seguimiento a noticias del Cesar
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <div className="text-[9px] font-black text-sky-600">
            18 SEP · 3:00 PM
          </div>

          <div className="mt-1 text-[10px] font-black text-slate-700">
            Cobertura deportiva regional
          </div>
        </div>
      </div>
    </section>
  );
}

function TrendsPanel() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-sm font-black text-slate-900">
          Tendencias / Temas calientes
        </h2>

        <p className="mt-1 text-[10px] font-semibold text-slate-400">
          Lo que está generando conversación
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {[
          ["#Cesar", "12.8K"],
          ["#Seguridad", "9.6K"],
          ["#Gamarra", "7.4K"],
          ["#Elecciones", "6.1K"],
        ].map(([tag, value], index) => (
          <div
            key={tag}
            className="flex items-center justify-between border-b border-slate-100 pb-2.5 last:border-0"
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-400">
                0{index + 1}
              </span>

              <span className="text-[10px] font-black text-slate-700">
                {tag}
              </span>
            </div>

            <span className="text-[9px] font-black text-sky-600">
              {value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function AlDiaPanel() {
  return (
    <section className="relative min-h-[250px] overflow-hidden rounded-2xl bg-slate-950 p-5 shadow-sm">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(14,165,233,.28),transparent_32%),linear-gradient(135deg,#020617,#0f172a_55%,#075985)]" />

      <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full border border-white/10" />

      <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border border-white/5" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[9px] font-black text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              En vivo
            </span>

            <span className="text-[9px] font-black text-sky-300">
              RADIO / STREAMING
            </span>
          </div>

          <div className="mt-8">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-300">
              Canal del Río
            </div>

            <div className="mt-1 text-3xl font-black tracking-tight text-white">
              Al Día
            </div>

            <p className="mt-2 max-w-[220px] text-[10px] font-semibold leading-4 text-slate-400">
              Información regional, actualidad y las noticias que están
              marcando la jornada.
            </p>
          </div>
        </div>

        <div>
          <div className="mb-4 flex h-8 items-end gap-1">
            {[12, 20, 9, 28, 16, 24, 12, 30, 18, 25, 14, 22].map(
              (height, index) => (
                <span
                  key={index}
                  className="w-1.5 rounded-full bg-sky-400/70"
                  style={{ height }}
                />
              ),
            )}
          </div>

          <button
            type="button"
            className="rounded-xl bg-white px-5 py-2.5 text-[10px] font-black text-slate-900 shadow-lg transition hover:bg-sky-50"
          >
            ▶ &nbsp; Sintonízate
          </button>
        </div>
      </div>
    </section>
  );
}

function BottomModules() {
  return (
    <div className="grid w-full min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <CorrespondentsPanel />
      <AgendaPanel />
      <TrendsPanel />
      <AlDiaPanel />
    </div>
  );
}

function SearchBox() {
  return (
    <div className="hidden w-full max-w-sm md:block">
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
        <span className="text-sm text-slate-400">⌕</span>

        <input
          type="text"
          placeholder="Buscar noticias, medios..."
          className="w-full bg-transparent text-xs font-semibold text-slate-700 outline-none placeholder:text-slate-400"
        />

        <span className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[8px] font-black text-slate-400">
          /
        </span>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="min-h-[76px] border-b border-slate-200 bg-white">
      <div className="flex min-h-[76px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <div className="truncate text-sm font-black tracking-tight text-slate-900 sm:text-base">
            CANAL DEL RÍO{" "}
            <span className="font-medium text-sky-500">| NEWSROOM</span>
          </div>

          <div className="mt-1 truncate text-[9px] font-bold text-slate-400 sm:text-[10px]">
            Sala de redacción | Información que conecta
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <SearchBox />

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600"
          >
            ♢
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-2 transition hover:border-sky-200 hover:bg-sky-50 sm:px-3"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-[9px] font-black text-white">
              CR
            </span>

            <span className="hidden text-left sm:block">
              <span className="block text-[10px] font-black text-slate-800">
                Editor
              </span>

              <span className="block text-[8px] font-semibold text-slate-400">
                Canal del Río
              </span>
            </span>

            <span className="text-[9px] text-slate-400">⌄</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Sidebar({
  activePanel,
  onPanelChange,
}: {
  activePanel: string;
  onPanelChange: (panel: string) => void;
}) {
  return (
    <aside className="hidden w-[250px] shrink-0 flex-col bg-slate-950 lg:flex">
      <div className="flex min-h-[76px] items-center border-b border-white/5 px-5">
        <div>
          <div className="text-sm font-black tracking-tight text-white">
            CANAL DEL RÍO
          </div>

          <div className="mt-1 text-[9px] font-black uppercase tracking-[0.2em] text-sky-400">
            NEWSROOM
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5">
        <div className="mb-2 px-3 text-[8px] font-black uppercase tracking-[0.2em] text-slate-600">
          Principal
        </div>

        <div className="space-y-1">
          {menuMain.map((item) => (
            <SidebarItem
              key={item.label}
              item={item}
              active={activePanel === item.label}
              onClick={() => onPanelChange(item.label)}
            />
          ))}
        </div>

        <div className="my-5 h-px bg-white/5" />

        <div className="mb-2 px-3 text-[8px] font-black uppercase tracking-[0.2em] text-slate-600">
          Administración
        </div>

        <div className="space-y-1">
          {menuAdmin.map((item) => (
            <SidebarItem
              key={item.label}
              item={item}
              active={activePanel === item.label}
              onClick={() => onPanelChange(item.label)}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 p-4">
        <div className="rounded-2xl bg-white/[0.04] p-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />

            <span className="text-[9px] font-black text-slate-300">
              Sistema operativo
            </span>
          </div>

          <div className="mt-2 text-[8px] font-semibold leading-4 text-slate-500">
            Todas las herramientas editoriales están disponibles.
          </div>
        </div>
      </div>
    </aside>
  );
}

function DashboardContent() {
  return (
    <main className="min-w-0 flex-1 bg-slate-50">
      <div className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-600">
                Dashboard
              </div>

              <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Centro de noticias
              </h1>

              <p className="mt-2 max-w-2xl text-xs font-semibold leading-5 text-slate-500">
                Administra la producción editorial, cobertura regional y
                publicación de contenidos de Canal del Río.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="text-[8px] font-black uppercase tracking-wide text-slate-400">
                Estado editorial
              </div>

              <div className="mt-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                <span className="text-[10px] font-black text-slate-700">
                  Operación normal
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid w-full min-w-0 grid-cols-12 gap-4">
          <div className="col-span-12 min-w-0 xl:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              <MetricCard
                label="En vivo"
                value="04"
                icon="●"
                accent="bg-red-50 text-red-500"
              />

              <MetricCard
                label="Borradores"
                value="12"
                icon="✎"
                accent="bg-amber-50 text-amber-500"
              />

              <MetricCard
                label="Publicadas"
                value="38"
                icon="✓"
                accent="bg-emerald-50 text-emerald-500"
              />

              <MetricCard
                label="Corresponsales"
                value="05"
                icon="◎"
                accent="bg-sky-50 text-sky-600"
              />
            </div>

            <div className="mt-4">
              <LatestNews />
            </div>
          </div>

          <div className="col-span-12 min-w-0 xl:col-span-7">
            <EditorialCenter />
          </div>
        </div>

        <div className="mt-4">
          <BottomModules />
        </div>
      </div>
    </main>
  );
}
function NewsPanel() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todas");

  const demoNews = [
    {
      id: 1,
      title: "Gamarra fortalece sus procesos comunitarios con nuevas iniciativas",
      category: "Gamarra",
      status: "Publicada",
      date: "16 Sep 2026",
      views: "1.284",
      comments: "38",
    },
    {
      id: 2,
      title: "Academia Gamarra avanza en la competencia regional",
      category: "Deportes",
      status: "Publicada",
      date: "16 Sep 2026",
      views: "942",
      comments: "21",
    },
    {
      id: 3,
      title: "Autoridades realizan nuevo Consejo de Seguridad",
      category: "Seguridad",
      status: "Programada",
      date: "17 Sep 2026",
      views: "—",
      comments: "—",
    },
    {
      id: 4,
      title: "Canal del Río prepara nueva cobertura informativa",
      category: "Actualidad",
      status: "Borrador",
      date: "16 Sep 2026",
      views: "—",
      comments: "—",
    },
  ];

  const filteredNews = demoNews.filter((news) => {
    const matchesSearch = news.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "Todas" || news.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statusClasses: Record<string, string> = {
    Publicada: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Programada: "bg-sky-50 text-sky-700 border-sky-200",
    Borrador: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <main className="min-w-0 flex-1 bg-slate-50">
      <div className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-600">
              Centro editorial
            </div>

            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Noticias
            </h1>

            <p className="mt-2 max-w-2xl text-xs font-semibold leading-5 text-slate-500">
              Administra, consulta y organiza las publicaciones de Canal del
              Río.
            </p>
          </div>

          <button
            type="button"
            onClick={() => alert("Aquí se abrirá el redactor de noticias.")}
            className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-5 py-3 text-xs font-black text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700"
          >
            + Nueva noticia
          </button>
        </div>

        {/* Metrics */}
        <div className="mb-5 grid grid-cols-2 gap-4 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Total
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900">
              128
            </div>
            <div className="mt-1 text-[10px] font-semibold text-slate-400">
              Noticias registradas
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
              Publicadas
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900">
              96
            </div>
            <div className="mt-1 text-[10px] font-semibold text-slate-400">
              Visibles al público
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-600">
              Borradores
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900">
              24
            </div>
            <div className="mt-1 text-[10px] font-semibold text-slate-400">
              Pendientes de edición
            </div>
          </div>

          <div className="rounded-2xl border border-sky-200 bg-white p-4 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-wider text-sky-600">
              Programadas
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900">
              8
            </div>
            <div className="mt-1 text-[10px] font-semibold text-slate-400">
              Próximas publicaciones
            </div>
          </div>
        </div>

        {/* Main card */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Filters */}
          <div className="border-b border-slate-100 p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative min-w-0 flex-1">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  ⌕
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar noticias..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-xs font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
              >
                <option>Todas</option>
                <option>Publicada</option>
                <option>Programada</option>
                <option>Borrador</option>
              </select>
            </div>
          </div>

          {/* News list */}
          <div className="divide-y divide-slate-100">
            {filteredNews.length > 0 ? (
              filteredNews.map((news) => (
                <article
                  key={news.id}
                  className="p-4 transition hover:bg-slate-50 sm:p-5"
                >
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-slate-500">
                          {news.category}
                        </span>

                        <span
                          className={`rounded-lg border px-2.5 py-1 text-[9px] font-black ${
                            statusClasses[news.status]
                          }`}
                        >
                          {news.status}
                        </span>
                      </div>

                      <h2 className="text-sm font-black leading-6 text-slate-900 sm:text-base">
                        {news.title}
                      </h2>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-semibold text-slate-400">
                        <span>{news.date}</span>
                        <span>◉ {news.views} visualizaciones</span>
                        <span>◌ {news.comments} comentarios</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          alert(`Vista previa: ${news.title}`)
                        }
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[10px] font-black text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600"
                      >
                        Ver
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          alert(`Editar: ${news.title}`)
                        }
                        className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-[10px] font-black text-sky-600 transition hover:bg-sky-100"
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          alert(`Eliminar: ${news.title}`)
                        }
                        className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[10px] font-black text-red-600 transition hover:bg-red-100"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="px-5 py-12 text-center">
                <div className="text-2xl">⌕</div>

                <div className="mt-3 text-sm font-black text-slate-800">
                  No encontramos noticias
                </div>

                <div className="mt-1 text-xs font-semibold text-slate-400">
                  Prueba con otro término o cambia el filtro.
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function ConfigurationPanel() {
  const [mediaName, setMediaName] = useState("Canal del Río");
  const [slogan, setSlogan] = useState(
    "Tu canal, tu comunidad, nuestra voz."
  );
  const [description, setDescription] = useState(
    "Medio de comunicación regional con información de actualidad, noticias, comunidad y servicio público."
  );
  const [location, setLocation] = useState("Gamarra, Cesar, Colombia");
  const [email, setEmail] = useState("canaldelrio.oficial@gmail.com");
  const [whatsapp, setWhatsapp] = useState("3167897997");
  const [country, setCountry] = useState("Colombia");
  const [language, setLanguage] = useState("Español");
  const [timezone, setTimezone] = useState("America/Bogota");
  const [siteStatus, setSiteStatus] = useState("Activo");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleReset = () => {
    setMediaName("Canal del Río");
    setSlogan("Tu canal, tu comunidad, nuestra voz.");
    setDescription(
      "Medio de comunicación regional con información de actualidad, noticias, comunidad y servicio público."
    );
    setLocation("Gamarra, Cesar, Colombia");
    setEmail("canaldelrio.oficial@gmail.com");
    setWhatsapp("3167897997");
    setCountry("Colombia");
    setLanguage("Español");
    setTimezone("America/Bogota");
    setSiteStatus("Activo");
    setSaved(false);
  };

  return (
    <main className="min-w-0 flex-1 bg-slate-50">
      <div className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-600">
            Administración
          </div>

          <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Configuración
          </h1>

          <p className="mt-2 max-w-2xl text-xs font-semibold leading-5 text-slate-500">
            Administra las preferencias generales de Canal del Río | NEWSROOM.
          </p>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-lg text-sky-600">
                ⚙
              </div>

              <div>
                <h2 className="text-sm font-black text-slate-900">
                  Configuración general
                </h2>

                <p className="mt-1 text-[10px] font-semibold text-slate-400">
                  Información principal y preferencias del medio.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-2">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Nombre del medio
                </label>

                <input
                  type="text"
                  value={mediaName}
                  onChange={(e) => setMediaName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Slogan
                </label>

                <input
                  type="text"
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Descripción
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold leading-6 text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Ubicación
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Correo electrónico
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-500">
                  WhatsApp
                </label>

                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-500">
                  País
                </label>

                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-500">
                    Idioma
                  </label>

                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                  >
                    <option>Español</option>
                    <option>Inglés</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-500">
                    Zona horaria
                  </label>

                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                  >
                    <option value="America/Bogota">America/Bogota</option>
                    <option value="America/New_York">
                      America/New_York
                    </option>
                    <option value="America/Los_Angeles">
                      America/Los_Angeles
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Estado del sitio
                </label>

                <select
                  value={siteStatus}
                  onChange={(e) => setSiteStatus(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                >
                  <option value="Activo">Activo</option>
                  <option value="Mantenimiento">Mantenimiento</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="min-h-[20px] text-xs font-bold text-emerald-600">
              {saved && "✓ Cambios guardados correctamente."}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-black text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Restablecer
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="rounded-xl bg-sky-600 px-5 py-2.5 text-xs font-black text-white shadow-sm transition hover:bg-sky-700 hover:shadow-md"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function NewsroomPreviewPage() {
  const [activePanel, setActivePanel] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        activePanel={activePanel}
        onPanelChange={setActivePanel}
      />

      <div className="min-w-0 flex-1">
        <Header />

        {activePanel === "Configuración" ? (
          <ConfigurationPanel />
        ) : (
          <DashboardContent />
        )}
      </div>
    </div>
  );
}