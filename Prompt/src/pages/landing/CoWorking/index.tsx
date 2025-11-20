import About from './About.tsx'
import Features from './Features.tsx'
import Hero from './Hero.tsx'
import SpaceOptions from './SpaceOptions.tsx'
import Testimonials from './Testimonials.tsx'
import Footer from './Footer.tsx'

//data
import { features, spaceOptions, testimonials } from './data.tsx'

const CoWorking = () => {
	return (
		<>
			<Hero />

			<About />

			<Features features={features} />

			<SpaceOptions spaceOptions={spaceOptions} />

			<Testimonials testimonials={testimonials} />

			<Footer />
		</>
	)
}

export default CoWorking
