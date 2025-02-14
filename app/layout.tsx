import 'css/tailwind.css'
import 'css/twemoji.css'
import 'react-medium-image-zoom/dist/styles.css'
import 'remark-github-blockquote-alert/alert.css'

import clsx from 'clsx'
import type { Metadata } from 'next'
import { JetBrains_Mono, Nunito, Playpen_Sans } from 'next/font/google'
import { SITE_METADATA } from '~/data/site-metadata'
import RootTemplate from './root-template'

const FONT_PLAYPEN_SANS = Playpen_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['800'],
  variable: '--font-playpen-sans',
})

const FONT_NUNITO = Nunito({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-nunito',
})

const FONT_JETBRAINS_MONO = JetBrains_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.siteUrl),
  title: {
    default: SITE_METADATA.title,
    template: `%s | ${SITE_METADATA.title}`,
  },
  description: SITE_METADATA.description,
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: './',
    siteName: SITE_METADATA.title,
    images: [SITE_METADATA.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${SITE_METADATA.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: SITE_METADATA.title,
    card: 'summary_large_image',
    images: [SITE_METADATA.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  let basePath = process.env.BASE_PATH || ''

  return (
    <html
      lang={SITE_METADATA.language}
      className={clsx(
        'scroll-smooth',
        FONT_NUNITO.variable,
        FONT_JETBRAINS_MONO.variable,
        FONT_PLAYPEN_SANS.variable
      )}
      suppressHydrationWarning
    >
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${basePath}/static/favicons/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${basePath}/static/favicons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${basePath}/static/favicons/favicon-16x16.png`}
      />
      <link rel="icon" href={`${basePath}/static/favicons/favicon.ico`} />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      <body
        className={clsx([
          'antialiased',
          'relative min-h-screen pl-[calc(100vw-100%)]',
          'flex flex-col',
          'bg-white text-neutral-900',
          'dark:bg-dark dark:text-gray-100',
        ])}
      >
        <RootTemplate>{children}</RootTemplate>
      </body>
    </html>
  )
}
