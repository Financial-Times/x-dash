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
const dispatchEvent = (target, eventType, data) => {
	if (typeof window === 'undefined') {
		return
	}
	window.setTimeout(() => target.dispatchEvent(new CustomEvent(eventType, { detail: data })), 0)
}

export { dispatchEvent }
