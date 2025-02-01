import clsx from 'clsx'
import { Fragment } from 'react'
import type { BrandsMap } from '~/components/ui/brand'
import { Brand } from '~/components/ui/brand'
import { GradientBorder } from '~/components/ui/gradient-border'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Image } from '~/components/ui/image'
import { Link } from '~/components/ui/link'
import { TiltedGridBackground } from '~/components/ui/tilted-grid-background'
import type { PROJECTS } from '~/data/projects'

export function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const { title, description, imgSrc, url, builtWith, links, type } = project

  return (
    <GradientBorder
      offset={28}
      className="flex flex-col rounded-[40px] p-6 [box-shadow:0_8px_32px_rgba(194,194,218,.3)] dark:bg-white/5 dark:shadow-none md:flex-row md:items-start md:p-8"
    >
      <TiltedGridBackground className="inset-0 z-[-1] rounded-[40px]" />
      <div className="mb-4 shrink-0 md:mb-0 md:mr-8">
        <Image src={imgSrc} alt={title} width={120} height={120} className="h-[120px] w-[120px]" />
      </div>
      <div className="flex grow flex-col">
        <div className="mb-4">
          <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-[22px] font-bold leading-[30px]">
                {url ? (
                  <Link href={url} aria-label={`Link to ${title}`}>
                    <GrowingUnderline data-umami-event="project-title-link">{title}</GrowingUnderline>
                  </Link>
                ) : (
                  title
                )}
              </h2>
              <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                {type === 'work' ? 'Work' : 'Personal'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {builtWith?.map((tool) => (
                <Brand
                  key={tool}
                  name={tool as keyof typeof BrandsMap}
                  iconClassName="h-6 w-6"
                />
              ))}
            </div>
          </div>
          <p className="whitespace-pre-line text-base leading-relaxed text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        {links && (
          <div className="mt-auto space-y-1.5">
            <div className="text-xs text-gray-600 dark:text-gray-400">Links</div>
            <div className="flex flex-wrap items-center gap-2">
              {links.map(({ title, url }, idx) => (
                <Fragment key={url}>
                  <Link href={url} className="flex items-center gap-1.5">
                    <GrowingUnderline className="font-medium" data-umami-event="project-link">
                      {title}
                    </GrowingUnderline>
                  </Link>
                  {idx !== links.length - 1 && (
                    <span className="text-gray-400 dark:text-gray-500">•</span>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </GradientBorder>
  )
}
