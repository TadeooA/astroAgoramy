import { useState } from 'react'

const faqContent = [
  {
    title: '¿Cómo funciona Prompt?',
    description: 'Prompt es una plataforma SaaS que ayuda a las empresas a gestionar sus relaciones con los clientes y sus procesos de ventas. Proporciona herramientas para el seguimiento de clientes potenciales, la gestión de contactos y la automatización de flujos de trabajo.'
  },
  {
    title: '¿Qué incluye la prueba gratuita?',
    description: 'La prueba gratuita incluye acceso a todas las características de nuestro plan Profesional durante 14 días. No se requiere tarjeta de crédito.'
  },
  {
    title: '¿Puedo cambiar mi plan más tarde?',
    description: 'Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se reflejarán en tu próximo ciclo de facturación.'
  },
  {
    title: '¿Ofrecen reembolsos?',
    description: 'Ofrecemos una garantía de devolución de dinero de 30 días para todos nuestros planes. Si no estás satisfecho, contacta a nuestro equipo de soporte para un reembolso completo.'
  }
]

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-slate-100">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-medium py-1 px-3 rounded-full text-primary bg-primary/10">
            Preguntas Frecuentes
          </span>
          <h2 className="md:text-3xl/tight text-3xl font-semibold my-4">
            Preguntas Frecuentes
          </h2>
          <p className="md:text-lg text-slate-500 leading-7">
            Aquí hay algunas de las preguntas básicas para nuestros clientes
          </p>
        </div>
        <div className="mt-16 lg:mx-32">
          <div>
            {faqContent.map((item, idx) => (
              <div
                key={idx}
                className={`rounded border bg-white ${idx === 0 ? '' : 'mt-2'}`}
              >
                <button
                  className="sm:text-base p-5 inline-flex items-center gap-x-3 w-full font-medium text-gray-800 transition hover:text-gray-500"
                  onClick={() => handleToggle(idx)}
                >
                  {item.title}
                  <span
                    className={`fa-solid fa-angle-down ms-auto transition-all ${
                      activeIndex === idx ? '-rotate-90' : ''
                    }`}
                  />
                </button>
                {activeIndex === idx && (
                  <div className="w-full overflow-hidden transition-[height] duration-300">
                    <p className="sm:text-sm font-medium text-gray-500 p-5 pt-0">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQs
