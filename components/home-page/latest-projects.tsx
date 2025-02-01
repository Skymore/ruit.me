import { PROJECTS } from '~/data/projects'
import { Card } from '~/components/ui/card'
import { Link } from '~/components/ui/link'
import { GrowingUnderline } from '~/components/ui/growing-underline'

const MAX_PROJECTS_DISPLAY = 3

export function LatestProjects() {
  const latestProjects = PROJECTS.slice(0, MAX_PROJECTS_DISPLAY)

  return (
    <div className="space-y-4 divide-y divide-gray-200 dark:divide-gray-700 md:mt-0 md:space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex text-2xl font-bold sm:text-2xl sm:leading-10 md:text-4xl">
          <span className="mr-2 md:mr-3">Latest</span>
          <span className="text-primary-500">Projects</span>
        </div>
        <div className="flex items-center justify-end text-base font-medium leading-6">
          <Link href="/projects" className="" aria-label="All projects">
            <GrowingUnderline data-umami-event="all-projects">
              <span className="hidden md:inline-block">View all projects</span>
              <span className="md:hidden">More</span> &rarr;
            </GrowingUnderline>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3">
        {latestProjects.map((project) => (
          <Card
            key={project.title}
            title={project.title}
            description={project.description}
            imgSrc={project.imgSrc}
            href={project.url || project.repo ? (project.url || `https://github.com/${project.repo}`) : '#'}
          />
        ))}
      </div>
    </div>
  )
} 