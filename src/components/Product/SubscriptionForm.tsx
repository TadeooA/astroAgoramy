import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import Honeypot from '../Common/Honeypot'
import { firstErrors, subscribeNewsletter } from '../../lib/landingApi'

const SubscriptionForm = () => {
  const [email, setEmail] = useState('')
  const [acceptPrivacy, setAcceptPrivacy] = useState(false)
  const [website, setWebsite] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null)
  const renderedAt = useRef(0)

  useEffect(() => {
    renderedAt.current = Date.now()
  }, [])

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
      colors: ['#2563eb', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b']
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
        colors: ['#2563eb', '#3b82f6', '#8b5cf6']
      })

      // Confeti desde la derecha
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.8, 1), y: Math.random() * 0.5 },
        colors: ['#ec4899', '#f59e0b', '#2563eb']
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

    if (!email.trim()) {
      setStatus({ ok: false, message: 'Por favor, introduce tu correo electrónico.' })
      return
    }

    if (!acceptPrivacy) {
      setStatus({ ok: false, message: 'Debes aceptar las políticas de privacidad para continuar.' })
      return
    }

    setStatus(null)
    setIsSubmitting(true)
    const result = await subscribeNewsletter({
      email: email.trim(),
      accept_privacy: true,
      website,
      _ts: renderedAt.current,
    })
    setIsSubmitting(false)

    if (result.ok) {
      launchConfetti()
      setStatus({ ok: true, message: result.message })
      setEmail('')
      setAcceptPrivacy(false)
      renderedAt.current = Date.now()
      return
    }

    const fieldErrors = firstErrors(result.errors)
    setStatus({ ok: false, message: fieldErrors.email || fieldErrors.accept_privacy || result.message })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Honeypot id="product-website" value={website} onChange={(e) => setWebsite(e.target.value)} />
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          id="subscription-email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="flex-1 px-5 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white text-base transition-all"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-7 py-3 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isSubmitting ? 'Procesando...' : 'Apuntarme a la lista'}
        </button>
      </div>
      <div className="flex items-start gap-2">
        <input
          id="product-privacy-checkbox"
          type="checkbox"
          checked={acceptPrivacy}
          onChange={(e) => setAcceptPrivacy(e.target.checked)}
          className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
          required
        />
        <label htmlFor="product-privacy-checkbox" className="text-sm text-gray-600">
          Acepto el{' '}
          <a href="/privacy/" className="text-primary hover:underline">
            manejo de mis datos y las políticas de privacidad
          </a>
        </label>
      </div>
      {status && (
        <p
          role="status"
          className={`text-sm text-center ${status.ok ? 'text-green-600' : 'text-red-600'}`}
        >
          {status.message}
        </p>
      )}
    </form>
  )
}

export default SubscriptionForm
