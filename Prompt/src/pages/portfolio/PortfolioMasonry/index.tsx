import { Footer } from '@/components'
import Gallery from './Gallery.tsx'
import Hero from './Hero.tsx'
import { galleryItems } from './data.ts'

const PortfolioMasonry = () => {
	return (
		<>
			<div>
				<Hero />

				<Gallery galleryItems={galleryItems} />

				<Footer />
			</div>
		</>
	)
}

export default PortfolioMasonry
