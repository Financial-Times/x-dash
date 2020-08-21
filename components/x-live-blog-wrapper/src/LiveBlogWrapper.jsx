import { h } from '@financial-times/x-engine';
import { LiveBlogPost } from '@financial-times/x-live-blog-post';
import { withActions } from '@financial-times/x-interaction';
import { listenToLiveBlogEvents } from './LiveEventListener';

const withLiveBlogWrapperActions = withActions({
	insertPost (post) {
		return ({ posts }) => {
			const updatedPosts = [ post, ...posts ];

			return { posts: updatedPosts };
		};
	},

	updatePost (updated) {
		return ({ posts }) => {
			const updatedPosts = posts.map(
				post => post.postId === updated.postId ? updated : post
			);

			return { posts: updatedPosts };
		};
	},

	deletePost (postId) {
		return ({ posts }) => {
			const updatedPosts = posts.filter((post) => post.postId !== postId);
			return { posts: updatedPosts };
		};
	}
});

const BaseLiveBlogWrapper = ({ posts = [], articleUrl, showShareButtons }) => {
	const postElements = posts.map(post =>
		<LiveBlogPost key={`live-blog-post-${post.postId}`}
			{...post}
			articleUrl={articleUrl}
			showShareButtons={showShareButtons}/>
	);

	return (
		<div className='x-live-blog-wrapper'>
			{postElements}
		</div>
	);
}

const LiveBlogWrapper = withLiveBlogWrapperActions(BaseLiveBlogWrapper);

export { LiveBlogWrapper, listenToLiveBlogEvents };
