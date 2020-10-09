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
			const index = props.posts.findIndex(post => post.id === updated.id);
			if (index >= 0) {
				props.posts[index] = updated;
			}

			return props;
		};
	},

	deletePost (postId) {
		return (props) => {
			const index = props.posts.findIndex(post => post.id === postId);
			if (index >= 0) {
				props.posts.splice(index, 1);
			}

			return props;
		};
	}
});

const BaseLiveBlogWrapper = ({ posts = [], articleUrl, showShareButtons, id }) => {
	posts.sort((a, b) => {
		// Newer posts on top
		if (a.publishedDate > b.publishedDate) {
			return -1;
		}

		if (b.publishedDate > a.publishedDate) {
			return 1;
		}

		return 0;
	});

	const postElements = posts.map(post =>
		<LiveBlogPost key={`live-blog-post-${post.id}`}
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
