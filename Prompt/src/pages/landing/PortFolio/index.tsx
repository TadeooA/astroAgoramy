import CTA from './CTA.tsx'
import Footer from './Footer.tsx'
import Hero from './Hero.tsx'
import Projects from './Projects.tsx'
import Services from './Services.tsx'
import Testimonials from './Testimonials.tsx'
import { projects, services, testimonials } from './data.tsx'

const PortFolio = () => {
	return (
		<>
			<Hero />

			<Services services={services} />

			<Projects projects={projects} />

			<Testimonials testimonials={testimonials} />

			<CTA />

			<Footer />
		</>
	)
}

export default PortFolio
