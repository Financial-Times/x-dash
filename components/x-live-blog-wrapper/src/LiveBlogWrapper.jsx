import { h } from '@financial-times/x-engine';
import { LiveBlogPost } from '@financial-times/x-live-blog-post';
import { withActions } from '@financial-times/x-interaction';
import { listenToLiveBlogEvents } from './LiveEventListener';

const withLiveBlogWrapperActions = withActions({
	insertPost (post) {
		return (props) => {
			props.posts.unshift(post);

			return props;
		};
	},

	updatePost (updated) {
		return (props) => {
			const index = props.posts.findIndex(post => post.postId === updated.postId);
			if (index >= 0) {
				props.posts[index] = updated;
			}

			return props;
		};
	},

	deletePost (postId) {
		return (props) => {
			const index = props.posts.findIndex(post => post.postId === postId);
			if (index >= 0) {
				props.posts.splice(index, 1);
			}

			return props;
		};
	}
});

const BaseLiveBlogWrapper = ({ posts = [], articleUrl, showShareButtons, id }) => {
	const postElements = posts.map(post =>
		<LiveBlogPost key={`live-blog-post-${post.postId}`}
			{...post}
			articleUrl={articleUrl}
			showShareButtons={showShareButtons}/>
	);

	return (
		<div className='x-live-blog-wrapper' data-live-blog-wrapper-id={id}>
			{postElements}
		</div>
	);
}

const LiveBlogWrapper = withLiveBlogWrapperActions(BaseLiveBlogWrapper);

export { LiveBlogWrapper, listenToLiveBlogEvents };
