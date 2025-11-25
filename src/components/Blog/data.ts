// images
import postImg1 from '../../assets/images/blog/post1.jpg'
import postImg2 from '../../assets/images/blog/post3.jpg'

import agoramyAutor from '../../assets/images/agoramyAutorw.webp'

import blog1 from '../../assets/images/blog/blog-1.png'
import blog2 from '../../assets/images/blog/blog-2.png'
import blog3 from '../../assets/images/blog/blog-3.png'

export type Post = {
	image: string
	tag: { variant?: string; value: string }
	title: string
	slug?: string
	description?: string
	content?: string
	postedBy?: {
		avatar: string
		name: string
	}
	postedOn?: {
		date: string
		time: string
	}
	overlay?: string
	groupAvatars?: string[]
}

const post1: Post[] = [
	{
		image: postImg1.src,
		tag: { value: 'Anuncio' },
		title: '¡Agoramy Está por Llegar! Acceso Beta Gratuito por 2 Meses',
		slug: 'lanzamiento-beta-agoramy',
		description:
			'Estamos emocionados de anunciar el lanzamiento de Agoramy POS. Los primeros usuarios tendrán 2 meses completamente gratis para probar nuestro sistema en fase beta...',
		content: `
			<p class="mb-4">Después de meses de desarrollo y pruebas, estamos listos para presentar Agoramy POS, el sistema de punto de venta diseñado específicamente para farmacias en México.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Oferta Especial de Lanzamiento</h2>
			<p class="mb-4">Para celebrar nuestro lanzamiento, estamos ofreciendo una oportunidad única:</p>
			<div class="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
				<p class="font-bold text-green-800 mb-2">🎉 2 Meses Completamente Gratis</p>
				<p class="text-green-700">Los primeros usuarios que se registren durante la fase beta tendrán acceso gratuito por 2 meses a todas las funciones del sistema, sin restricciones.</p>
			</div>
			<h2 class="text-2xl font-bold mb-3 mt-6">Cupos Limitados</h2>
			<p class="mb-4">Esta oferta es exclusiva para un número limitado de farmacias. Una vez que alcancemos el cupo, la promoción finalizará. No queremos saturar el sistema durante la fase beta para garantizar la mejor experiencia posible.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">¿Qué Incluye el Acceso Beta?</h2>
			<ul class="list-disc pl-6 mb-4">
				<li><strong>Acceso completo:</strong> Todas las funcionalidades disponibles sin limitaciones</li>
				<li><strong>Soporte prioritario:</strong> Atención personalizada para resolver cualquier duda</li>
				<li><strong>Voz en el desarrollo:</strong> Tus comentarios ayudarán a mejorar el producto</li>
				<li><strong>Sin compromiso:</strong> Puedes cancelar en cualquier momento</li>
			</ul>
			<h2 class="text-2xl font-bold mb-3 mt-6">Requisitos para Participar</h2>
			<p class="mb-4">Solo necesitas:</p>
			<ul class="list-disc pl-6 mb-4">
				<li>Ser una farmacia operando en México</li>
				<li>Tener conexión a internet estable</li>
				<li>Estar dispuesto a compartir retroalimentación sobre tu experiencia</li>
			</ul>
			<h2 class="text-2xl font-bold mb-3 mt-6">Cómo Registrarte</h2>
			<p class="mb-4">Visita nuestra página de producto y regístrate en la lista de espera. Los usuarios serán aceptados por orden de registro hasta completar los cupos disponibles.</p>
			<div class="bg-orange-50 border-l-4 border-orange-500 p-6 mb-6">
				<p class="font-bold text-orange-800 mb-2">⚠️ Nota Importante</p>
				<p class="text-orange-700">Esta promoción puede cambiar o finalizar en cualquier momento sin previo aviso. Regístrate pronto para no perder esta oportunidad única.</p>
			</div>
			<h2 class="text-2xl font-bold mb-3 mt-6">¿Por Qué Beta?</h2>
			<p class="mb-4">La fase beta nos permite perfeccionar el sistema con retroalimentación real de farmacias como la tuya. Queremos asegurarnos de que Agoramy sea la herramienta perfecta para tu negocio antes del lanzamiento oficial.</p>
			<p class="mb-4">¡Únete a nosotros en esta emocionante etapa y sé parte de la transformación digital de las farmacias en México!</p>
		`,
		postedBy: {
			avatar: agoramyAutor.src,
			name: 'Agoramy',
		},
		postedOn: {
			date: '25 de noviembre de 2025',
			time: '4 min de lectura',
		},
	},
	{
		image: postImg2.src,
		tag: { value: 'Tutorial' },
		title: 'Cómo empezar con Agoramy en tu farmacia',
		slug: 'empezar-con-agoramy',
		description:
			'Una guía paso a paso para configurar Agoramy en tu farmacia y comenzar a disfrutar de sus beneficios desde el primer día...',
		content: `
			<p class="mb-4">Empezar con Agoramy es más fácil de lo que piensas. En esta guía te mostraremos paso a paso cómo configurar el sistema en tu farmacia.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Paso 1: Registro e Instalación</h2>
			<p class="mb-4">Lo primero es crear tu cuenta en Agoramy. El proceso es simple y solo toma unos minutos. Una vez registrado, podrás descargar e instalar el sistema en tu computadora o tablet.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Paso 2: Configuración Inicial</h2>
			<p class="mb-4">Configura los datos de tu farmacia, incluyendo:</p>
			<ul class="list-disc pl-6 mb-4">
				<li>Información fiscal y de facturación</li>
				<li>Datos de contacto</li>
				<li>Horarios de operación</li>
				<li>Usuarios y permisos</li>
			</ul>
			<h2 class="text-2xl font-bold mb-3 mt-6">Paso 3: Importa tu Inventario</h2>
			<p class="mb-4">Puedes importar tu inventario actual desde una hoja de Excel o ingresarlo manualmente. Agoramy te ayudará a organizar y categorizar todos tus productos.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Paso 4: Primera Venta</h2>
			<p class="mb-4">¡Listo! Ya puedes realizar tu primera venta. El sistema es intuitivo y tu equipo aprenderá a usarlo rápidamente.</p>
		`,
		postedBy: {
			avatar: agoramyAutor.src,
			name: 'Agoramy',
		},
		postedOn: {
			date: '15 de enero de 2024',
			time: '7 min de lectura',
		},
	},
	{
		image: postImg1.src,
		tag: { value: 'Negocios' },
		title: 'La Transformación Digital en Farmacias Mexicanas',
		slug: 'transformacion-digital-farmacias',
		description:
			'Descubre cómo la tecnología está revolucionando el sector farmacéutico en México y por qué tu farmacia no puede quedarse atrás...',
		content: `
			<p class="mb-4">La transformación digital ha llegado al sector farmacéutico mexicano y está cambiando la forma en que las farmacias operan día a día.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">¿Qué es la Transformación Digital?</h2>
			<p class="mb-4">Es la integración de tecnología digital en todas las áreas de tu negocio, cambiando fundamentalmente cómo operas y entregas valor a tus clientes.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Beneficios para tu Farmacia</h2>
			<ul class="list-disc pl-6 mb-4">
				<li><strong>Mayor eficiencia:</strong> Automatiza procesos repetitivos y ahorra tiempo</li>
				<li><strong>Mejor control:</strong> Conoce en tiempo real el estado de tu inventario</li>
				<li><strong>Menos errores:</strong> Reduce equivocaciones en ventas y facturación</li>
				<li><strong>Mejores decisiones:</strong> Reportes y análisis para tomar decisiones informadas</li>
			</ul>
			<h2 class="text-2xl font-bold mb-3 mt-6">El Futuro es Digital</h2>
			<p class="mb-4">Las farmacias que adoptan tecnología moderna están mejor preparadas para competir y crecer en el mercado actual.</p>
		`,
		postedBy: {
			avatar: agoramyAutor.src,
			name: 'Agoramy',
		},
		postedOn: {
			date: '20 de enero de 2024',
			time: '5 min de lectura',
		},
	},
]

