import { Footer3 } from '@/components'
import Comments from './Comments.tsx'
import Hero from './Hero.tsx'
import PostContent from './PostContent.tsx'
import PostNavigation from './PostNavigation.tsx'

const BlogPost = () => {
	return (
		<>
			<div className="text-gray-700">
				<Hero />

				<PostContent />

				<PostNavigation />

				<Comments />

				<Footer3 />
			</div>
		</>
	)
}

export default BlogPost
