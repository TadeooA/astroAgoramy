import { useState } from 'react';

const AddComment = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: ''
	});
	const [acceptPrivacy, setAcceptPrivacy] = useState(false);

	const [errors, setErrors] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
		privacy: ''
	});

	const validateEmail = (email: string) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
		setErrors(prev => ({ ...prev, [name]: '' }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors = {
			name: '',
			email: '',
			subject: '',
			message: '',
			privacy: ''
		};

		if (!formData.name) newErrors.name = 'Please enter Name';
		if (!formData.email) {
			newErrors.email = 'Please enter Email';
		} else if (!validateEmail(formData.email)) {
			newErrors.email = 'Please enter valid Email';
		}
		if (!formData.subject) newErrors.subject = 'Please enter Subject';
		if (!formData.message) newErrors.message = 'Please enter Message';
		if (!acceptPrivacy) newErrors.privacy = 'Debes aceptar las políticas de privacidad';

		if (Object.values(newErrors).some(error => error !== '')) {
			setErrors(newErrors);
			return;
		}

		console.log('Comment submitted:', formData);
		// Aquí iría la lógica para enviar el comentario

		// Limpiar formulario
		setFormData({ name: '', email: '', subject: '', message: '' });
		setAcceptPrivacy(false);
	};

	return (
		<div className="mt-14">
			<div className="border bg-white rounded p-6">
				<h1>Post a comment</h1>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col gap-5 mt-5">
						<div className="grid md:grid-cols-2 grid-cols-1 gap-5">
							<div>
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									className="rounded border-gray-300 focus:border-gray-400 focus:ring-0 w-full text-sm"
									placeholder="Name"
								/>
								{errors.name && (
									<p className="text-red-500 text-xs mt-1">{errors.name}</p>
								)}
							</div>
							<div>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									className="rounded border-gray-300 focus:border-gray-400 focus:ring-0 w-full text-sm"
									placeholder="Email"
								/>
								{errors.email && (
									<p className="text-red-500 text-xs mt-1">{errors.email}</p>
								)}
							</div>
						</div>
						<div>
							<input
								type="text"
								name="subject"
								value={formData.subject}
								onChange={handleChange}
								className="rounded border-gray-300 focus:border-gray-400 focus:ring-0 w-full text-sm"
								placeholder="Subject"
							/>
							{errors.subject && (
								<p className="text-red-500 text-xs mt-1">{errors.subject}</p>
							)}
						</div>
						<div>
							<textarea
								name="message"
								value={formData.message}
								onChange={handleChange}
								className="rounded border-gray-300 focus:border-gray-400 focus:ring-0 w-full text-sm"
								placeholder="Message"
								rows={5}
							/>
							{errors.message && (
								<p className="text-red-500 text-xs mt-1">{errors.message}</p>
							)}
						</div>

						<div>
							<div className="flex items-start gap-2">
								<input
									id="comment-privacy-checkbox"
									type="checkbox"
									checked={acceptPrivacy}
									onChange={(e) => {
										setAcceptPrivacy(e.target.checked);
										setErrors(prev => ({ ...prev, privacy: '' }));
									}}
									className="mt-1 rounded border-gray-300 text-black focus:ring-black"
								/>
								<label htmlFor="comment-privacy-checkbox" className="text-sm text-gray-600">
									Acepto el{' '}
									<a href="/privacy/" className="text-black hover:underline">
										manejo de mis datos y las políticas de privacidad
									</a>
								</label>
							</div>
							{errors.privacy && (
								<p className="text-red-500 text-xs mt-1">{errors.privacy}</p>
							)}
						</div>

						<button className="flex" type="submit">
							<span className="bg-black/70 text-white rounded-md text-sm font-semibold flex-none shadow shadow-black hover:shadow-lg hover:shadow-black/30 focus:shadow-none focus:outline focus:outline-black/50 px-5 py-3">
								Submit
							</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddComment;
