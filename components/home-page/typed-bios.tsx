'use client'

import { clsx } from 'clsx'
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { Twemoji } from '~/components/ui/twemoji'

function createTypedInstance(el: HTMLElement) {
  return new Typed(el, {
    stringsElement: '#bios',
    typeSpeed: 40,
    backSpeed: 10,
    loop: true,
    backDelay: 1000,
  })
}

export function TypedBios() {
  let el = useRef(null)
  let typed = useRef<Typed | null>(null)

  useEffect(() => {
    if (el.current) {
      typed.current?.destroy()
      typed.current = createTypedInstance(el.current)
    }
  }, [])

  return (
    <div
      className={clsx([
        'flex min-h-8 items-center gap-0.5',
        [
          '[&_.typed-cursor]:inline-block',
          '[&_.typed-cursor]:w-2',
          '[&_.typed-cursor]:h-5.5',
          '[&_.typed-cursor]:text-transparent',
          '[&_.typed-cursor]:bg-slate-800',
          'dark:[&_.typed-cursor]:bg-slate-100',
        ],
      ])}
    >
      <ul id="bios" className="hidden">
        <li>I'm a Master's student in ECE at UW.</li>
        <li>I'm passionate about software development and AI.</li>
        <li>I live in Seattle, Washington.</li>
        <li>I started coding in middle school.</li>
        <li>I specialize in full-stack development and game development.</li>
        <li>I work with modern web technologies and AI/ML applications.</li>
        <li>I love solving complex engineering challenges.</li>
        <li>I'm experienced in building high-performance systems.</li>
        <li>I enjoy exploring new technologies.</li>
        <li>
          I've been coding for {new Date().getFullYear() - 2010}+ years <Twemoji emoji="laptop" />
        </li>
        <li>
          I'm into gaming and game development <Twemoji emoji="video-game" />
        </li>
        <li>
          I enjoy problem-solving <Twemoji emoji="thinking-face" />
        </li>
        <li>
          I'm always eager to learn new things <Twemoji emoji="books" />
        </li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  )
}

