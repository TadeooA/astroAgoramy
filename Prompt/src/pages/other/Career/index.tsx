import { Footer } from '@/components'
import Benefits from './Benefits.tsx'
import CTA from './CTA.tsx'
import Culture from './Culture.tsx'
import Hero from './Hero.tsx'
import Vacancies from './Vacancies.tsx'

//data
import { benefits, vacancies } from './data.tsx'

const career = () => {
	return (
		<>
			<div className="text-gray-800">
				<Hero />

				<Benefits benefits={benefits} />

				<Culture />

				<Vacancies vacancies={vacancies} />

				<CTA />

				<Footer />
			</div>
		</>
	)
}

export default career
