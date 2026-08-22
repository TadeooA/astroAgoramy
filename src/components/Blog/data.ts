// images
import postImg1 from '../../assets/images/blog/post1.jpg'
import postImg2 from '../../assets/images/blog/post3.jpg'

import agoramyAutor from '../../assets/images/agoramyAutorw.webp'

import lanzamientoBlog from '../../assets/images/blog/lanzamientoBlogw.webp'
import consideracionesBlog from '../../assets/images/blog/consideracionesw.webp'
import inventarioBlog from '../../assets/images/blog/inventarioBlogw.webp'
import expansionBlog from '../../assets/images/blog/blog-2.png'
import controlBlog from '../../assets/images/blog/post2.jpg'

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
		image: expansionBlog.src,
		tag: { value: 'Anuncio' },
		title: 'Agoramy ya no es solo para farmacias: llegamos a ferreterías y tiendas',
		slug: 'agoramy-ferreterias-y-tiendas',
		description:
			'Empezamos en el mostrador de las farmacias. Hoy el mismo sistema opera en ferreterías y tiendas de abarrotes, con los módulos que cada giro necesita...',
		content: `
			<p class="mb-4">Agoramy nació resolviendo un problema muy concreto: el mostrador de una farmacia en México. Lotes, caducidades, recetas, COFEPRIS y el SAT encima. Al construir eso terminamos armando algo más general de lo que planeábamos: un punto de venta, un inventario y una facturación que funcionan igual de bien en cualquier negocio que venda de mostrador.</p>
			<p class="mb-4">Nos lo hicieron notar los propios clientes. Varios tenían una ferretería o una tienda además de la farmacia, y nos preguntaban lo mismo: ¿por qué no puedo usar Agoramy allá también? A partir de hoy, ya se puede.</p>

			<h2 class="text-2xl font-bold mb-3 mt-6">La base es la misma para todos</h2>
			<p class="mb-4">No hicimos tres productos. Es un solo sistema, y el núcleo no cambia según tu giro:</p>
			<ul class="list-disc pl-6 mb-4">
				<li>Punto de venta y cortes de caja</li>
				<li>Inventario en tiempo real y alertas de reorden</li>
				<li>Facturación electrónica CFDI 4.0 con timbrado automático</li>
				<li>Reportes de ventas, márgenes y productos más vendidos</li>
				<li>Multi-sucursal y control de empleados por rol</li>
				<li>Modo sin conexión, con sincronización cuando vuelve la red</li>
			</ul>

			<h2 class="text-2xl font-bold mb-3 mt-6">Lo que cambia es el módulo de tu giro</h2>
			<p class="mb-4">Al dar de alta tu negocio eliges el giro, y se activa lo que ese mostrador necesita todos los días.</p>

			<h3 class="text-xl font-semibold mb-2 mt-5">Ferreterías</h3>
			<ul class="list-disc pl-6 mb-4">
				<li>Venta a granel y por medida: metro, kilo, pieza, con conversión entre unidades</li>
				<li>Búsqueda por clave de proveedor, medida o equivalencia de marca</li>
				<li>Cotizaciones para obra y control de saldos de clientes a crédito</li>
				<li>Kits y armados que descuentan cada componente del inventario</li>
			</ul>

			<h3 class="text-xl font-semibold mb-2 mt-5">Tiendas y abarrotes</h3>
			<ul class="list-disc pl-6 mb-4">
				<li>Cobro rápido con código de barras, teclas rápidas y báscula conectada</li>
				<li>Fiado y apartados, con la cuenta del cliente a la mano</li>
				<li>Promociones 2x1, 3x2 y descuentos por volumen o temporada</li>
				<li>Control de mermas: caducidad, roturas y ajustes de inventario</li>
			</ul>

			<h3 class="text-xl font-semibold mb-2 mt-5">Farmacias</h3>
			<p class="mb-4">Nada de lo que ya tenías se va. Medicamentos controlados con registro y reportes para COFEPRIS, folio de receta, trazabilidad por lote y caducidad, y sugerencia de genéricos por sustancia activa siguen ahí, igual que antes.</p>

			<h2 class="text-2xl font-bold mb-3 mt-6">¿Y si tengo dos negocios de giros distintos?</h2>
			<p class="mb-4">Se pueden administrar desde la misma cuenta. Cada sucursal conserva su giro y su módulo, y los reportes se pueden ver por negocio o consolidados.</p>

			<h2 class="text-2xl font-bold mb-3 mt-6">Seguimos en beta</h2>
			<p class="mb-4">El sistema ya está operando en negocios reales, pero seguimos en fase de pruebas y publicando mejoras cada semana. Si tu giro es de mostrador y no está en la lista, escríbenos: la mayoría funciona con la configuración estándar.</p>
		`,
		postedBy: {
			avatar: agoramyAutor.src,
			name: 'Agoramy',
		},
		postedOn: {
			date: '22 de agosto de 2026',
			time: '5 min de lectura',
		},
	},
	{
		image: controlBlog.src,
		tag: { value: 'Negocios' },
		title: 'La ventaja de tener el control real de tu negocio',
		slug: 'control-de-tu-negocio',
		description:
			'No es tener más reportes. Es dejar de adivinar cuánto ganaste, qué te falta y quién vendió qué. La diferencia entre operar tu negocio y que el negocio te opere a ti...',
		content: `
			<p class="mb-4">Pregúntale a cualquier dueño de mostrador cuánto ganó el martes pasado. Casi siempre pasa lo mismo: te dice cuánto entró a la caja. No es lo mismo. Entre lo que entró y lo que ganaste hay proveedores, mermas, descuentos que dio un empleado, producto caducado y un cajón lleno de tickets.</p>
			<p class="mb-4">Tener el control no significa llenarse de gráficas. Significa poder contestar sin dudar cuatro preguntas.</p>

			<h2 class="text-2xl font-bold mb-3 mt-6">1. ¿Cuánto gané, no cuánto vendí?</h2>
			<p class="mb-4">La venta es vanidad; el margen es el negocio. Cuando cada producto tiene su costo cargado, el sistema te dice el margen por venta, por categoría y por sucursal. Ahí es donde uno descubre que el producto que más sale es el que menos deja, y que hay un estante entero trabajando gratis.</p>

			<h2 class="text-2xl font-bold mb-3 mt-6">2. ¿Qué tengo y qué me falta?</h2>
			<p class="mb-4">El inventario mal contado cuesta dos veces: pierdes la venta del producto que no tenías y tienes dinero parado en el que nadie te compra. Con inventario en tiempo real y punto de reorden, la compra deja de hacerse por corazonada.</p>
			<ul class="list-disc pl-6 mb-4">
				<li>Sabes qué reponer antes de quedarte sin existencia</li>
				<li>Ves qué lleva meses sin moverse y ocupa capital</li>
				<li>Te enteras de las caducidades antes de que se conviertan en merma</li>
			</ul>

			<h2 class="text-2xl font-bold mb-3 mt-6">3. ¿Quién hizo qué?</h2>
			<p class="mb-4">No se trata de desconfiar del equipo, se trata de poder revisar. Cada venta, cancelación, descuento y ajuste de inventario queda con nombre y hora. Cuando el corte no cuadra, no hay discusión: hay historial. Y con permisos por rol, cada quien puede hacer solo lo que le toca.</p>

			<h2 class="text-2xl font-bold mb-3 mt-6">4. ¿Puedo salir del mostrador?</h2>
			<p class="mb-4">Esta es la que más pesa. Un negocio que solo funciona cuando tú estás parado en la caja no es un negocio, es un empleo. Cuando la información vive en el sistema y no en tu cabeza, puedes revisar las ventas del día desde tu teléfono, abrir una segunda sucursal sin clonarte y tomarte una semana sin que se caiga todo.</p>

			<h2 class="text-2xl font-bold mb-3 mt-6">Y de paso, el SAT deja de ser un problema</h2>
			<p class="mb-4">Cuando las ventas ya están capturadas, facturar es un botón, no una tarde. La contabilidad deja de ser una reconstrucción de memoria a fin de mes.</p>

			<h2 class="text-2xl font-bold mb-3 mt-6">Por dónde empezar</h2>
			<p class="mb-4">No necesitas digitalizar todo el mismo día. El orden que mejor funciona es: primero registra todas las ventas en el sistema, luego carga bien los costos, después los proveedores, y al final aprovecha los reportes. En dos o tres semanas ya estás decidiendo con datos en lugar de con intuición.</p>
			<p class="mb-4">Da igual si vendes medicamento, tornillos o abarrotes. El control se ve igual en los tres mostradores.</p>
		`,
		postedBy: {
			avatar: agoramyAutor.src,
			name: 'Agoramy',
		},
		postedOn: {
			date: '18 de agosto de 2026',
			time: '6 min de lectura',
		},
	},
	{
		image: lanzamientoBlog.src,
		tag: { value: 'Anuncio' },
		title: 'Agoramy ya está operando: seis meses gratis para los negocios de la beta',
		slug: 'lanzamiento-beta-agoramy',
		description:
			'El sistema ya trabaja en negocios reales y seguimos en fase de pruebas. Los 1,000 negocios de esta ronda entraron con seis meses sin costo a cambio de su retroalimentación. La lista para la siguiente sigue abierta...',
		content: `
			<div class="bg-gray-100 rounded-lg p-5 mb-6">
				<p class="font-semibold text-gray-700 mb-1">Actualización</p>
				<p class="text-gray-600">Los 1,000 lugares de esta ronda ya se agotaron. Seguimos recibiendo registros: quien se apunte a la lista entra con descuento u otra oferta de lanzamiento cuando abramos lugar.</p>
			</div>
			<p class="mb-4">Agoramy POS ya está en operación. No es un anuncio de algo que viene: hay farmacias, ferreterías y tiendas cobrando, facturando y llevando su inventario con el sistema todos los días.</p>
			<p class="mb-4">Al mismo tiempo, seguimos en fase de pruebas. Publicamos mejoras cada semana y hay módulos que todavía estamos afinando con los negocios que ya lo usan. Preferimos decirlo así, con todas sus letras, que vender un producto terminado que no lo está.</p>

			<h2 class="text-2xl font-bold mb-3 mt-6">Seis meses sin costo durante la beta</h2>
			<p class="mb-4">Los 1,000 negocios de esta ronda entraron con seis meses sin costo. No fue un regalo: fue un intercambio. Queremos tu retroalimentación mientras el sistema se termina de afinar, y estamos dispuestos a pagarla con tiempo de uso.</p>
			<p class="mb-4">Fueron 1,000 lugares, asignados por orden de registro, sobre un plan de pruebas con todo lo del Plan Emprendedor incluido. Los consumibles (timbres de facturación, correos y rutas de reparto) se pagan aparte. Las condiciones completas están en la página de producto.</p>

			<h2 class="text-2xl font-bold mb-3 mt-6">Qué incluye</h2>
			<ul class="list-disc pl-6 mb-4">
				<li><strong>Acceso al sistema completo:</strong> punto de venta, inventario, facturación CFDI 4.0 y reportes</li>
				<li><strong>El módulo de tu giro:</strong> farmacia, ferretería o tienda, según lo que vendas</li>
				<li><strong>Soporte prioritario:</strong> si algo falla durante la beta, lo atendemos primero</li>
				<li><strong>Voz en el desarrollo:</strong> lo que reportes entra en la lista de lo que arreglamos</li>
				<li><strong>Sin candados:</strong> puedes salirte cuando quieras y llevarte tus datos exportados</li>
			</ul>

			<h2 class="text-2xl font-bold mb-3 mt-6">Qué pedimos a cambio</h2>
			<ul class="list-disc pl-6 mb-4">
				<li>Un negocio dado de alta y operando de verdad, no una cuenta de prueba</li>
				<li>Responder una encuesta corta al mes sobre lo que te está fallando</li>
				<li>Reportar los errores que encuentres desde el mismo sistema</li>
			</ul>

			<h2 class="text-2xl font-bold mb-3 mt-6">Qué pasa al terminar los seis meses</h2>
			<p class="mb-4">Pasas al plan que elijas, con los precios publicados en la página de precios. No hay cobro automático sorpresa: te avisamos antes de que se acabe el periodo y tú decides.</p>

			<h2 class="text-2xl font-bold mb-3 mt-6">Cómo entrar ahora que la ronda se llenó</h2>
			<p class="mb-4">El alta directa está cerrada. Déjanos tu correo en la página de producto para apuntarte a la lista: te contactamos uno por uno y entras con descuento u otra oferta de lanzamiento cuando abramos lugar.</p>
			<p class="mb-4">Si prefieres que te expliquemos primero, agendamos una demo de veinte minutos con el módulo de tu giro.</p>
		`,
		postedBy: {
			avatar: agoramyAutor.src,
			name: 'Agoramy',
		},
		postedOn: {
			date: '15 de agosto de 2026',
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
			date: '12 de febrero de 2026',
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
			date: '26 de febrero de 2026',
			time: '5 min de lectura',
		},
	},
]

const post2: Post[] = [
	{
		image: consideracionesBlog.src,
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
		image: inventarioBlog.src,
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
