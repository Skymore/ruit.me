import Script from 'next/script.js'

interface UmamiAnalyticsProps {
  websiteId?: string
  src?: string
}

export function UmamiAnalytics({ websiteId, src = '/stats/script.js' }: UmamiAnalyticsProps) {
  if (process.env.NODE_ENV === 'development') {
    // Only log in development mode
    console.log('[Umami Analytics] Attempting to render. Website ID:', websiteId, 'Src:', src)
  }

  if (websiteId && src) {
    // Ensure src exists
    return (
      <Script
        async
        defer
        data-website-id={websiteId}
        src={src}
        onLoad={() => {
          console.log(`[Umami Analytics] Script loaded successfully from: ${src}`)
          // You can even try to call the global umami function here (if it exists and you want to test)
          if ((window as any).umami) {
            console.log('[Umami Analytics] window.umami object found.')
            // if (typeof (window as any).umami === 'function') { // A safer check
            //   (window as any).umami.trackEvent('Umami Script Loaded', 'script-load'); // Example: send an event
            // }
          } else {
            console.warn('[Umami Analytics] window.umami object NOT found after load.')
          }
        }}
        onError={(e) => {
          console.error(`[Umami Analytics] Failed to load script from: ${src}`, e)
        }}
      />
    )
  } else {
    if (process.env.NODE_ENV === 'development' && !websiteId) {
      console.warn('[Umami Analytics] Not rendering because websiteId is missing.')
    }
    if (process.env.NODE_ENV === 'development' && !src) {
      console.warn(
        '[Umami Analytics] Not rendering because src is missing (this should not happen if websiteId is present and using default or env var).'
      )
    }
    return null
  }
}
