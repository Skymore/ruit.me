'use client'

import { Clock, Github, Map, Star } from 'lucide-react'
import useSWR from 'swr'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Link } from '~/components/ui/link'
import { Twemoji } from '~/components/ui/twemoji'
import { SITE_METADATA } from '~/data/site-metadata'
import type { GithubRepository } from '~/types/data'
import { fetcher } from '~/utils/misc'
import { formatInTimeZone, toZonedTime } from 'date-fns-tz'

const TIME_IS = 'https://time.is/Seattle'
const MY_TIMEZONE = 'America/Los_Angeles'

function getTime() {
  const now = new Date()

  // Format the time in MY_TIMEZONE timezone
  const timeInMyTimezone = formatInTimeZone(now, MY_TIMEZONE, 'h:mm a')

  // Get current time in user's timezone
  const userTime = now

  // Get Seattle time
  const seattleTime = toZonedTime(now, MY_TIMEZONE)

  // Calculate the difference in hours and minutes
  const diffInMs = seattleTime.getTime() - userTime.getTime()
  const diffInHours = diffInMs / (1000 * 60 * 60)

  // Get absolute hours and minutes
  const absHours = Math.floor(Math.abs(diffInHours))
  const absMinutes = Math.round((Math.abs(diffInHours) - absHours) * 60)

  // Format the time difference string
  let diff
  if (diffInMs === 0) {
    diff = 'same time'
  } else {
    const hourText = absHours > 0 ? `${absHours}h` : ''
    const minuteText = absMinutes > 0 ? `${absMinutes}m` : ''
    const separator = hourText && minuteText ? ' ' : ''
    const timeText = `${hourText}${separator}${minuteText}`

    diff = diffInHours > 0 ? `${timeText} ahead` : `${timeText} behind`
  }

  return { time: timeInMyTimezone, diff }
}

export function FooterMeta() {
  let { time, diff } = getTime()
  let siteRepo = SITE_METADATA.siteRepo.replace('https://github.com/', '')
  let repoName = siteRepo.split('/')[1]
  let { data: repo } = useSWR<GithubRepository>(`/api/github?repo=${siteRepo}`, fetcher)

  return (
    <div className="space-y-2 py-1.5 text-gray-800 dark:text-gray-200">
      <div className="flex items-center gap-1 font-medium">
        <Github className="h-5 w-5" />
        <Link href={SITE_METADATA.siteRepo} className="ml-1">
          <GrowingUnderline data-umami-event="view-repo">{repoName}</GrowingUnderline>
        </Link>
        <span>-</span>
        <span className="inline-flex items-center text-gray-500 dark:text-gray-400">
          <Star className="mr-1 h-4 w-4" />
          {repo ? <span>{repo.stargazerCount}</span> : '---'}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Map className="h-5 w-5" />
        <span className="font-medium">
          Seattle, WA <Twemoji emoji="flag-united-states" className="!h-4.5" />
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5" />
        <Link href={TIME_IS}>
          <GrowingUnderline className="font-medium" data-umami-event="footer-time">
            {time} <span className="text-gray-500 dark:text-gray-400">- {diff}</span>
          </GrowingUnderline>
        </Link>
      </div>
    </div>
  )
}
