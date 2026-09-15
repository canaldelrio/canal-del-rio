'use client'

import { CloudSun, Droplets, Wind } from 'lucide-react'
import { useEffect, useState } from 'react'

type WeatherData = {
  temperature: number
  humidity: number
  wind: number
  weatherCode: number
}

export default function WeatherSection() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getWeather() {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=8.3236&longitude=-73.7163&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=America%2FBogota'
        )

        const data = await response.json()

        setWeather({
          temperature: data.current.temperature_2m,
          humidity: data.current.relative_humidity_2m,
          wind: data.current.wind_speed_10m,
          weatherCode: data.current.weather_code,
        })
      } catch (error) {
        console.error('Error obteniendo el clima:', error)
      } finally {
        setLoading(false)
      }
    }

    getWeather()
  }, [])

  return (
    <section className="overflow-hidden rounded-xl border border-white/10 bg-[#030b14]">
      {/* ENCABEZADO */}
      <div className="border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="h-6 w-1 rounded-full bg-sky-500" />

          <h2 className="text-xl font-black uppercase tracking-tight">
            El clima
          </h2>
        </div>

        <p className="mt-1 text-xs text-slate-400">
          Condiciones actuales en nuestra región
        </p>
      </div>

      {loading ? (
        <div className="p-5 text-sm text-slate-400">
          Consultando el clima...
        </div>
      ) : weather ? (
        <div className="p-5">
          {/* TEMPERATURA */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-sky-500/10 p-3">
                <CloudSun
                  size={42}
                  className="text-sky-400"
                />
              </div>

              <div>
                <div className="text-4xl font-black leading-none">
                  {Math.round(weather.temperature)}°C
                </div>

                <div className="mt-2 text-sm font-medium text-slate-300">
                  {getWeatherDescription(weather.weatherCode)}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-bold">
                Gamarra
              </div>

              <div className="text-xs text-slate-400">
                Cesar
              </div>
            </div>
          </div>

          {/* DATOS */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Droplets size={14} className="text-sky-400" />
                Humedad
              </div>

              <div className="mt-1 text-sm font-bold">
                {weather.humidity}%
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Wind size={14} className="text-sky-400" />
                Viento
              </div>

              <div className="mt-1 text-sm font-bold">
                {Math.round(weather.wind)} km/h
              </div>
            </div>
          </div>

          {/* BOTÓN */}
          <a
            href="/clima"
            className="mt-4 block w-full rounded-lg border border-sky-500/30 py-3 text-center text-sm font-bold transition hover:border-sky-500/60 hover:bg-sky-500/10"
          >
            Ver pronóstico completo →
          </a>
        </div>
      ) : (
        <div className="p-5 text-sm text-red-400">
          No se pudo obtener el clima.
        </div>
      )}
    </section>
  )
}

function getWeatherDescription(code: number) {
  if (code === 0) return 'Despejado'
  if (code <= 3) return 'Parcialmente nublado'
  if (code <= 48) return 'Nublado'
  if (code <= 57) return 'Llovizna'
  if (code <= 67) return 'Lluvia'
  if (code <= 77) return 'Nieve'
  if (code <= 82) return 'Chubascos'
  if (code <= 86) return 'Chubascos fuertes'
  if (code >= 95) return 'Tormenta'
  return 'Condiciones variables'
}