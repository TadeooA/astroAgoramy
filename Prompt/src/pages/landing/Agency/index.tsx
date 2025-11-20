import { projects } from '../PortFolio/data.tsx'
import Blog from './Blog.tsx'
import Clients from './Clients.tsx'
import Footer from './Footer.tsx'
import Hero from './Hero.tsx'
import Portfolios from './Portfolios.tsx'
import Services from './Services.tsx'
import Vacancies from './Vacancies.tsx'

// data
import { blogPosts, jobDetails, services } from './data.tsx'

const Agency = () => {
	return (
		<>
			<Hero />

			<Services services={services} />

			<Portfolios portfolios={projects} />

			<Clients />

			<Blog blogs={blogPosts} />

			<Vacancies jobDetails={jobDetails} />

			<Footer />
		</>
	)
}

export default Agency
