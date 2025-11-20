import { useState } from 'react';

const AddComment = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: ''
	});

	const [errors, setErrors] = useState({
		name: '',
		email: '',
		subject: '',
		message: ''
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
			message: ''
		};

		if (!formData.name) newErrors.name = 'Please enter Name';
		if (!formData.email) {
			newErrors.email = 'Please enter Email';
		} else if (!validateEmail(formData.email)) {
			newErrors.email = 'Please enter valid Email';
		}
		if (!formData.subject) newErrors.subject = 'Please enter Subject';
		if (!formData.message) newErrors.message = 'Please enter Message';

		if (Object.values(newErrors).some(error => error !== '')) {
			setErrors(newErrors);
			return;
		}

		console.log('Comment submitted:', formData);
		// Aquí iría la lógica para enviar el comentario

		// Limpiar formulario
		setFormData({ name: '', email: '', subject: '', message: '' });
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
