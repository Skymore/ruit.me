'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { KbarSearchTrigger } from '~/components/search/kbar-trigger'
import { Container } from '~/components/ui/container'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Link } from '~/components/ui/link'
import { Twemoji } from '~/components/ui/twemoji'
import { HEADER_NAV_LINKS } from '~/data/navigation'
import { SITE_METADATA } from '~/data/site-metadata'
import { Logo } from './logo'
import { MobileNav } from './mobile-nav'
import { ThemeSwitcher } from './theme-switcher'

let logged = false
function logASCIItext() {
  if (logged) return
  console.info(
    "              _  _                       \r\n             (_)| |                      \r\n _ __  _   _  _ | |_     _ __ ___    ___ \r\n| '__|| | | || || __|   | '_ ` _ \\  / _ \\\r\n| |   | |_| || || |_  _ | | | | | ||  __/\r\n|_|    \\__,_||_| \\__|(_)|_| |_| |_| \\___|\r\n                                         \r\n                                         \r\n"
  )
  console.log('🧑‍💻 View source:', SITE_METADATA.siteRepo)
  console.log("🙌 Let's connect:", SITE_METADATA.linkedin)
  logged = true
}

export function Header() {
  let pathname = usePathname() || ''
  useEffect(logASCIItext, [])

  return (
    <Container
      as="header"
      className={clsx(
        'bg-white/75 py-2 backdrop-blur dark:bg-dark/75',
        'shadow-sm saturate-100 md:rounded-2xl',
        SITE_METADATA.stickyNav && 'sticky top-2 z-50 lg:top-3'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <Logo />
        <div className="flex items-center gap-4">
          <div className="hidden gap-1.5 sm:flex">
            {HEADER_NAV_LINKS.map(({ title, href, emoji }) => {
              let isActive = pathname.startsWith(href)
              return (
                <Link key={title} href={href} className="px-3 py-1 font-medium">
                  <GrowingUnderline
                    className={clsx(isActive && 'bg-[length:100%_50%]')}
                    data-umami-event={`nav-${href.replace('/', '')}`}
                  >
                    {href === '/valentine' ? (
                      <span className="flex items-center gap-1">
                        <Twemoji emoji="red-heart" />
                        {title}
                      </span>
                    ) : (
                      title
                    )}
                  </GrowingUnderline>
                </Link>
              )
            })}
          </div>
          <div
            data-orientation="vertical"
            role="separator"
            className="hidden h-4 w-px shrink-0 bg-gray-200 dark:bg-gray-600 md:block"
          />
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <KbarSearchTrigger />
            <MobileNav />
          </div>
        </div>
      </div>
    </Container>
  )
}
