// images
import postImg1 from '../../assets/images/blog/post1.jpg'
import postImg2 from '../../assets/images/blog/post3.jpg'

import avatar1 from '../../assets/images/avatars/img-1.jpg'
import avatar2 from '../../assets/images/avatars/img-2.jpg'
import avatar3 from '../../assets/images/avatars/img-7.jpg'

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
		title: 'Anunciando la actualización gratuita para los planes suscritos',
		slug: 'actualizacion-gratuita-planes',
		description:
			'Nos complace anunciar que, esta semana actualizaremos todas las cuentas suscritas con las funciones premium...',
		content: `
			<p class="mb-4">Nos complace anunciar que esta semana actualizaremos todas las cuentas suscritas con las funciones premium de forma completamente gratuita.</p>
			<p class="mb-4">Esta actualización incluye nuevas características que harán tu experiencia con Agoramy aún mejor:</p>
			<ul class="list-disc pl-6 mb-4">
				<li>Reportes avanzados de ventas e inventario</li>
				<li>Integración con más proveedores</li>
				<li>Soporte prioritario 24/7</li>
				<li>Capacitación personalizada para tu equipo</li>
			</ul>
			<p class="mb-4">No necesitas hacer nada, la actualización se aplicará automáticamente a tu cuenta.</p>
		`,
		postedBy: {
			avatar: avatar2.src,
			name: 'Emily Blunt',
		},
		postedOn: {
			date: '11 de marzo de 2020',
			time: '3 min de lectura',
		},
	},
	{
		image: postImg1.src,
		tag: { value: 'Comunidad' },
		title: '¿El Diseño Web Dominará el Mundo Algún Día?',
		slug: 'diseno-web-dominara-mundo',
		description:
			'La web ha cambiado mucho en la era actual. Muchas nuevas tendencias se están utilizando en el mercado en este momento...',
		content: `
			<p class="mb-4">La web ha cambiado mucho en la era actual. Muchas nuevas tendencias se están utilizando en el mercado en este momento y el diseño web ha evolucionado significativamente.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">El Futuro del Diseño Web</h2>
			<p class="mb-4">El diseño web moderno no solo se trata de estética, sino de crear experiencias de usuario excepcionales que sean accesibles, rápidas y funcionales.</p>
			<p class="mb-4">Las tendencias actuales incluyen:</p>
			<ul class="list-disc pl-6 mb-4">
				<li>Diseño minimalista y limpio</li>
				<li>Interfaces adaptables y responsive</li>
				<li>Animaciones sutiles que mejoran la experiencia</li>
				<li>Modo oscuro como estándar</li>
			</ul>
		`,
		postedBy: {
			avatar: avatar1.src,
			name: 'Greeva N',
		},
		postedOn: {
			date: '9 de marzo de 2020',
			time: '5 min de lectura',
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
			avatar: avatar3.src,
			name: 'Carlos Méndez',
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
			avatar: avatar1.src,
			name: 'María González',
		},
		postedOn: {
			date: '20 de enero de 2024',
			time: '5 min de lectura',
		},
	},
]

