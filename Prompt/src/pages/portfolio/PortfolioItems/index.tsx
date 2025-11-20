import { Footer } from '@/components'
import Content from './Content.tsx'
import Hero from './Hero.tsx'
import Navigation from './Navigation.tsx'
import Testimonial from './Testimonial.tsx'

//data
import { workImages } from './data.tsx'

const PortfolioItems = () => {
	return (
		<>
			<Hero />

			<Content workImages={workImages} />

			<Testimonial />

			<Navigation />

			<Footer />
		</>
	)
}

export default PortfolioItems
