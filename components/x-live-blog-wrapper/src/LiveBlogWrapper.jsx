import { h, Fragment } from '@financial-times/x-engine';
import { LiveBlogPost } from '@financial-times/x-live-blog-post';
import { withActions } from '@financial-times/x-interaction';

const liveBlogWrapperActions = withActions({
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
		}
	},

	startListeningToLiveEvents(blogPath) {
		// TODO: this is a pseudo implmentation at the moment. we need to parse and process posts from the events first.

		const source = new EventSource(`https://next-live-event.ft.com?eventid=${blogPath}&formatted=false`, { withCredentials: true });

		source.addEventListener('msg', this.insertPost);

		source.addEventListener('editmsg', this.updatePost);

		source.addEventListener('delete', this.deletePost);

		// TODO: do we handle live blog status updates in this component?
		// source.addEventListener('close', updateLiveBlogStatus);
	}

});

const LiveBlogWrapper = liveBlogWrapperActions(({ posts = [], blogPath, articleUrl, showShareButtons, actions }) => {
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

		actions.insertPost(newPost);

		// window.setTimeout needed here because the internal state of this component will update
		// after this function returns. this means document updates will occur only after this line
		// executes.
		// consumer app will need to consume this event after the component is rendered. therefore,
		// we defer dispatching of this event.
		window.setTimeout(() => document.dispatchEvent(new CustomEvent('LiveBlogWrapper.INSERT_POST', { detail: { post: newPost } })), 0);
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

	const postElements = posts.map((post) => <LiveBlogPost key={`live-blog-post-${post.postId}`} {...post} articleUrl={articleUrl} showShareButtons={showShareButtons} />);
	return (
		<Fragment>
			<!-- TODO: remove these test buttons -->
			<div className='x-live-blog-wrapper-test-buttons'>
				<button onClick={addPostTest}>Test Add Post</button>
				<button onClick={updatePostTest}>Test Update Post</button>
				<button onClick={deletePostTest}>Test Delete Post</button>
			</div>
			<div className='x-live-blog-wrapper'>
				{postElements}
			</div>
		</Fragment>
	);
});

export { LiveBlogWrapper };
