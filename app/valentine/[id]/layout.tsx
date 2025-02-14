import clsx from 'clsx'
import { JetBrains_Mono, Nunito, Playpen_Sans } from 'next/font/google'

const FONT_PLAYPEN_SANS = Playpen_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['800'],
  variable: '--font-playpen-sans',
})

const FONT_NUNITO = Nunito({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-nunito',
})

const FONT_JETBRAINS_MONO = JetBrains_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata = {
  title: "Valentine's Day",
  description: "A special Valentine's Day message for you",
}

export default function ValentineLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={clsx(
        FONT_NUNITO.variable,
        FONT_JETBRAINS_MONO.variable,
        FONT_PLAYPEN_SANS.variable
      )}
    >
      {children}
    </div>
  )
}
