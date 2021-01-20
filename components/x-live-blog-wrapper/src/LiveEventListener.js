const parsePost = (event) => {
	const post = JSON.parse(event.data)

	if (!post || !post.postId) {
		return
	}

	return post
}

const listenToLiveBlogEvents = ({ liveBlogWrapperElementId, liveBlogPackageUuid, actions }) => {
	const wrapper = document.querySelector(`[data-live-blog-wrapper-id="${liveBlogWrapperElementId}"]`)

	const invokeAction = (action, args) => {
		if (actions) {
			// When the component is rendered at the client side, we get a reference to the
			// actions via setting the actionsRef property.
			//
			// In that case 'actions' argument should be passed when calling the
			// listenToLiveBlogEvents function. We use those actions directly when that
			// argument is defined.
			//
			// For more information:
			// https://github.com/Financial-Times/x-dash/tree/master/components/x-interaction#triggering-actions-externally
			actions[action](...args)
		} else {
			// When the component is rendered at the server side, we don't have a reference to
			// the actions object. HydrationWrapper in x-interaction listens to this specific
			// event and triggers the action supplied in the event detail.
			//
			// If no 'actions' argument is passed when calling listenToLiveBlogEvents
			// function, we assume the component is rendered at the server side and trigger
			// the actions using this method.
			wrapper.dispatchEvent(
				new CustomEvent('x-interaction.trigger-action', { detail: { action, args }, bubbles: true })
			)
		}
	}

	// Allow `next-live-event-api` endpoint URL to be set in development.
	const baseUrl =
		typeof LIVE_EVENT_API_URL !== 'undefined' ? LIVE_EVENT_API_URL : 'https://next-live-event.ft.com' // eslint-disable-line no-undef

	const eventSource = new EventSource(`${baseUrl}/v2/liveblog/${liveBlogPackageUuid}`, {
		withCredentials: true
	})

	eventSource.addEventListener('insert-post', (event) => {
		const post = parsePost(event)

		if (!post) {
			return
		}

		invokeAction('insertPost', [post])
	})

	eventSource.addEventListener('update-post', (event) => {
		const post = parsePost(event)

		if (!post) {
			return
		}

		invokeAction('updatePost', [post])
	})

	eventSource.addEventListener('delete-post', (event) => {
		const post = parsePost(event)

		if (!post) {
			return
		}

		invokeAction('deletePost', [post.id])
	})
}

export { listenToLiveBlogEvents }
