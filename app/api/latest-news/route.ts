import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const { data: article, error } = await supabase
      .from('news')
      .select(
        'id, title, slug, category, image, excerpt, minutes, created_at'
      )
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('Error obteniendo noticia principal:', error)

      return NextResponse.json(
        {
          article: null,
          error: 'No se pudo obtener la noticia principal',
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      article: article || null,
    })
  } catch (error) {
    console.error('Error interno:', error)

    return NextResponse.json(
      {
        article: null,
        error: 'Error interno del servidor',
      },
      { status: 500 }
    )
  }
}