import { h, Fragment } from '@financial-times/x-engine';
import { LiveBlogPost } from '@financial-times/x-live-blog-post';
import { withActions } from '@financial-times/x-interaction';

const parsePost = (event) => {
	const post = JSON.parse(event.data);

	if (!post || !post.mid || !post.textrendered) {
		return;
	}

	const textElement = document.createElement('div');
	textElement.innerHTML = post.textrendered;

	const titleElement = textElement.querySelector('p strong');
	const breakingNewsElement = textElement.querySelector('img[src*="breaking_news.gif"]');
	const isBreakingNews = Boolean(breakingNewsElement);

	if (isBreakingNews) {
		textElement.removeChild(breakingNewsElement.parentNode);
	}

	textElement.removeChild(titleElement.parentNode);

	const content = textElement.innerHTML.trim();
	const title = titleElement.textContent;
	const publishedTimestamp = (new Date(Number(post.emb) * 1000)).toISOString();

	return {
		postId: post.mid,
		author: post.authordisplayname,
		publishedTimestamp,
		isBreakingNews,
		isKeyEvent: Boolean(post.keytext),
		title,
		content
	};
};

const dispatchLiveUpdateEvent = (eventType, data) => {
	// consumer app will need to consume this event after the component is rendered. therefore,
	// we defer dispatching of this event.
	window.setTimeout(() => document.dispatchEvent(new CustomEvent(eventType, { detail: data })), 0);
};

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
		};
	},

	startListeningToLiveEvents () {
	}
});

const LiveBlogWrapper = liveBlogWrapperActions(({ posts = [], articleUrl, showShareButtons, blogPath, isLoading, actions }) => {
	if (isLoading) {
		// TODO: currently we add event listeners on every render of this component. we need to do it only once.
		// possibly make this a separate component for client apps to render.

		// const eventSource = new EventSource(`https://next-live-event.ft.com?eventid=${blogPath}&formatted=false`, { withCredentials: true });
		const eventSource = new EventSource(`http://localhost:3000/events`, { withCredentials: false });

		eventSource.addEventListener('msg', (event) => {
			const post = parsePost(event);

			if (!post) {
				return;
			}

			actions.insertPost(post);
			dispatchLiveUpdateEvent('LiveBlogWrapper.INSERT_POST', { post });
		});

		eventSource.addEventListener('editmsg', (event) => {
			const post = parsePost(event);

			if (!post) {
				return;
			}

			actions.updatePost(post);
			dispatchLiveUpdateEvent('LiveBlogWrapper.UPDATE_POST', { post });
		});

		eventSource.addEventListener('delete', (event) => {
			const post = parsePost(event);

			if (!post) {
				return;
			}

			actions.deletePost(post.postId);
			dispatchLiveUpdateEvent('LiveBlogWrapper.DELETE_POST', { postId: post.postId });
		});

		// TODO: do we handle live blog status updates in this component?
		eventSource.addEventListener('close', (event) => {
			// TODO
		});
	}

	const postElements = posts.map((post) => <LiveBlogPost key={`live-blog-post-${post.postId}`} {...post} articleUrl={articleUrl} showShareButtons={showShareButtons}/>);
	return (
		<div className='x-live-blog-wrapper'>
			{postElements}
		</div>
	);
});

export { LiveBlogWrapper };
