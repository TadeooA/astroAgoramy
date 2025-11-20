import { Footer2 } from '@/components'
import ClientsReview from './ClientsReview.tsx'
import Features from './Features.tsx'
import Hero from './Hero.tsx'
import Integrations from './Integrations.tsx'
import Pricing from './Pricing.tsx'
import { integrations, planFeatures } from './data.ts'

const Startup = () => {
	return (
		<div className="text-gray-700">
			<Hero />

			<ClientsReview />

			<Features />

			<Integrations integrations={integrations} />

			<Pricing planFeatures={planFeatures} />

			<Footer2 socialIcon />
		</div>
	)
}

export default Startup
