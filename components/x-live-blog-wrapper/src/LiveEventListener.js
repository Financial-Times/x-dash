const parsePost = (event) => {
	const post = JSON.parse(event.data);

	if (!post || !post.postId) {
		return;
	}

	return post;
};


const listenToLiveBlogEvents = ({ liveBlogWrapperElementId, liveBlogPackageUuid }) => {
	const wrapper = document.querySelector(`[data-x-dash-id="${liveBlogWrapperElementId}"]`);

	const invokeAction = (action, args) => {
		wrapper.dispatchEvent(
			new CustomEvent(
				'x-interaction.trigger-action',
				{ detail: { action, args } }
			)
		);
	};

	const dispatchLiveUpdateEvent = (eventType, data) => {
		// consumer app will need to consume this event after the component is rendered.
		// therefore, we defer dispatching of this event.
		window.setTimeout(() => wrapper.dispatchEvent(new CustomEvent(eventType, { detail: data })), 0);
	};

	const eventSource = new EventSource(`https://next-live-event.ft.com/v2/liveblog/${liveBlogPackageUuid}`, { withCredentials: true });

	eventSource.addEventListener('insert-post', (event) => {
		const post = parsePost(event);

		if (!post) {
			return;
		}

		invokeAction('insertPost', [ post ]);
		dispatchLiveUpdateEvent('LiveBlogWrapper.INSERT_POST', { post });
	});

	eventSource.addEventListener('update-post', (event) => {
		const post = parsePost(event);

		if (!post) {
			return;
		}

		invokeAction('updatePost', [ post ]);
		dispatchLiveUpdateEvent('LiveBlogWrapper.UPDATE_POST', { post });
	});

	eventSource.addEventListener('delete-post', (event) => {
		const post = parsePost(event);

		if (!post) {
			return;
		}

		invokeAction('deletePost', [ post.postId ])
		dispatchLiveUpdateEvent('LiveBlogWrapper.DELETE_POST', { postId: post.postId });
	});

};

export { listenToLiveBlogEvents };
