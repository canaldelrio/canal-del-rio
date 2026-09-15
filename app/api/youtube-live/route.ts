import { NextResponse } from 'next/server'

const CHANNEL_ID = 'UC9DeY1sDhxmysPJEZJmHR4Q'

export async function GET() {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Falta YOUTUBE_API_KEY' },
        { status: 500 }
      )
    }

    const url =
      `https://www.googleapis.com/youtube/v3/search` +
      `?part=snippet` +
      `&channelId=${CHANNEL_ID}` +
      `&eventType=live` +
      `&type=video` +
      `&maxResults=1` +
      `&key=${apiKey}`

    const response = await fetch(url, {
      next: { revalidate: 30 },
    })

    if (!response.ok) {
      const error = await response.text()

      return NextResponse.json(
        { error: 'Error consultando YouTube', details: error },
        { status: response.status }
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
    console.error('YouTube Live error:', error)

    return NextResponse.json(
      { error: 'Error interno' },
      { status: 500 }
    )
  }
}