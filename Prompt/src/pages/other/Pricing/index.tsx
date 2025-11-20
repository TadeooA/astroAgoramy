import Benefits from './Benefits.tsx'
import Hero from './Hero.tsx'
import PricingPlans from './PricingPlans.tsx'
import { benefits } from './data.tsx'
import FAQs from './FAQs.tsx'
import CTA from './CTA.tsx'
import { Footer } from '@/components'

const Pricing = () => {
	return (
		<>
			<div>
				<Hero />

				<PricingPlans />

				<Benefits benefits={benefits} />

				<FAQs />

				<CTA />

				<Footer />
			</div>
		</>
	)
}

export default Pricing
