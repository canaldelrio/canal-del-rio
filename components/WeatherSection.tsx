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
    <div className="rounded-lg border border-white/10 bg-[#030b14] p-5">
      <SectionTitle title="El clima" />

      {loading ? (
        <div className="mt-5 text-sm text-slate-400">
          Consultando el clima...
        </div>
      ) : weather ? (
        <>
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CloudSun size={46} />

              <div>
                <div className="text-4xl font-black">
                  {Math.round(weather.temperature)}°C
                </div>

                <div className="text-sm">
                  {getWeatherDescription(weather.weatherCode)}
                </div>
              </div>
            </div>

            <div className="text-right text-xs leading-6">
              <b>Gamarra, Cesar</b>

              <div className="mt-1 flex items-center justify-end gap-1">
                <Droplets size={13} />
                Humedad: {weather.humidity}%
              </div>

              <div className="flex items-center justify-end gap-1">
                <Wind size={13} />
                Viento: {Math.round(weather.wind)} km/h
              </div>
            </div>
          </div>

          <a
  href="/clima"
  className="mt-4 block w-full rounded border border-white/10 py-3 text-center text-sm hover:bg-white/5"
>
  Ver pronóstico completo
</a>
        </>
      ) : (
        <div className="mt-5 text-sm text-red-400">
          No se pudo obtener el clima.
        </div>
      )}
    </div>
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

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="mb-3 flex items-center gap-2 text-xl font-black uppercase">
      <span className="h-5 w-0.5 bg-sky-500" />
      {title}
    </h2>
  )
}