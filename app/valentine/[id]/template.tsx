import { ThemeProviders } from '~/app/theme-providers'

export default function ValentineTemplate({ children }: { children: React.ReactNode }) {
  return <ThemeProviders>{children}</ThemeProviders>
}
