import { NextResponse } from 'next/server'

const CHANNEL_ID = 'UC9DeY1sDhxmysPJEZJmHR4Q'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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

    const url =
      `https://www.googleapis.com/youtube/v3/search` +
      `?part=snippet` +
      `&channelId=${CHANNEL_ID}` +
      `&eventType=live` +
      `&type=video` +
      `&maxResults=5` +
      `&key=${apiKey}`

    const response = await fetch(url, {
      cache: 'no-store',
    })

    if (!response.ok) {
      const error = await response.text()

      console.error('Error YouTube API:', response.status, error)

      return NextResponse.json(
        {
          live: false,
          videoId: null,
          title: null,
          error: 'Error consultando YouTube',
        },
        { status: 500 }
      )
    }

    const data = await response.json()

    const liveVideo = data.items?.[0]

    if (!liveVideo) {
      return NextResponse.json({
        live: false,
        videoId: null,
        title: null,
      })
    }

    return NextResponse.json({
      live: true,
      videoId: liveVideo.id.videoId,
      title: liveVideo.snippet.title,
    })
  } catch (error) {
    console.error('Error comprobando transmisión:', error)

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