const post2: Post[] = [
	{
		image: blog2.src,
		tag: { variant: 'bg-green-500/10 text-green-500 ', value: 'Tutorial' },
		title: 'Lo que debes saber antes de considerar Agoramy',
		slug: 'que-saber-antes-agoramy',
		description:
			'Ofrecemos una guía y un contexto bastante extensos antes de que tomes tu decisión de considerar Agoramy...',
		content: `
			<p class="mb-4">Antes de elegir un sistema POS para tu farmacia, es importante conocer todos los detalles. Aquí te compartimos todo lo que necesitas saber sobre Agoramy.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">¿Para quién es Agoramy?</h2>
			<p class="mb-4">Agoramy está diseñado específicamente para farmacias en México, desde pequeños negocios hasta cadenas medianas.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Requisitos Técnicos</h2>
			<ul class="list-disc pl-6 mb-4">
				<li>Computadora con Windows 10 o superior</li>
				<li>Conexión a internet estable</li>
				<li>Lector de código de barras (recomendado)</li>
			</ul>
			<h2 class="text-2xl font-bold mb-3 mt-6">Inversión</h2>
			<p class="mb-4">Ofrecemos planes flexibles que se adaptan a tu presupuesto, con acceso beta gratuito por 2 meses.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Soporte y Capacitación</h2>
			<p class="mb-4">Incluimos capacitación inicial y soporte técnico continuo para que siempre tengas ayuda cuando la necesites.</p>
		`,
		postedBy: {
			avatar: agoramyAutor.src,
			name: 'Agoramy',
		},
		postedOn: {
			date: '10 de noviembre de 2025',
			time: '5 min de lectura',
		},
	},
	{
		image: blog2.src,
		tag: { variant: 'bg-purple-500/10 text-purple-500', value: 'Tutorial' },
		title: 'Cómo Gestionar el Inventario de tu Farmacia',
		slug: 'gestionar-inventario-farmacia',
		description:
			'Aprende a controlar tu inventario de manera efectiva, evitar pérdidas por caducidad y mantener el stock óptimo en tu farmacia...',
		content: `
			<p class="mb-4">La gestión del inventario es crucial para el éxito de tu farmacia. Un buen control te ayuda a evitar pérdidas y maximizar ganancias.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Importancia del Control de Inventario</h2>
			<p class="mb-4">Un inventario bien gestionado te permite:</p>
			<ul class="list-disc pl-6 mb-4">
				<li>Evitar productos caducados</li>
				<li>Mantener stock suficiente de productos populares</li>
				<li>Reducir capital inmovilizado</li>
				<li>Tomar mejores decisiones de compra</li>
			</ul>
			<h2 class="text-2xl font-bold mb-3 mt-6">Método PEPS (Primeras Entradas, Primeras Salidas)</h2>
			<p class="mb-4">Usa este método para rotar tu inventario y minimizar caducidades. Los productos que llegaron primero deben venderse primero.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Usa Tecnología</h2>
			<p class="mb-4">Un sistema POS moderno te ayuda a rastrear automáticamente tu inventario y recibir alertas cuando los productos están por caducar.</p>
		`,
		postedBy: {
			avatar: agoramyAutor.src,
			name: 'Agoramy',
		},
		postedOn: {
			date: '5 de noviembre de 2025',
			time: '6 min de lectura',
		},
	},
]

const post3: Post[] = [
	// {
	// 	image: postImg2.src,
	// 	tag: { variant: 'danger', value: 'Recurso' },
	// 	title: 'Las 10 mejores ideas para mejorar la productividad del equipo',
	// 	groupAvatars: [agoramyAutor.src, agoramyAutor.src, agoramyAutor.src],
	// },
]

export { post1, post2, post3 }
