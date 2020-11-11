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
			wrapper.dispatchEvent(new CustomEvent('x-interaction.trigger-action', { detail: { action, args } }))
		}
	}

	const dispatchLiveUpdateEvent = (eventType, data) => {
		/*
		We dispatch live update events to notify the consuming app about added / updated posts.

		Consuming app uses these events to execute tasks like initialising Origami components
		on the updated elements.

		We want the rendering of the updates in the DOM to finish before dispatching this event,
		because the consumer needs to reference the updated DOM elements.

		If we dispatch the event in the same event loop with DOM element updates, consumer app
		will handle the event before the updates are complete.

		window.setTimeout(fn, 0) will defer the execution of the inner function until the
		current event loop completes, which is enough time for the DOM updates to finish.

		More information can be found in MDN setTimeout documentation. Please refer to
		"Late timeouts" heading in this page:
		https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Late_timeouts

		> ... the timeout can also fire later when the page (or the OS/browser itself) is busy
		> with other tasks. One important case to note is that the function or code snippet
		> cannot be executed until the thread that called setTimeout() has terminated.
		> ...
		> This is because even though setTimeout was called with a delay of zero, it's placed on
		> a queue and scheduled to run at the next opportunity; not immediately.
		 */
		window.setTimeout(() => wrapper.dispatchEvent(new CustomEvent(eventType, { detail: data })), 0)
	}

	const eventSource = new EventSource(`https://next-live-event.ft.com/v2/liveblog/${liveBlogPackageUuid}`, {
		withCredentials: true
	})

	eventSource.addEventListener('insert-post', (event) => {
		const post = parsePost(event)

		if (!post) {
			return
		}

		invokeAction('insertPost', [post])
		dispatchLiveUpdateEvent('LiveBlogWrapper.INSERT_POST', { post })
	})

	eventSource.addEventListener('update-post', (event) => {
		const post = parsePost(event)

		if (!post) {
			return
		}

		invokeAction('updatePost', [post])
		dispatchLiveUpdateEvent('LiveBlogWrapper.UPDATE_POST', { post })
	})

	eventSource.addEventListener('delete-post', (event) => {
		const post = parsePost(event)

		if (!post) {
			return
		}

		const postId = post.postId
		invokeAction('deletePost', [postId])
		dispatchLiveUpdateEvent('LiveBlogWrapper.DELETE_POST', { postId })
	})
}

export { listenToLiveBlogEvents }
