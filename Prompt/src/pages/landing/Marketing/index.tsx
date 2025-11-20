import { FeedBack, Footer2 } from '@/components'
import Features1 from './Features1.tsx'
import Features2 from './Features2.tsx'
import Features3 from './Features3.tsx'
import Features4 from './Features4.tsx'
import Hero from './Hero.tsx'

// data
import { features } from './data.tsx'

const Marketing = () => {
	return (
		<div className="text-gray-700">
			<Hero />

			<section className="py-16 lg:py-32">
				<Features1 features={features} />
				<Features2 />
				<Features3 />
			</section>

			<Features4 />

			<FeedBack />

			<Footer2 />
		</div>
	)
}

export default Marketing
