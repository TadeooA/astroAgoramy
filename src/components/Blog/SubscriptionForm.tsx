import { useState } from 'react';

const SubscriptionForm = () => {
	const [email, setEmail] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email) {
			alert('Por favor, introduce tu correo electrónico');
			return;
		}

		setIsSubmitting(true);
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
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Error al suscribirse');
			}

			const result = await response.json();
			console.log('Suscripción exitosa:', result);
			alert('¡Gracias por suscribirte! Recibirás nuestro boletín semanal.');
			setEmail('');
		} catch (error) {
			console.error('Error al suscribirse:', error);
			alert(error instanceof Error ? error.message : 'Error al procesar tu suscripción');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div>
			<div className="border rounded-md p-5 w-full">
				<h1 className="mb-3">
					Recibe las últimas novedades de Agoramy sobre desarrollo de productos
				</h1>
				<p className="text-sm/relaxed tracking-wider text-gray-500">
					Enviamos un boletín semanal con las últimas novedades en desarrollo de productos
				</p>
				<form onSubmit={handleSubmit} className="flex flex-col md:flex-row lg:flex-col gap-2 mt-7">
					<input
						id="blog-subscription-email"
						type="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full md:w-1/2 lg:w-full text-sm border-gray-300 focus:border-gray-200 focus:ring-0 rounded-md bg-white py-3"
						placeholder="Introduce tu correo electrónico"
						required
					/>
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full md:w-1/2 lg:w-full bg-primary text-white rounded-md text-sm font-semibold flex-none shadow shadow-primary/50 hover:shadow-lg hover:shadow-primary/30 focus:shadow-none focus:outline focus:outline-primary/20 px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting ? 'Procesando...' : 'Suscribirse'}
					</button>
				</form>
				<p className="text-sm text-gray-500 mt-2">*Nunca spam.</p>
			</div>
		</div>
	);
};

export default SubscriptionForm;
