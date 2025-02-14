import { genPageMetadata } from 'app/seo'
import { ProjectCard } from '~/components/cards/project'
import { Container } from '~/components/ui/container'
import { PageHeader } from '~/components/ui/page-header'
import { PROJECTS } from '~/data/projects'
import { fetchRepoData } from '~/utils/github'
import type { Project } from '~/types/data'

export let metadata = genPageMetadata({ title: 'Projects' })

export const dynamic = 'force-dynamic'

export default async function Projects() {
  const projectsWithRepoData = await Promise.all(
    PROJECTS.map(async (project) => {
      if (typeof project.repo === 'string') {
        const repoData = await fetchRepoData({ repo: project.repo })
        return {
          ...project,
          repo: repoData
        } satisfies Project
      }
      return project
    })
  )

  return (
    <Container className="pt-4 lg:pt-12">
      <PageHeader
        title="Projects"
        description="Collections of my open-source side projects, along with some cool things I've built with colleagues at work. It's a mix of passion projects and practical tools—some just for fun, others to solve real-world problems."
        className="border-b border-gray-200 dark:border-gray-700"
      />
      <div className="py-5 md:py-10">
        <div className="grid grid-cols-1 gap-6">
          {projectsWithRepoData.map((pro) => (
            <ProjectCard key={pro.title} project={pro} />
          ))}
        </div>
      </div>
    </Container>
  )
}
