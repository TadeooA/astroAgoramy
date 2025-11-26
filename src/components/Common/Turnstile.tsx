import { useEffect, useRef } from 'react'

interface TurnstileProps {
  onVerify: (token: string) => void
  onError?: () => void
  onExpire?: () => void
}

const Turnstile = ({ onVerify, onError, onExpire }: TurnstileProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  useEffect(() => {
    // Wait for Cloudflare Turnstile script to load
    const initTurnstile = () => {
      if (containerRef.current && window.turnstile && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: '0x4AAAAAACDHjL7M7WPmIUEt',
          theme: 'light',
          size: 'invisible',
          callback: (token: string) => {
            onVerify(token)
          },
          'error-callback': () => {
            if (onError) onError()
          },
          'expired-callback': () => {
            if (onExpire) onExpire()
          },
        })
      }
    }

    // Check if script is already loaded
    if (window.turnstile) {
      initTurnstile()
    } else {
      // Wait for script to load
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval)
          initTurnstile()
        }
      }, 100)

      return () => clearInterval(interval)
    }

    // Cleanup
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [onVerify, onError, onExpire])

  return <div ref={containerRef}></div>
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    turnstile: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string
          theme?: string
          size?: string
          callback?: (token: string) => void
          'error-callback'?: () => void
          'expired-callback'?: () => void
        }
      ) => string
      remove: (widgetId: string) => void
      reset: (widgetId: string) => void
    }
  }
}

export default Turnstile
