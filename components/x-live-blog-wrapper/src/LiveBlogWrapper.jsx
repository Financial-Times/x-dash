import { h } from '@financial-times/x-engine';
import { LiveBlogPost } from '@financial-times/x-live-blog-post';
import { withActions } from '@financial-times/x-interaction';

const liveBlogWrapperActions = withActions({
	addPost (post) {
		return ({ posts }) => {
			const updatedPosts = [ post, ...posts ];

			return { posts: updatedPosts };
		};
	},

	updatePost (updated) {
		return ({ posts }) => {
			const updatedPosts = posts.map(
				(post) => post.postId !== updated.postId ? post : updated
			);

			return { posts: updatedPosts };
		};
	},

	deletePost (postId) {
		return ({ posts }) => {
			const updatedPosts = posts.filter((post) => post.postId !== postId);
			return { posts: updatedPosts };
		}
	}
});

const LiveBlogWrapper = liveBlogWrapperActions(({ posts = [], actions }) => {
	const addPostTest = () => {
		const newPost = {
			postId: `${Math.random()}`,
			title: `Title ${Math.random()}`,
			content: `<p>Post ${Math.random()}</p>`,
			isBreakingNews: false,
			publishedTimestamp: '2020-05-13T20:52:28.000Z',
			articleUrl: 'https://www.ft.com/content/2b665ec7-a88f-3998-8f39-5371f9c791ed',
			showShareButtons: true,
		}

		actions.addPost(newPost);
	};

	const updatePostTest = () => {
		const updatedPost = {
			postId: 12346,
			title: 'Title 2 - Updated',
			content: '<p>Post 2 - Updated</p>',
			isBreakingNews: true,
			publishedTimestamp: '2020-05-13T19:52:28.000Z',
			articleUrl: 'https://www.ft.com/content/2b665ec7-a88f-3998-8f39-5371f9c791ed',
			showShareButtons: true,
		};

		actions.updatePost(updatedPost);
	};

	const deletePostTest = () => {
		actions.deletePost(12345);
	};

	const postElements = posts.map((post) => <LiveBlogPost key={`live-blog-post-${post.postId}`} {...post} />);
	return (
		<div className='x-live-blog-wrapper'>
			<button onClick={addPostTest}>Test Add Post</button>
			<button onClick={updatePostTest}>Test Update Post</button>
			<button onClick={deletePostTest}>Test Delete Post</button>
			{postElements}
		</div>
	);
});

export { LiveBlogWrapper };
