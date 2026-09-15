'use client'

import { useEffect, useState } from 'react'
import {
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSun,
  Droplets,
  MapPin,
  Search,
  Sun,
  Wind,
} from 'lucide-react'
import Header from '@/components/Header'

type Location = {
  name: string
  country: string
  admin1?: string
  latitude: number
  longitude: number
}

type WeatherData = {
  current: {
    temperature: number
    humidity: number
    wind: number
    weatherCode: number
  }
  daily: {
    dates: string[]
    max: number[]
    min: number[]
    rain: number[]
    precipitation: number[]
    weatherCode: number[]
  }
}

export default function WeatherPage() {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState<Location>({
    name: 'Gamarra',
    country: 'Colombia',
    admin1: 'Cesar',
    latitude: 8.3236,
    longitude: -73.7163,
  })
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState('')

  async function searchLocation() {
    const query = search.trim()

    if (!query) return

    setSearching(true)
    setError('')

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}&count=1&language=es&format=json`
      )

      const data = await response.json()

      if (!data.results || data.results.length === 0) {
        setError('No encontramos ese lugar. Intenta con otro nombre.')
        return
      }

      const result = data.results[0]

      setLocation({
        name: result.name,
        country: result.country,
        admin1: result.admin1,
        latitude: result.latitude,
        longitude: result.longitude,
      })
    } catch (error) {
      console.error(error)
      setError('No fue posible buscar ese lugar.')
    } finally {
      setSearching(false)
    }
  }

  useEffect(() => {
    async function getWeather() {
      setLoading(true)

      try {
        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}` +
          `&longitude=${location.longitude}` +
          `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code` +
          `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum` +
          `&timezone=auto` +
          `&forecast_days=7`

        const response = await fetch(url)
        const data = await response.json()

        setWeather({
          current: {
            temperature: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            wind: data.current.wind_speed_10m,
            weatherCode: data.current.weather_code,
          },
          daily: {
            dates: data.daily.time,
            max: data.daily.temperature_2m_max,
            min: data.daily.temperature_2m_min,
            rain: data.daily.precipitation_probability_max,
            precipitation: data.daily.precipitation_sum,
            weatherCode: data.daily.weather_code,
          },
        })
      } catch (error) {
        console.error(error)
        setWeather(null)
      } finally {
        setLoading(false)
      }
    }

    getWeather()
  }, [location])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    searchLocation()
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#020912] px-4 pb-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <section className="relative overflow-hidden rounded-b-xl border-x border-b border-white/10 bg-[#030b14] px-6 py-12 sm:px-10 lg:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="relative max-w-4xl">
              <div className="flex items-center gap-2">
                <CloudSun size={18} className="text-sky-400" />

                <span className="text-xs font-black uppercase tracking-[0.2em] text-sky-400">
                  Canal del Río
                </span>
              </div>

              <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                El clima
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Consulta las condiciones meteorológicas actuales y el
                pronóstico de los próximos días en cualquier lugar del mundo.
              </p>
            </div>
          </section>

          <section className="mt-8 relative overflow-hidden rounded-xl border border-white/10 bg-[#030b14] p-5 shadow-xl sm:p-6">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl" />

            <div className="relative">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-5 w-1 rounded-full bg-sky-500" />

                <h2 className="text-sm font-black uppercase tracking-wide">
                  Buscar ubicación
                </h2>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <div className="relative flex-1">
                  <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Ejemplo: Bogotá, Madrid, Miami..."
                    className="h-14 w-full rounded-lg border border-white/10 bg-[#07182a] pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={searching}
                  className="flex h-14 items-center justify-center gap-2 rounded-lg bg-sky-600 px-7 text-sm font-black transition hover:bg-sky-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Search size={18} />

                  {searching ? 'Buscando...' : 'Buscar'}
                </button>
              </form>

              {error && (
                <div className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}
            </div>
          </section>

          {loading ? (
            <div className="mt-8 rounded-xl border border-white/10 bg-[#030b14] p-16 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-sky-500/20 border-t-sky-400" />

              <p className="mt-4 text-sm text-slate-400">
                Consultando información meteorológica...
              </p>
            </div>
          ) : weather ? (
            <>
              <section className="relative mt-8 overflow-hidden rounded-xl border border-sky-500/20 bg-gradient-to-br from-[#0a315a] via-[#071f38] to-[#030b14] p-6 shadow-2xl sm:p-8">
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />

                <div className="relative">
                  <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-300">
                    <MapPin size={17} className="text-sky-400" />

                    <span>
                      {location.name}
                      {location.admin1 && `, ${location.admin1}`}
                      {`, ${location.country}`}
                    </span>
                  </div>

                  <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                      <div className="flex items-center gap-5">
                        <div className="text-sky-300">
                          {getWeatherIcon(
                            weather.current.weatherCode,
                            82
                          )}
                        </div>

                        <div>
                          <div className="text-6xl font-black tracking-tight sm:text-7xl">
                            {Math.round(weather.current.temperature)}°
                            <span className="text-3xl text-slate-300">
                              C
                            </span>
                          </div>

                          <div className="mt-2 text-lg font-semibold text-slate-200">
                            {getWeatherDescription(
                              weather.current.weatherCode
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 text-xs text-slate-400">
                        Condiciones actuales
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:min-w-[420px]">
                      <WeatherStat
                        icon={<Droplets size={21} />}
                        label="Humedad"
                        value={`${weather.current.humidity}%`}
                      />

                      <WeatherStat
                        icon={<Wind size={21} />}
                        label="Viento"
                        value={`${Math.round(weather.current.wind)} km/h`}
                      />

                      <WeatherStat
                        icon={<CloudRain size={21} />}
                        label="Prob. lluvia"
                        value={`${weather.daily.rain[0]}%`}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="mt-8">
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-6 w-1 rounded-full bg-sky-500" />

                      <h2 className="text-xl font-black uppercase tracking-tight">
                        Pronóstico
                      </h2>
                    </div>

                    <p className="mt-1 text-xs text-slate-400">
                      Próximos 7 días para {location.name}
                    </p>
                  </div>

                  <span className="hidden text-xs font-semibold text-slate-500 sm:block">
                    Actualización automática
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
                  {weather.daily.dates.map((date, index) => (
                    <ForecastCard
                      key={date}
                      date={date}
                      max={weather.daily.max[index]}
                      min={weather.daily.min[index]}
                      rain={weather.daily.rain[index]}
                      precipitation={weather.daily.precipitation[index]}
                      weatherCode={weather.daily.weatherCode[index]}
                      today={index === 0}
                    />
                  ))}
                </div>
              </section>

              <div className="mt-8 rounded-xl border border-white/5 bg-[#030b14] px-5 py-4 text-center text-xs text-slate-500">
                Información meteorológica actualizada automáticamente para la
                ubicación seleccionada.
              </div>
            </>
          ) : (
            <div className="mt-8 rounded-xl border border-red-500/20 bg-red-950/20 p-8 text-center text-red-300">
              No fue posible obtener la información meteorológica.
            </div>
          )}
        </div>
      </main>
    </>
  )
}

function WeatherStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4 backdrop-blur-sm transition hover:border-sky-500/30 hover:bg-black/30">
      <div className="text-sky-400">{icon}</div>

      <div className="mt-3 text-xs text-slate-400">{label}</div>

      <div className="mt-1 text-lg font-black">{value}</div>
    </div>
  )
}

