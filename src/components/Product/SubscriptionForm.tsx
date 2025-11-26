import { useState } from 'react'
import Turnstile from '../Common/Turnstile'

const SubscriptionForm = () => {
  const [email, setEmail] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email) {
      alert('Por favor, introduce tu correo electrónico')
      return
    }

    if (!turnstileToken) {
      alert('Por favor, completa la verificación de seguridad')
      return
    }

    setIsSubmitting(true)
    try {
      // Aquí puedes enviar los datos del formulario junto con el token
      console.log('Email:', email)
      console.log('Turnstile token:', turnstileToken)

      // TODO: Enviar a tu backend para validación y suscripción
      alert('¡Gracias por suscribirte! Te notificaremos cuando lancemos.')
      setEmail('')
    } catch (error) {
      console.error('Error al suscribirse:', error)
      alert('Error al procesar tu suscripción')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
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
