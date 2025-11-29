import { useEffect, useRef } from 'react'

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
  const isInitializedRef = useRef(false)

  // Actualizar refs cuando cambien las callbacks
  useEffect(() => {
    onVerifyRef.current = onVerify
    onErrorRef.current = onError
    onExpireRef.current = onExpire
  }, [onVerify, onError, onExpire])

  useEffect(() => {
    if (isInitializedRef.current) return

    // Wait for Cloudflare Turnstile script to load
    const initTurnstile = () => {
      if (containerRef.current && window.turnstile && !widgetIdRef.current) {
        try {
          console.log('Inicializando Turnstile...')
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: '0x4AAAAAACDm_ksAJvXupdOP',
            theme: 'light',
            size: 'invisible',
            callback: (token: string) => {
              console.log('Turnstile token recibido')
              onVerifyRef.current(token)
            },
            'error-callback': () => {
              console.error('Turnstile error callback')
              if (onErrorRef.current) onErrorRef.current()
            },
            'expired-callback': () => {
              console.log('Turnstile token expirado')
              if (onExpireRef.current) onExpireRef.current()
            },
          })
          console.log('Turnstile renderizado con ID:', widgetIdRef.current)
          isInitializedRef.current = true
        } catch (error) {
          console.error('Error al inicializar Turnstile:', error)
        }
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
          if (interval) clearInterval(interval)
          initTurnstile()
        }
      }, 100)
    }

    // Cleanup
    return () => {
      if (interval) clearInterval(interval)
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch (error) {
          console.error('Error al limpiar Turnstile:', error)
        }
        widgetIdRef.current = null
      }
      isInitializedRef.current = false
    }
  }, [])

  return <div ref={containerRef} className="turnstile-container"></div>
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
