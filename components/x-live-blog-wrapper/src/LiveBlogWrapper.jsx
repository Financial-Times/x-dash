import { h } from '@financial-times/x-engine';
import { LiveBlogPost } from '@financial-times/x-live-blog-post';

const LiveBlogWrapper = ({ posts = [] }) => {
	const postElements = posts.map((post) => <LiveBlogPost key={`live-blog-post-${post.postId}`} {...post} />);
	return (
		<div className='x-live-blog-wrapper'>
			{postElements}
		</div>
	);
};

export { LiveBlogWrapper };
