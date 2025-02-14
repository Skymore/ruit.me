import { NextResponse, type NextRequest } from 'next/server'
import type { ValentineConfig } from '~/data/valentine-config'
import { createValentineConfig, getValentineConfig } from '~/db/valentine-queries'

// Generate a short link
export async function POST(req: NextRequest) {
  try {
    const config: ValentineConfig = await req.json()
    const id = await createValentineConfig(config)
    return NextResponse.json({ id })
  } catch (error) {
    console.error('Failed to generate short link:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate short link' },
      { status: 500 }
    )
  }
}

// Get config by short link ID
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 })
    }

    const record = await getValentineConfig(id)

    if (!record) {
      return NextResponse.json({ error: 'Config not found' }, { status: 404 })
    }

    return NextResponse.json(record.config)
  } catch (error) {
    console.error('Failed to get config:', error)
    return NextResponse.json({ error: error.message || 'Failed to get config' }, { status: 500 })
  }
}
