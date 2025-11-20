import { Footer } from '@/components'
import FAQs from './FAQs.tsx'
import HelpLinks from './HelpLinks.tsx'
import Hero from './Hero.tsx'
import SupportCenter from './SupportCenter.tsx'

//data
import { helpLinks } from './data.tsx'

const Help = () => {
	return (
		<>
			<div>
				<Hero />
				<section className="py-20 relative">
					<div className="container">
						<div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
							<div className="lg:col-span-2 cols-span-1">
								<HelpLinks helpLinks={helpLinks} />

								<FAQs />
							</div>

							<SupportCenter />
						</div>
					</div>
				</section>

				<Footer />
			</div>
		</>
	)
}

export default Help
