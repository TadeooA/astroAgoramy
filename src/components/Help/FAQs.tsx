import { useState } from 'react'

const faqs = [
  {
    question: '¿Cómo restablezco mi contraseña?',
    answer: 'Puedes restablecer tu contraseña haciendo clic en el enlace "Olvidé mi contraseña" en la página de inicio de sesión. Introduce tu dirección de correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.'
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos todas las principales tarjetas de crédito (Visa, Mastercard, American Express), PayPal y transferencias bancarias para clientes empresariales.'
  },
  {
    question: '¿Puedo cancelar mi suscripción en cualquier momento?',
    answer: 'Sí, puedes cancelar tu suscripción en cualquier momento desde la configuración de tu cuenta. Tu acceso continuará hasta el final de tu período de facturación actual.'
  },
  {
    question: '¿Ofrecen reembolsos?',
    answer: 'Ofrecemos una garantía de devolución de dinero de 30 días. Si no estás satisfecho con nuestro servicio, contacta a nuestro equipo de soporte dentro de los 30 días de tu compra para un reembolso completo.'
  },
  {
    question: '¿Cómo puedo contactar al soporte?',
    answer: 'Puedes contactar a nuestro equipo de soporte por correo electrónico a support@prompt.com, a través de nuestro chat en vivo, o enviando un ticket en tu panel de control.'
  }
]

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-semibold mb-8">Preguntas Frecuentes</h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-gray-100">
            <button
              className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
            >
              <span className="font-semibold text-gray-800">{faq.question}</span>
              <i
                className={`fa-solid fa-chevron-down transition-transform ${
                  activeIndex === idx ? 'rotate-180' : ''
                }`}
              />
            </button>
            {activeIndex === idx && (
              <div className="px-6 pb-6 text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQs
