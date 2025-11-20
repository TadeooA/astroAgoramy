import { Footer } from '@/components'
import About from './About.tsx'
import Client from './Client.tsx'
import Counter from './Counter.tsx'
import Feature from './Feature.tsx'
import Hero from './Hero.tsx'
import Team from './Team.tsx'

//data
import { teamMembers } from './data.ts'

const Company = () => {
	return (
		<div className="text-gray-700">
			<Hero />

			<About />

			<Feature />

			<Counter />

			<Team teamMembers={teamMembers} />

			<Client />

			<Footer />
		</div>
	)
}

export default Company
