import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const CHANNEL_ID = 'UC9DeY1sDhxmysPJEZJmHR4Q'

// La playlist de videos subidos del canal se obtiene
// cambiando el prefijo UC por UU.
const UPLOADS_PLAYLIST_ID = CHANNEL_ID.replace(/^UC/, 'UU')

export async function GET() {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        {
          live: false,
          videoId: null,
          title: null,
          error: 'Falta YOUTUBE_API_KEY',
        },
        { status: 500 }
      )
    }

    /*
     * Primero obtenemos los videos más recientes del canal.
     * playlistItems.list tiene un costo de cuota muy bajo
     * comparado con search.list.
     */
    const playlistUrl =
      `https://www.googleapis.com/youtube/v3/playlistItems` +
      `?part=snippet,contentDetails` +
      `&playlistId=${UPLOADS_PLAYLIST_ID}` +
      `&maxResults=10` +
      `&key=${apiKey}`

    const playlistResponse = await fetch(playlistUrl, {
      cache: 'no-store',
    })

    if (!playlistResponse.ok) {
      const error = await playlistResponse.text()

      console.error(
        'Error obteniendo videos recientes de YouTube:',
        playlistResponse.status,
        error
      )

      return NextResponse.json(
        {
          live: false,
          videoId: null,
          title: null,
          error: 'Error consultando videos recientes de YouTube',
        },
        { status: 500 }
      )
    }

    const playlistData = await playlistResponse.json()

    const videoIds =
      playlistData.items
        ?.map(
          (item: {
            contentDetails?: {
              videoId?: string
            }
          }) => item.contentDetails?.videoId
        )
        .filter(Boolean) ?? []

    if (videoIds.length === 0) {
      return NextResponse.json({
        live: false,
        videoId: null,
        title: null,
      })
    }

    /*
     * Ahora consultamos el estado real de esos videos.
     * videos.list permite saber cuáles están actualmente en vivo.
     */
    const videosUrl =
      `https://www.googleapis.com/youtube/v3/videos` +
      `?part=snippet,liveStreamingDetails,status` +
      `&id=${videoIds.join(',')}` +
      `&key=${apiKey}`

    const videosResponse = await fetch(videosUrl, {
      cache: 'no-store',
    })

    if (!videosResponse.ok) {
      const error = await videosResponse.text()

      console.error(
        'Error consultando estado de videos de YouTube:',
        videosResponse.status,
        error
      )

      return NextResponse.json(
        {
          live: false,
          videoId: null,
          title: null,
          error: 'Error consultando estado de YouTube',
        },
        { status: 500 }
      )
    }

    const videosData = await videosResponse.json()

    const videos = videosData.items ?? []

    /*
     * Buscamos una transmisión actualmente EN VIVO
     * cuyo título corresponda al Informativo.
     */
    const liveVideo = videos.find(
      (video: {
        id?: string
        snippet?: {
          title?: string
          liveBroadcastContent?: string
        }
      }) => {
        const title = video.snippet?.title?.toLowerCase() ?? ''

        return (
          video.snippet?.liveBroadcastContent === 'live' &&
          title.includes('informativo')
        )
      }
    )

    if (!liveVideo) {
      return NextResponse.json({
        live: false,
        videoId: null,
        title: null,
      })
    }

    return NextResponse.json({
      live: true,
      videoId: liveVideo.id,
      title: liveVideo.snippet?.title ?? null,
    })
  } catch (error) {
    console.error(
      'Error detectando transmisión del Informativo:',
      error
    )

    return NextResponse.json(
      {
        live: false,
        videoId: null,
        title: null,
        error: 'Error interno',
      },
      { status: 500 }
    )
  }
}