function ForecastCard({
  date,
  max,
  min,
  rain,
  precipitation,
  weatherCode,
  today,
}: {
  date: string
  max: number
  min: number
  rain: number
  precipitation: number
  weatherCode: number
  today: boolean
}) {
  return (
    <div
      className={`group rounded-xl border p-4 transition duration-200 hover:-translate-y-1 ${
        today
          ? 'border-sky-500/40 bg-gradient-to-b from-[#0a315a] to-[#061a2c] shadow-lg shadow-sky-950/20'
          : 'border-white/10 bg-[#030b14] hover:border-sky-500/20 hover:bg-[#061522]'
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`text-xs font-bold uppercase ${
            today ? 'text-sky-300' : 'text-slate-400'
          }`}
        >
          {today ? 'Hoy' : formatDate(date)}
        </div>

        {today && (
          <span className="rounded-full bg-sky-500/10 px-2 py-1 text-[10px] font-bold text-sky-300">
            AHORA
          </span>
        )}
      </div>

      <div className="mt-5 flex justify-center text-sky-300 transition group-hover:scale-110">
        {getWeatherIcon(weatherCode, 45)}
      </div>

      <div className="mt-5 text-center">
        <div className="text-2xl font-black">
          {Math.round(max)}°
        </div>

        <div className="mt-1 text-sm text-slate-500">
          Mín. {Math.round(min)}°
        </div>
      </div>

      <div className="mt-4 border-t border-white/10 pt-3">
        <div className="text-center text-xs text-sky-400">
          Lluvia: {rain}%
        </div>

        <div className="mt-1 text-center text-[11px] text-slate-500">
          {precipitation.toFixed(1)} mm
        </div>
      </div>
    </div>
  )
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('es-CO', {
    weekday: 'short',
    day: 'numeric',
  })
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

function getWeatherIcon(code: number, size: number) {
  if (code === 0) {
    return <Sun size={size} />
  }

  if (code <= 3) {
    return <CloudSun size={size} />
  }

  if (code <= 48) {
    return <Cloud size={size} />
  }

  if (code <= 82) {
    return <CloudRain size={size} />
  }

  return <CloudLightning size={size} />
}