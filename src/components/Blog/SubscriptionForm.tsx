import { useState } from 'react';

const SubscriptionForm = () => {
	const [email, setEmail] = useState('');
	const [acceptPrivacy, setAcceptPrivacy] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email) {
			setStatus({ ok: false, message: 'Por favor, introduce tu correo electrónico.' });
			return;
		}

		if (!acceptPrivacy) {
			setStatus({ ok: false, message: 'Debes aceptar las políticas de privacidad para continuar.' });
			return;
		}

		setStatus(null);
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

			setStatus({ ok: true, message: '¡Gracias por suscribirte! Recibirás nuestro boletín semanal.' });
			setEmail('');
			setAcceptPrivacy(false);
		} catch (error) {
			console.error('Error al suscribirse:', error);
			setStatus({
				ok: false,
				message: error instanceof Error ? error.message : 'Error al procesar tu suscripción.',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="h-full">
			<div className="border border-gray-300 bg-white rounded p-5 w-full h-full">
				<h2 className="mb-3 text-lg/snug font-semibold text-gray-800">
					Recibe las novedades de Agoramy
				</h2>
				<p className="text-sm/relaxed text-gray-500">
					Enviamos un boletín semanal con novedades del sistema y guías para tu negocio.
				</p>
				<form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-7">
					<input
						id="blog-subscription-email"
						type="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full text-sm border border-gray-300 focus:border-primary focus:ring-0 rounded-md bg-white py-3 px-4"
						placeholder="Introduce tu correo electrónico"
						required
					/>
					<div className="flex items-start gap-2">
						<input
							id="blog-privacy-checkbox"
							type="checkbox"
							checked={acceptPrivacy}
							onChange={(e) => setAcceptPrivacy(e.target.checked)}
							className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
							required
						/>
						<label htmlFor="blog-privacy-checkbox" className="text-xs text-gray-600">
							Acepto el{' '}
							<a href="/privacy/" className="text-primary hover:underline">
								manejo de mis datos y las políticas de privacidad
							</a>
						</label>
					</div>
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full bg-primary text-white rounded-md text-sm font-semibold flex-none shadow shadow-primary/50 hover:shadow-lg hover:shadow-primary/30 focus:shadow-none focus:outline focus:outline-primary/20 px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting ? 'Procesando...' : 'Suscribirse'}
					</button>
				</form>
				{status && (
					<p
						role="status"
						className={`text-sm mt-3 ${status.ok ? 'text-green-600' : 'text-red-600'}`}
					>
						{status.message}
					</p>
				)}
				<p className="text-xs text-gray-500 mt-3">Nunca spam.</p>
			</div>
		</div>
	);
};

export default SubscriptionForm;
