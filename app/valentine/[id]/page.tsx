import { notFound } from 'next/navigation'
import ValentinePageContent from '../page-content'
import { getValentineConfig } from '~/db/valentine-queries'
import type { ValentineConfig } from '~/data/valentine-config'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  if (!id) {
    return notFound()
  }

  try {
    const record = await getValentineConfig(id)

    if (!record) {
      return notFound()
    }

    return <ValentinePageContent config={record.config as ValentineConfig} />
  } catch (error) {
    console.error('Failed to fetch valentine config:', error)
    return notFound()
  }
}
