import clsx from 'clsx'
import { Minus, Plus } from 'lucide-react'
import { Image } from '~/components/ui/image'
import { Link } from '~/components/ui/link'
import { Twemoji } from '~/components/ui/twemoji'
import { GrowingUnderline } from '~/components/ui/growing-underline'

const EXPERIENCES = [
  {
    org: 'University of Washington',
    url: 'https://www.washington.edu/',
    logo: '/static/images/logos/uw-logo.svg',
    start: 'Sep 2023',
    end: 'Jun 2025 (Expected)',
    title: 'MS in Electrical and Computer Engineering',
    location: 'Seattle, WA',
    icon: 'man-student',
    event: 'education-uw',
    details: () => {
      return (
        <ul className="[&>li]:my-2 [&>li]:pl-0">
          <li>GPA: 3.97/4.0</li>
          <li>Focus on software engineering and AI/ML applications</li>
        </ul>
      )
    },
  },
  {
    org: 'SLB (Schlumberger)',
    url: 'https://www.slb.com/',
    logo: '/static/images/logos/slb-logo.svg',
    start: 'Sep 2024',
    end: 'Dec 2024',
    title: 'Software Engineer Intern — AI/Full-Stack',
    location: 'Beijing, China',
    icon: 'briefcase',
    event: 'career-slb',
    details: () => {
      return (
        <ul className="[&>li]:my-2 [&>li]:pl-0">
          <li>
            Architected a high-performance well log platform with <strong>React</strong>/
            <strong>Flask</strong>/<strong>MongoDB</strong> stack on <strong>Azure</strong>,
            featuring well log generation, model lifecycle management, interactive data
            visualization, and real-time task monitoring.
          </li>
          <li>
            Engineered parallel task processing system using <strong>Python multiprocessing</strong>{' '}
            to bypass GIL, achieving 8x throughput for concurrent tasks (well log generation/model
            training/model prediction).
          </li>
          <li>
            Implemented well log resolution enhancement using <strong>Autoencoder-SVR</strong>{' '}
            hybrid model with <strong>TensorFlow</strong>.
          </li>
          <li>
            Optimized system performance through multi-level caching, file-based atomic operations,
            and process-safe queues.
          </li>
        </ul>
      )
    },
  },
  {
    org: 'Alibaba Group',
    url: 'https://www.alibabagroup.com/',
    logo: '/static/images/logos/alibaba-logo.svg',
    start: 'Jun 2024',
    end: 'Sep 2024',
    title: 'Software Engineer Intern — Game Server Development',
    location: 'Guangzhou, China',
    icon: 'briefcase',
    event: 'career-alibaba',
    details: () => {
      return (
        <ul className="[&>li]:my-2 [&>li]:pl-0">
          <li>
            Implemented an efficient pathfinding system for an SLG game using an optimized{' '}
            <strong>A* algorithm</strong> on a <strong>Lua</strong> and <strong>C++</strong> hybrid
            model, capable of handling a 1500×1500 hex grid within <strong>200ms</strong>, with path
            smoothing optimization.
          </li>
          <li>
            Developed a <a href="https://youtu.be/CFG76TDBImw">Roguelike Shooter</a> demo using{' '}
            <strong>Lua</strong> and a <strong>custom timer</strong> with adjustable timescale,
            pause, and resume.
          </li>
          <li>
            Created the <strong>game replay system</strong> for online card game{' '}
            <a href="https://store.steampowered.com/app/3052450/Morimens/">
              <strong>Morimens</strong>
            </a>
            , with the <strong>server</strong> storing game frame instructions and states on an{' '}
            <strong>OSS service</strong>, and the <strong>client</strong> retrieving data directly
            from OSS and replaying.
          </li>
          <li>
            Optimized the <strong>social system</strong> for <strong>Morimens</strong> with{' '}
            <strong>segmented caching</strong>, <strong>asynchronous preloading</strong>, and{' '}
            <strong>selective retrieval</strong>, reducing <strong>avg</strong> and{' '}
            <strong>max RPC times</strong> by <strong>83.2%</strong> and <strong>99.1%</strong>,
            earning positive feedback.
          </li>
        </ul>
      )
    },
  },
  {
    org: 'Parkalytics',
    url: 'https://www.washington.edu/',
    logo: '/static/images/logos/uw-logo.svg',
    start: 'Jan 2024',
    end: 'Jun 2024',
    title: 'UW ECE Capstone Project',
    location: 'Seattle, WA',
    icon: 'briefcase',
    event: 'career-parkalytics',
    details: () => {
      return (
        <ul className="[&>li]:my-2 [&>li]:pl-0">
          <li>
            Processed video frames and converted tracking datasets to object detection datasets,
            correcting annotations.
          </li>
          <li>
            Merged <strong>VisDrone</strong> and custom datasets into a comprehensive traffic
            dataset with data augmentation.
          </li>
          <li>
            Trained and evaluated models using <strong>YOLOv8x</strong> and <strong>GELAN-C</strong>
            , achieving mAP@0.50 of <strong>0.545</strong> and <strong>0.52</strong>.
          </li>
          <li>
            Integrated <strong>YOLOv8/9</strong> with <strong>ByteTrack</strong> for vehicle
            tracking and counting in video footage.
          </li>
        </ul>
      )
    },
  },
  {
    org: 'Shandong University',
    url: 'https://www.en.sdu.edu.cn/',
    logo: '/static/images/logos/sdu-logo.png',
    start: 'Sep 2017',
    end: 'Jun 2020',
    title: 'MS in Computer Science and Technology',
    location: 'Qingdao, China',
    icon: 'man-student',
    event: 'education-sdu',
    details: () => {
      return (
        <ul className="[&>li]:my-2 [&>li]:pl-0">
          <li>Research focus on computer vision and machine learning</li>
        </ul>
      )
    },
  },
  {
    org: 'Ocean University of China',
    url: 'http://eweb.ouc.edu.cn/',
    logo: '/static/images/logos/ouc-logo.png',
    start: 'Aug 2013',
    end: 'Jun 2017',
    title: 'BS in Marine Science',
    location: 'Qingdao, China',
    icon: 'man-student',
    event: 'education-ouc',
    details: () => {
      return (
        <ul className="[&>li]:my-2 [&>li]:pl-0">
          <li>Developed strong foundation in scientific research and data analysis</li>
        </ul>
      )
    },
  },
]

