import { useState } from 'react'

const faqContent = [
  {
    title: '¿Cómo funciona Agoramy?',
    description: 'Agoramy es un sistema POS diseñado específicamente para farmacias en México. Te ayuda a gestionar inventario, ventas, facturación electrónica, control de medicamentos controlados, empleados y mucho más desde una sola plataforma.'
  },
  {
    title: '¿Qué incluye cada plan?',
    description: 'Cada plan incluye diferentes límites de cajas, empleados y productos. Todos los planes incluyen facturación electrónica, soporte técnico, capacitación y acceso a análisis de datos. Los planes superiores incluyen características adicionales como mensajes de IA y análisis avanzados.'
  },
  {
    title: '¿Puedo cambiar mi plan más tarde?',
    description: 'Sí, puedes actualizar o cambiar tu plan en cualquier momento según las necesidades de tu farmacia. Los cambios se reflejarán en tu próximo ciclo de facturación mensual.'
  },
  {
    title: '¿Cómo funcionan los extras?',
    description: 'Cada plan permite agregar extras como cajas adicionales, empleados extra, más productos o mensajes de IA. Los costos de los extras se suman a tu suscripción mensual y puedes ajustarlos según tus necesidades.'
  },
  {
    title: '¿El sistema cumple con las normativas mexicanas?',
    description: 'Sí, Agoramy cumple con todas las normativas de COFEPRIS para el manejo de medicamentos controlados y con los requisitos del SAT para facturación electrónica CFDI 4.0.'
  },
  {
    title: '¿Ofrecen capacitación?',
    description: 'Sí, todos los planes incluyen capacitación inicial para que tu equipo aprenda a usar la plataforma. Además, contamos con soporte técnico continuo para resolver cualquier duda.'
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
