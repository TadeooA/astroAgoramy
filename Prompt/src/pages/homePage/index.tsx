import AccountPages from './AccountPages.tsx'
import CTA from './CTA.tsx'
import Demos from './Demos.tsx'
import Features from './Features.tsx'
import Hero from './Hero.tsx'
import InnerPages from './InnerPages.tsx'

//data
import { accountPages, features, landings, secondaryPages } from './data.tsx'

const Home = () => {
	return (
		<>
			<Hero />
			{/* demos */}
			<Demos landings={landings} />

			<InnerPages innerPages={secondaryPages} />

			<AccountPages accountPages={accountPages} />

			<Features features={features} />

			<CTA />
		</>
	)
}

export default Home