export function CareerTimeline() {
  return (
    <div className="max-w-2xl">
      <div className="space-y-8">
        {EXPERIENCES.map((exp, i) => (
          <TimelineItem key={i} exp={exp} last={i === EXPERIENCES.length - 1} />
        ))}
      </div>
    </div>
  )
}

function TimelineItem({ exp, last }: { exp: (typeof EXPERIENCES)[0]; last?: boolean }) {
  let { org, title, icon, url, logo, start, end, event, location, details: Details } = exp
  return (
    <div
      className={clsx(
        'group/timeline-item',
        'relative -mx-3 flex flex-row items-start gap-3 rounded-lg p-3',
        'cursor-pointer bg-transparent transition-colors hover:bg-slate-100 dark:hover:bg-slate-800',
        !last && [
          'before:absolute before:left-9 before:top-15',
          'before:h-full before:w-px',
          'before:bg-gray-300 dark:before:bg-gray-500',
        ]
      )}
    >
      <Image
        src={logo}
        alt={org}
        className="h-12 w-12 shrink-0 rounded-md bg-white p-1"
        style={{ objectFit: 'contain' }}
        width={200}
        height={200}
      />
      <details className="w-full [&_.minus]:open:block [&_.plus]:open:hidden">
        <summary className="relative pr-10 marker:content-none">
          <Plus
            size={18}
            className={clsx([
              'plus',
              'group-hover/timeline-item:visible md:invisible',
              'absolute right-1 top-1',
              'transition-transform duration-300 ease-in-out',
              'text-gray-600 dark:text-gray-500',
            ])}
            data-umami-event={`${event}-expand`}
          />
          <Minus
            size={18}
            className={clsx([
              'minus hidden',
              'absolute right-1 top-1',
              'transition-transform duration-300 ease-in-out',
              'text-gray-600 dark:text-gray-500',
            ])}
            data-umami-event={`${event}-collapse`}
          />
          <div className="flex flex-col">
            <div className="line-clamp-1 text-xs tabular-nums text-gray-500 dark:text-gray-400">
              {/* <span>{start}</span> – <span>{end}  |  </span> */}
              {location && <span className="">{location}</span>}
            </div>
            <Link
              href={url}
              className="line-clamp-1 w-fit font-semibold text-gray-900 no-underline hover:text-gray-900 dark:text-white dark:hover:text-white"
            >
              <GrowingUnderline data-umami-event={event}>{org}</GrowingUnderline>
            </Link>
            <div className="flex items-center gap-1 pt-1 text-sm text-gray-700 dark:text-gray-200">
              <Twemoji emoji={icon} className="!-mt-1" />
              <span>{title}</span>
            </div>
          </div>
        </summary>
        <div className="pt-1 text-base">
          <Details />
        </div>
      </details>
    </div>
  )
}
