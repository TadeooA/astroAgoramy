import { Footer } from '@/components'
import Gallery from './Gallery.tsx'
import Hero from './Hero.tsx'

//data
import { galleryItems } from './data.ts'

const PortfolioGrid = () => {
	return (
		<>
			<Hero />

			<Gallery galleryItems={galleryItems} />

			<Footer />
		</>
	)
}

export default PortfolioGrid
