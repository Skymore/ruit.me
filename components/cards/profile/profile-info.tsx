import { SITE_METADATA } from '~/data/site-metadata'
import { BriefcaseBusiness, Github, Linkedin, Mail, MapPin, Youtube, FileText } from 'lucide-react'
import { Fragment } from 'react'
import { Twemoji } from '~/components/ui/twemoji'
import { SOCIALS } from '~/data/socials'

function getAccountHandle(url = '') {
  let lastPart = url.split('/').pop()
  if (lastPart) {
    return lastPart
  }
  return url
}

const SOCIALS = [
  {
    platform: 'github',
    handle: getAccountHandle(SITE_METADATA.github),
    href: SITE_METADATA.github,
    Icon: () => <Github size={20} strokeWidth={1.5} />,
    umamiEvent: 'profile-card-github',
  },
  {
    platform: 'linkedin',
    handle: getAccountHandle(SITE_METADATA.linkedin),
    href: SITE_METADATA.linkedin,
    Icon: () => <Linkedin size={20} strokeWidth={1.5} />,
    umamiEvent: 'profile-card-linkedin',
  },
  {
    platform: 'youtube',
    handle: getAccountHandle(SITE_METADATA.youtube),
    href: SITE_METADATA.youtube,
    Icon: () => <Youtube size={20} strokeWidth={1.5} />,
    umamiEvent: 'profile-card-youtube',
  },
  {
    platform: 'email',
    handle: SITE_METADATA.email,
    href: `mailto:${SITE_METADATA.email}`,
    Icon: () => <Mail size={20} strokeWidth={1.5} />,
    umamiEvent: 'profile-card-email',
  }
]

export function ProfileCardInfo() {
  return (
    <div className="hidden py-4 md:block md:px-5">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Rui Tao</h3>
      <h5 className="py-2 text-gray-500 dark:text-gray-400">MS Student in ECE @ UW</h5>
      <div className="mb-2 mt-4 space-y-4">
        {/* Currently a student, uncomment when needed
        <div className="flex items-center text-gray-700 dark:text-gray-200">
          <BriefcaseBusiness strokeWidth={1.5} size={20} />
          <p className="flex items-center px-2">
            Graduate Student @{' '}
            <a
              target="_blank"
              href="https://www.washington.edu/"
              className="ml-1 text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
            >
              University of Washington
            </a>
          </p>
        </div>
        */}
        <div className="flex items-center text-gray-700 dark:text-gray-200">
          <MapPin strokeWidth={1.5} size={20} />
          <p className="px-2">Seattle, WA</p>
        </div>
        <div className="flex items-center text-gray-700 dark:text-gray-200">
          <Mail strokeWidth={1.5} size={20} />
          <a
            href={`mailto:${SITE_METADATA.email}`}
            className="px-2 hover:text-primary-500 dark:hover:text-primary-400"
          >
            {SITE_METADATA.email}
          </a>
        </div>
        <div className="flex items-center text-gray-700 dark:text-gray-200">
          <FileText strokeWidth={1.5} size={20} />
          <a
            href={SITE_METADATA.resumeUrl}
            target="_blank"
            className="px-2 hover:text-primary-500 dark:hover:text-primary-400"
            data-umami-event="profile-card-resume"
          >
            Resume
          </a>
        </div>
        <div className="flex gap-3">
          {SOCIALS.map(({ platform, handle, href, Icon, umamiEvent }) => {
            return (
              <a
                key={platform}
                href={href}
                target="_blank"
                className="flex items-center text-gray-700 transition hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-400"
                data-umami-event={umamiEvent}
              >
                <Icon />
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
