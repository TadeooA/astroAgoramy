import { useState } from 'react'
import confetti from 'canvas-confetti'
import Turnstile from '../Common/Turnstile'

const SubscriptionForm = () => {
  const [email, setEmail] = useState('')
  const [acceptPrivacy, setAcceptPrivacy] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const launchConfetti = () => {
    const duration = 4000
    const animationEnd = Date.now() + duration
    const defaults = {
      startVelocity: 45,
      spread: 360,
      ticks: 100,
      zIndex: 9999,
      gravity: 0.8,
      decay: 0.9,
      scalar: 1.2
    }

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
    }

    // Explosión inicial grande desde el centro
    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b']
    })

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 100 * (timeLeft / duration)

      // Confeti desde la izquierda
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0, 0.2), y: Math.random() * 0.5 },
        colors: ['#10b981', '#3b82f6', '#8b5cf6']
      })

      // Confeti desde la derecha
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.8, 1), y: Math.random() * 0.5 },
        colors: ['#ec4899', '#f59e0b', '#10b981']
      })

      // Confeti desde arriba centro
      confetti({
        ...defaults,
        particleCount: particleCount / 2,
        origin: { x: randomInRange(0.4, 0.6), y: 0 },
        colors: ['#3b82f6', '#8b5cf6', '#f59e0b']
      })
    }, 150)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email) {
      alert('Por favor, introduce tu correo electrónico')
      return
    }

    if (!acceptPrivacy) {
      alert('Debes aceptar las políticas de privacidad para continuar')
      return
    }

    if (!turnstileToken) {
      alert('Por favor, completa la verificación de seguridad')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(
        'https://farmacialaluz.com/agoramy/api/mailapp/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al suscribirse')
      }

      const result = await response.json()
      console.log('Suscripción exitosa:', result)

      // Lanzar confeti
      launchConfetti()

      alert('¡Gracias por suscribirte! Te notificaremos cuando lancemos.')
      setEmail('')
    } catch (error) {
      console.error('Error al suscribirse:', error)
      alert(error instanceof Error ? error.message : 'Error al procesar tu suscripción')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          id="subscription-email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 bg-white text-base transition-all"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting || !turnstileToken}
          className="px-8 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Procesando...' : 'Notifícame'}
        </button>
      </div>
      <div className="flex items-start gap-2">
        <input
          id="product-privacy-checkbox"
          type="checkbox"
          checked={acceptPrivacy}
          onChange={(e) => setAcceptPrivacy(e.target.checked)}
          className="mt-1 rounded border-gray-300 text-green-500 focus:ring-green-500"
          required
        />
        <label htmlFor="product-privacy-checkbox" className="text-sm text-gray-600">
          Acepto el{' '}
          <a href="/privacy/" className="text-green-500 hover:underline">
            manejo de mis datos y las políticas de privacidad
          </a>
        </label>
      </div>
      <div className="flex justify-center">
        <Turnstile
          onVerify={(token) => setTurnstileToken(token)}
          onError={() => {
            console.error('Turnstile error')
            setTurnstileToken(null)
          }}
          onExpire={() => {
            console.log('Turnstile token expired')
            setTurnstileToken(null)
          }}
        />
      </div>
    </form>
  )
}

export default SubscriptionForm
