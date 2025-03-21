'use client'

import { usePathname } from 'next/navigation'
import { UmamiAnalytics } from '~/components/analytics/umami'
import { Footer } from '~/components/footer'
import { Header } from '~/components/header'
import { KBarSearchProvider } from '~/components/search/kbar-provider'
import { TiltedGridBackground } from '~/components/ui/tilted-grid-background'
import { SITE_METADATA } from '~/data/site-metadata'
import { ThemeProviders } from './theme-providers'

export default function RootTemplate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isValentinePage = pathname?.match(/^\/valentine\/[^/]+$/)

  return (
    <>
      <TiltedGridBackground className="inset-x-0 top-0 z-[-1] h-[50vh]" />
      <ThemeProviders>
        <UmamiAnalytics
          websiteId={SITE_METADATA.analytics.umamiAnalytics.websiteId}
          src={SITE_METADATA.analytics.umamiAnalytics.src}
        />
        <KBarSearchProvider configs={SITE_METADATA.search.kbarConfigs}>
          {!isValentinePage && <Header />}
          <main className="mb-auto grow">{children}</main>
          {!isValentinePage && <Footer />}
        </KBarSearchProvider>
      </ThemeProviders>
    </>
  )
}
