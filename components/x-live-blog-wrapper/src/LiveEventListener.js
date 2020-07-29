// TODO: parsing posts will not be needed when we use v2 route on next-live-events-api
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

const listenToLiveBlogEvents = ({ liveBlogWrapperId, blogPath }) => {
	const invokeAction = (action, args) => {
		const wrapper = document.querySelector(`[data-x-dash-id="${liveBlogWrapperId}"]`);
		wrapper.dispatchEvent(
			new CustomEvent(
				'x-interaction.trigger-action',
				{ detail: { action, args } }
			)
		);
	};

	// TODO: use next-live-events-api v2 routes
	// const eventSource = new EventSource(`https://next-live-event.ft.com?eventid=${blogPath}&formatted=false`, { withCredentials: true });
	const eventSource = new EventSource(`http://localhost:3000/events`, { withCredentials: false });

	eventSource.addEventListener('msg', (event) => {
		const post = parsePost(event);

		if (!post) {
			return;
		}

		invokeAction('insertPost', [ post ]);
		dispatchLiveUpdateEvent('LiveBlogWrapper.INSERT_POST', { post });
	});

	eventSource.addEventListener('editmsg', (event) => {
		const post = parsePost(event);

		if (!post) {
			return;
		}

		invokeAction('updatePost', [ post ]);
		dispatchLiveUpdateEvent('LiveBlogWrapper.UPDATE_POST', { post });
	});

	eventSource.addEventListener('delete', (event) => {
		const post = parsePost(event);

		if (!post) {
			return;
		}

		invokeAction('deletePost', [ post.postId ])
		dispatchLiveUpdateEvent('LiveBlogWrapper.DELETE_POST', { postId: post.postId });
	});

	// TODO: do we handle live blog status updates in this component?
	eventSource.addEventListener('close', (event) => {
		// TODO
	});

};

export { listenToLiveBlogEvents };
