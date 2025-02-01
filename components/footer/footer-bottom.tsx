import { clsx } from 'clsx'
import { AreaChart, Rss } from 'lucide-react'
import { Link } from '~/components/ui/link'
import { SITE_METADATA } from '~/data/site-metadata'

export function FooterBottom() {
  return (
    <div
      className={clsx([
        'pt-5 md:my-2',
        'flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between md:gap-16',
      ])}
    >
      <div className="flex items-center">
      </div>
    </div>
  )
}
