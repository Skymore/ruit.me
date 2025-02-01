import { Twemoji } from '~/components/ui/twemoji'

export function Intro() {
  return (
    <h1 className="text-neutral-900 dark:text-neutral-200">
      I'm <span className="font-medium">Rui Tao</span> - a passionate Software Engineer based in{' '}
      <span className="font-medium">Seattle, WA</span>
      <span className="absolute ml-1.5 inline-flex pt-[3px]">
        <Twemoji emoji="flag-united-states" />
      </span>
    </h1>
  )
}
