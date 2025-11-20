import { Footer } from '@/components'
import Blog from './Blog.tsx'
import Coins from './Coins.tsx'
import Features from './Features.tsx'
import Hero from './Hero.tsx'
import Integration from './Integration.tsx'
import Stats from './Stats.tsx'
import { coins, features } from './data.tsx'

const Crypto = () => {
	return (
		<>
			<Hero />

			<Coins coins={coins} />

			<Features features={features} />

			<Integration />

			<Stats />

			<Blog />

			<Footer />
		</>
	)
}

export default Crypto
