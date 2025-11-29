import { useEffect, useRef, useCallback } from 'react'

interface TurnstileProps {
  onVerify: (token: string) => void
  onError?: () => void
  onExpire?: () => void
}

const Turnstile = ({ onVerify, onError, onExpire }: TurnstileProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const onVerifyRef = useRef(onVerify)
  const onErrorRef = useRef(onError)
  const onExpireRef = useRef(onExpire)

  // Actualizar refs cuando cambien las callbacks
  useEffect(() => {
    onVerifyRef.current = onVerify
    onErrorRef.current = onError
    onExpireRef.current = onExpire
  }, [onVerify, onError, onExpire])

  useEffect(() => {
    // Wait for Cloudflare Turnstile script to load
    const initTurnstile = () => {
      if (containerRef.current && window.turnstile && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: '0x4AAAAAACDHjL7M7WPmIUEt',
          theme: 'light',
          size: 'normal',
          appearance: 'interaction-only',
          callback: (token: string) => {
            onVerifyRef.current(token)
          },
          'error-callback': () => {
            if (onErrorRef.current) onErrorRef.current()
          },
          'expired-callback': () => {
            if (onExpireRef.current) onExpireRef.current()
          },
        })
      }
    }

    let interval: NodeJS.Timeout | null = null

    // Check if script is already loaded
    if (window.turnstile) {
      initTurnstile()
    } else {
      // Wait for script to load
      interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval!)
          initTurnstile()
        }
      }, 100)
    }

    // Cleanup
    return () => {
      if (interval) clearInterval(interval)
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [])

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
          appearance?: string
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
