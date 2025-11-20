import { PricingCards, Testimonial } from '@/components'
import ClientsReview from './ClientsReview.tsx'
import Features from './Features.tsx'
import Hero from './Hero.tsx'
import { features } from './data.tsx'
import Footer from './Footer.tsx'

const Software = () => {
	return (
		<div className="text-gray-700">
			<Hero />

			<ClientsReview />

			<Features features={features} />

			<section className="py-16 sm:py-24">
				<PricingCards />
			</section>

			<Testimonial />

			<Footer />
		</div>
	)
}

export default Software
