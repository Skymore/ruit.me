import type { Author } from 'contentlayer/generated'
import type { ReactNode } from 'react'
import { CareerTimeline } from '~/components/author/career'
import { SocialAccounts } from '~/components/author/social-accounts'
import { Button } from '~/components/ui/button'
import { Container } from '~/components/ui/container'
import { Image } from '~/components/ui/image'
import { PageHeader } from '~/components/ui/page-header'
import { Twemoji } from '~/components/ui/twemoji'
import { SITE_METADATA } from '~/data/site-metadata'
import { Laptop, Globe, Settings2, Cloud, Wrench } from 'lucide-react'

interface Props {
  children?: ReactNode
  content: Omit<Author, '_id' | '_raw' | 'body'>
}

export function AuthorLayout({ children }: Props) {
  return (
    <Container className="pt-4 lg:pt-12">
      <PageHeader
        title="About"
        description="A bit of background on who I am, what I do, and why I started this blog. Nothing too serious, just a little intro to the person typing away behind the scenes."
        className="border-b border-gray-200 dark:border-gray-700"
      />
      <div className="py-8">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div>
            <h2 className="mt-0">
              Hi there <Twemoji emoji="waving-hand" />
            </h2>
            <p>
              I'm <strong>Rui Tao</strong>, currently pursuing my Master's degree in Electrical and Computer Engineering at the <strong>University of Washington</strong> (GPA: 3.97/4.0). I'm passionate about software development, with expertise in <strong>full-stack development</strong>, <strong>game development</strong>, and <strong>AI/ML applications</strong>.
            </p>
            <p>
              I have experience in building high-performance systems and modern web applications. My technical expertise spans across multiple domains, from developing game systems to implementing AI-driven solutions.
            </p>
            <p>
              I enjoy exploring new technologies and solving complex engineering challenges. Feel free to explore my projects and get in touch if you'd like to collaborate!
            </p>
          </div>
          <div>
            <div className="mb-[1em] mt-[2em] flex items-center justify-between [&>h2]:my-0">
              <h2>My career</h2>
              <Button as="a" href={SITE_METADATA.resumeUrl} target="_blank">
                <span>Resume</span>
                <Twemoji emoji="page-facing-up" />
              </Button>
            </div>
            <CareerTimeline />
          </div>
          <div>
            <h2>Tech stack</h2>
            <p>
              I work with a wide range of technologies, including:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Laptop size={20} className="shrink-0 text-gray-600 dark:text-gray-400" />
                <div className="min-w-0 flex-1">
                  <span className="mr-2 font-medium">Languages:</span>
                  <span className="text-gray-600 dark:text-gray-400">C/C++, Python, TS/JS, Go, Lua, Java, C#, Kotlin, CUDA</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Globe size={20} className="shrink-0 text-gray-600 dark:text-gray-400" />
                <div className="min-w-0 flex-1">
                  <span className="mr-2 font-medium">Web Development:</span>
                  <span className="text-gray-600 dark:text-gray-400">React, Redux, Zustand, Next.js, Vue.js, Angular, Tailwind CSS, HTML/CSS</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Settings2 size={20} className="shrink-0 text-gray-600 dark:text-gray-400" />
                <div className="min-w-0 flex-1">
                  <span className="mr-2 font-medium">Backend Development:</span>
                  <span className="text-gray-600 dark:text-gray-400">Express, NestJS, Django, Flask, FastAPI, Spring Boot, Gin, gRPC</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Cloud size={20} className="shrink-0 text-gray-600 dark:text-gray-400" />
                <div className="min-w-0 flex-1">
                  <span className="mr-2 font-medium">Data Management:</span>
                  <span className="text-gray-600 dark:text-gray-400">MySQL, PostgreSQL, MongoDB, Redis, Mongoose, Elasticsearch</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Wrench size={20} className="shrink-0 text-gray-600 dark:text-gray-400" />
                <div className="min-w-0 flex-1">
                  <span className="mr-2 font-medium">DevOps & Tools:</span>
                  <span className="text-gray-600 dark:text-gray-400">Git, Docker, K8s, AWS/GCP/Azure, Terraform, Jenkins, CI/CD</span>
                </div>
              </li>
            </ul>
            <p>
              This portfolio site is built with modern technologies including <strong>Next.js</strong>, <strong>TypeScript</strong>, and <strong>Tailwind CSS</strong>, hosted on <a href="https://vercel.com/" target="_blank">Vercel</a>.
            </p>
          </div>
          <div>
            <h2>Contact</h2>
            <p>
              Feel free to reach out to me for collaboration opportunities or just to chat about technology:
            </p>
            <ul>
              <li>Email: <a href={`mailto:${SITE_METADATA.email}`}>{SITE_METADATA.email}</a></li>
              <li>Location: Seattle, WA</li>
            </ul>
            <p>You can also find me on:</p>
            <SocialAccounts />
          </div>
          <div className="flex flex-col gap-8">
            {children}
          </div>
        </div>
      </div>
    </Container>
  )
}