const post2: Post[] = [
	{
		image: blog1.src,
		tag: { variant: 'bg-orange-500/10 text-orange-500', value: 'Anuncio' },
		title: 'Presentamos una nueva interfaz de usuario ultrarrápida',
		slug: 'nueva-interfaz-ultrarapida',
		description:
			'Presentamos la interfaz de usuario ultrarrápida. La nueva interfaz de usuario es rápida, segura y muy fácil de usar...',
		content: `
			<p class="mb-4">Estamos emocionados de presentar nuestra nueva interfaz de usuario ultrarrápida, diseñada desde cero para ofrecer la mejor experiencia posible.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Diseño Moderno y Limpio</h2>
			<p class="mb-4">La nueva interfaz cuenta con un diseño minimalista que te permite enfocarte en lo importante: tu trabajo.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Velocidad Mejorada</h2>
			<p class="mb-4">Hemos optimizado cada aspecto del sistema para que funcione más rápido que nunca. Las pantallas cargan instantáneamente y las operaciones se completan en segundos.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Fácil de Usar</h2>
			<p class="mb-4">La nueva interfaz es intuitiva y fácil de aprender. Tu equipo se adaptará rápidamente sin necesidad de capacitación extensa.</p>
		`,
	},
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
			<p class="mb-4">Ofrecemos planes flexibles que se adaptan a tu presupuesto, con prueba gratuita de 14 días sin compromiso.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Soporte y Capacitación</h2>
			<p class="mb-4">Incluimos capacitación inicial y soporte técnico continuo para que siempre tengas ayuda cuando la necesites.</p>
		`,
	},
	{
		image: blog3.src,
		tag: { variant: 'bg-teal-500/10 text-teal-500', value: 'Comunidad' },
		title: 'Tu Camino Hacia Campañas de Ventas Exitosas',
		slug: 'campañas-ventas-exitosas',
		description:
			'Explora una guía actualizada para crear una campaña de ventas online exitosa utilizando Google Ads o Facebook Ads...',
		content: `
			<p class="mb-4">Las campañas de ventas online pueden transformar tu farmacia. Aquí te mostramos cómo crear campañas exitosas que realmente generen resultados.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Define tu Objetivo</h2>
			<p class="mb-4">Antes de empezar, debes tener claro qué quieres lograr: ¿más ventas, más clientes, promocionar un producto específico?</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Conoce a tu Audiencia</h2>
			<p class="mb-4">Identifica quiénes son tus clientes ideales: edad, ubicación, intereses. Esto te ayudará a crear anuncios más efectivos.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Plataformas Recomendadas</h2>
			<ul class="list-disc pl-6 mb-4">
				<li><strong>Facebook/Instagram Ads:</strong> Ideal para alcance local y promociones</li>
				<li><strong>Google Ads:</strong> Perfecto para captar búsquedas específicas</li>
				<li><strong>WhatsApp Business:</strong> Para comunicación directa con clientes</li>
			</ul>
			<h2 class="text-2xl font-bold mb-3 mt-6">Mide tus Resultados</h2>
			<p class="mb-4">Usa las herramientas de análisis para ver qué funciona y qué no. Ajusta tu estrategia basándote en datos reales.</p>
		`,
	},
	{
		image: blog1.src,
		tag: { variant: 'bg-blue-500/10 text-blue-500', value: 'Negocios' },
		title: '5 Consejos para Optimizar tu Farmacia',
		slug: 'consejos-optimizar-farmacia',
		description:
			'Descubre las mejores prácticas para mejorar la eficiencia de tu farmacia y aumentar tus ventas diarias con estrategias simples...',
		content: `
			<p class="mb-4">Optimizar tu farmacia no tiene que ser complicado. Aquí te compartimos 5 consejos prácticos que puedes implementar hoy mismo.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">1. Organiza tu Espacio de Trabajo</h2>
			<p class="mb-4">Un espacio ordenado aumenta la productividad. Asegúrate de que los productos más vendidos estén al alcance y que tu área de trabajo esté limpia.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">2. Implementa un Sistema POS Moderno</h2>
			<p class="mb-4">Un buen sistema POS te ahorra tiempo y reduce errores. Invierte en tecnología que haga tu trabajo más fácil.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">3. Capacita a tu Equipo</h2>
			<p class="mb-4">Un equipo bien capacitado ofrece mejor servicio y comete menos errores. Dedica tiempo a entrenar a tu personal.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">4. Controla tu Inventario</h2>
			<p class="mb-4">Lleva un control riguroso de tus productos para evitar caducidades y faltantes.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">5. Escucha a tus Clientes</h2>
			<p class="mb-4">El feedback de tus clientes es valioso. Úsalo para mejorar continuamente tu servicio.</p>
		`,
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
	},
	{
		image: blog3.src,
		tag: { variant: 'bg-pink-500/10 text-pink-500', value: 'Recursos' },
		title: 'Guía Completa: Sistema POS para Farmacias',
		slug: 'guia-sistema-pos-farmacias',
		description:
			'Todo lo que necesitas saber sobre sistemas POS modernos y cómo pueden transformar la operación diaria de tu farmacia...',
		content: `
			<p class="mb-4">Un sistema POS es mucho más que una caja registradora digital. Es una herramienta integral para gestionar tu farmacia.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">¿Qué es un Sistema POS?</h2>
			<p class="mb-4">POS significa "Point of Sale" (Punto de Venta). Es un sistema que te permite procesar ventas, controlar inventario, generar reportes y mucho más.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Características Esenciales</h2>
			<ul class="list-disc pl-6 mb-4">
				<li><strong>Control de Inventario:</strong> Rastrea automáticamente cada venta y actualiza tu stock</li>
				<li><strong>Facturación Electrónica:</strong> Cumple con las regulaciones del SAT</li>
				<li><strong>Reportes:</strong> Analiza tus ventas y toma decisiones informadas</li>
				<li><strong>Multi-usuario:</strong> Varios empleados pueden usar el sistema simultáneamente</li>
			</ul>
			<h2 class="text-2xl font-bold mb-3 mt-6">Beneficios para tu Farmacia</h2>
			<p class="mb-4">Un buen sistema POS reduce errores, ahorra tiempo y te da control total sobre tu negocio.</p>
		`,
	},
	{
		image: blog1.src,
		tag: { variant: 'bg-indigo-500/10 text-indigo-500', value: 'Negocios' },
		title: 'Mejora la Atención al Cliente en tu Farmacia',
		slug: 'mejorar-atencion-cliente-farmacia',
		description:
			'Estrategias probadas para ofrecer un servicio excepcional y fidelizar a tus clientes en el sector farmacéutico mexicano...',
		content: `
			<p class="mb-4">La atención al cliente es fundamental en el sector farmacéutico. Un cliente satisfecho es un cliente que regresa.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">La Importancia del Servicio al Cliente</h2>
			<p class="mb-4">En el sector de farmacias, los clientes no solo buscan productos, buscan asesoría y confianza. Tu servicio marca la diferencia.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Estrategias Efectivas</h2>
			<ul class="list-disc pl-6 mb-4">
				<li><strong>Conoce tus productos:</strong> Tu equipo debe conocer bien los medicamentos y productos que ofreces</li>
				<li><strong>Escucha activamente:</strong> Presta atención a las necesidades de cada cliente</li>
				<li><strong>Sé rápido pero preciso:</strong> Atiende con agilidad sin sacrificar calidad</li>
				<li><strong>Ofrece valor agregado:</strong> Brinda consejos y recomendaciones útiles</li>
			</ul>
			<h2 class="text-2xl font-bold mb-3 mt-6">Programa de Fidelización</h2>
			<p class="mb-4">Considera implementar un programa de puntos o descuentos para clientes frecuentes. Esto aumenta la lealtad y las ventas recurrentes.</p>
		`,
	},
	{
		image: blog2.src,
		tag: { variant: 'bg-green-500/10 text-green-500', value: 'Tutorial' },
		title: 'Facturación Electrónica para Farmacias en México',
		slug: 'facturacion-electronica-farmacias',
		description:
			'Guía paso a paso para implementar la facturación electrónica en tu farmacia cumpliendo con las regulaciones del SAT...',
		content: `
			<p class="mb-4">La facturación electrónica es obligatoria en México. Aquí te explicamos cómo cumplir con esta regulación fácilmente.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">¿Qué es la Facturación Electrónica?</h2>
			<p class="mb-4">Es un comprobante fiscal digital (CFDI) que sustituye a las facturas en papel y cumple con los requisitos del SAT.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Requisitos Básicos</h2>
			<ul class="list-disc pl-6 mb-4">
				<li>Certificado de Sello Digital (CSD) vigente</li>
				<li>RFC activo</li>
				<li>Sistema de facturación certificado por el SAT</li>
				<li>Conexión a internet</li>
			</ul>
			<h2 class="text-2xl font-bold mb-3 mt-6">Ventajas para tu Farmacia</h2>
			<p class="mb-4">La facturación electrónica reduce costos de papel, agiliza procesos y te mantiene en cumplimiento con las autoridades fiscales.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Agoramy te Facilita el Proceso</h2>
			<p class="mb-4">Nuestro sistema integra la facturación electrónica, generando automáticamente CFDIs válidos con cada venta.</p>
		`,
	},
	{
		image: blog3.src,
		tag: { variant: 'bg-orange-500/10 text-orange-500', value: 'Anuncio' },
		title: 'Nuevas Funciones de Agoramy para 2024',
		slug: 'nuevas-funciones-agoramy-2024',
		description:
			'Conoce las últimas actualizaciones y funcionalidades que hemos agregado para hacer tu trabajo más fácil y eficiente...',
		content: `
			<p class="mb-4">Estamos emocionados de anunciar las nuevas funciones que hemos agregado a Agoramy en 2024. Estas mejoras harán tu trabajo aún más eficiente.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Interfaz Renovada</h2>
			<p class="mb-4">Hemos rediseñado completamente la interfaz para hacerla más intuitiva y moderna. Ahora es más fácil encontrar lo que necesitas.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Reportes Avanzados</h2>
			<p class="mb-4">Nuevos reportes con gráficas interactivas te permiten visualizar el desempeño de tu farmacia de forma clara y comprensible.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Integración con Proveedores</h2>
			<p class="mb-4">Ahora puedes conectar directamente con tus proveedores principales para agilizar el proceso de pedidos y reabastecimiento.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">App Móvil</h2>
			<p class="mb-4">Lanzamos nuestra app móvil para que puedas consultar información de tu farmacia desde cualquier lugar.</p>
			<h2 class="text-2xl font-bold mb-3 mt-6">Disponible Ahora</h2>
			<p class="mb-4">Todas estas funciones están disponibles sin costo adicional para clientes suscritos. ¡Actualiza hoy mismo!</p>
		`,
	},
]

const post3: Post[] = [
	{
		image: postImg2.src,
		tag: { variant: 'danger', value: 'Recurso' },
		title: 'Las 10 mejores ideas para mejorar la productividad del equipo',
		groupAvatars: [avatar3.src, avatar1.src, avatar2.src],
	},
]

export { post1, post2, post3 }
