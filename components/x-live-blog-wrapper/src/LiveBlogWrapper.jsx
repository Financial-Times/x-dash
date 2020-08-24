import { h } from '@financial-times/x-engine';
import { LiveBlogPost } from '@financial-times/x-live-blog-post';
import { withActions } from '@financial-times/x-interaction';
import { listenToLiveBlogEvents } from './LiveEventListener';

const withLiveBlogWrapperActions = withActions({
	insertPost (post) {
		return ({ posts }) => {
			posts.unshift(post)

			return { posts };
		};
	},

	updatePost (updated) {
		return ({ posts }) => {
			const index = posts.findIndex(post => post.postId === updated.postId);
			if (index >= 0) {
				posts[index] = updated;
			}

			return { posts };
		};
	},

	deletePost (postId) {
		return ({ posts }) => {
			const index = posts.findIndex(post => post.postId === postId);
			if (index >= 0) {
				posts.splice(index, 1);
			}

			return { posts };
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
