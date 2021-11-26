/**
 * Callback for when an element enters the user's view port.
 *
 * @callback onEntersViewport
 * @param {{timestamp: string, element: HTMLElement}} event - the callback triggered when a post enters the user's viewport.
 */

/**
 * Callback for the view event.
 *
 * @callback onRead
 * @param {{post: object, viewport: object: ?element: HTMLElement, summary: object[]}} event - the view event.
 */

/**
 * Callback for the error event.
 *
 * @callback onError
 * @param {Error} event - the error event.
 */

/**
 * @typedef ObserverOptions
 * @type {object}
 * @property {?HTMLElement} root - The element that is used as the viewport for checking visibility of the target. null referes to browser viewport.
 * @property {string} rootMargin - Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left).
 * @property {number[]} threshold - Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver}
 */

/**
 * @typedef PostTrackerConfig
 * @type {object}
 * @property {ObserverOptions} options - The options object passed into the IntersectionObserver() constructor let you control the circumstances under which the observer's callback is invoked.
 * @property {string} query - The query string used to query elements from the DOM.
 * @property {Boolean} returnVisibleElement - When this is set to true, listeners of the visible event will get the target element id and the element. Defaults to false
 * @property {number} minMillisecondsToReport - The minimum time in milliseconds a DOM object must be visible on the users view port to report a View event as seen. defaults to 5000
 * @property {?string} observerUpdateEventString - The DOM event to listen for(on the document level) to update the elements being observed.
 * @property {?string} liveBlogWrapperQuery - HTMLElement query string for the liveblogwrapper element. Used to get the element (document.querySelector) to listen for DOM events
 * @property {?HTMLElemet} liveBlogWrapper - liveblogwrapper element
 * @property {!onEntersViewport} onEntersViewport - Function to call when a Post enters a user's viewport
 * @property {!onRead} onRead - Function to call when a Post has been in the user's viewport for >= {@param minMillisecondsToReport} || 5000ms
 * @property {!onError} onError - Function to call when there's an error
 */

/**
 * The height and width of the user's viewPort
 * @typedef {{height: number, width: number}} ViewPort
 */

/**
 * @typedef VisibilityData
 * @type {object}
 * @property {number} elementHeight - the actual height (in pixels) of the element being observed
 * @property {number} elementWidth - the actual width (in pixels) of the element being observed
 * @property {Date} start - the Date time inwhich this specific threshold came into view
 * @property {number} threshold - the percentage of the element currently visible on the users viewport. 0 -> 1
 * @property {number} time - the time in milliseconds this intersection was recorded relative to the IntersectionObserver's origin time
 * @property {string} [type="INTERSECTION_DATA"] - the type of data recorded [INTERSECTION_DATA || TAB_VISIBILIYTY_DATA]
 * @property {ViewPort} viewPort - the current height and width of the viewport
 * @property {number} visibleHeight - the currently visibleHeight of the element on the user's viewport
 * @property {number} visibleWidth - the currently visible width of the element on the user's viewport
 * @property {number} xBound - The x cartesian coordinate of the left side of the element. Coordinates start from the left side of the screen. 0 = absolute left
 * @property {number} yBound - The y cartesian coordinate of the top side of the element. Coordinates start from the top of the screen. 0 = absolute top
 * @property {?number} duration - A computed total number of time this intersection was visible before the next intersection was recorded
 */

/**
 * @typedef TabVisibilityData
 * @type {object}
 * @property {Boolean} hidden - if the tab is current hidden from the user i.e browser minimised or user on a different tab
 * @property {Date} timestamp -  Datetime in which the visibility data was recorded
 * @property {number} time - time in milliseconds inwhich the tab visibility data was recorded
 * @property {string} [type="TAB_VISIBILITY_DATA"] - the type of data recorded [INTERSECTION_DATA || TAB_VISIBILITY_DATA]
 */

const DATA_TYPES = {
	intersectionData: 'INTERSECTION_DATA',
	tabVisibilityDATA: 'TAB_VISIBILITY_DATA'
}

/**
 * A class representing an intersection observer tracker.
 *
 * Used to track how a user reads through articles on FT pages.
 *
 * If no elements are found IntersectionObserverTracker the onError callback is called.
 */
export class PostTracker {
	/**
	 * Create a new Intersection Observer tracker
	 * @param {PostTrackerConfig} config
	 */
	constructor(config) {
		/**
		 * Create a new Intersection Observer tracker
		 * @type {PostTrackerConfig} config
		 */
		this.config = config
		this.currentlyObservedElements = new Set()
		this.visibleElements = new Set()
		/**
		 * live blog wrapper element
		 * @type {HTMLElement}
		 */
		this.wrapperElement = config.liveBlogWrapper
			? config.liveBlogWrapper
			: document.querySelector(config.liveBlogWrapperQuery)
		if (config) {
			this.onEntersViewport = config.onEntersViewport
			this.onRead = config.onRead
			this.onError = config.onError
		}
		this.defaultOptions = {
			root: null,
			rootMargin: '0px',
			threshold: [0.1, 0.2, 0.5, 0.75, 0.99]
		}
		this.setUp()
	}

	setUp() {
		if (IntersectionObserver) {
			if (!this.isValidConfig()) {
				return
			}

			// check if the parent wrapper element for posts exist
			if (!this.wrapperElement) {
				return
			}

			if (!this.config.minMillisecondsToReport) {
				// set minTimeToReport to a default value of 5000
				this.config.minMillisecondsToReport = 5000
			}

			this.observer = new IntersectionObserver((entries) => this.manageIntersection(entries), {
				...this.defaultOptions,
				...this.config.options
			})
			if (this.observer) {
				this.observeElements(this.config.query)
			}

			document.addEventListener('visibilitychange', (event) => this.handleVisibilityChange(event))
			window.addEventListener('beforeunload', () => this.handleWindowClose())

			// updates the list of elements currently being observed
			if (this.config.observerUpdateEventString && this.wrapperElement) {
				this.wrapperElement.addEventListener(this.config.observerUpdateEventString, () =>
					this.observeElements(this.config.query)
				)
			}
		} else {
			this.triggerError(new Error('Unsupported browser.'))
		}
	}

	/**
	 * checks if the PostTrackerConfig passed in is valid
	 *
	 * @returns {Boolean}
	 */
	isValidConfig() {
		if (!this.config) {
			// eslint wasn't happy with the spaces in the template literal. Therefore the long line error message
			let errorMessage =
				'PostTrackerConfig is missing. \nUsage example:\nconst tracker = new IntersectionObserverTracker({\noptions: {\nroot: null,\nrootMargin: "0px",\nthreshold: [0.1, 0.2, 0.5, 0.75, 1]\n},\nquery: \'live-blog-post\'})'
			this.triggerError(new Error(errorMessage))
			return false
		}

		if (!this.config.query) {
			let errorMessage =
				"PostTrackerConfig.query is missing.\nUsage example:\nconst tracker = new IntersectionObserverTracker({\noptions: {...},\nquery: 'live-blog-post'})"
			this.triggerError(new Error(errorMessage))
			return false
		}

		return true
	}

	/**
	 * Handles reporting when a DOM element gets into the view
	 * Also reports when a post has been on the viewport for more than 5s
	 *
	 * @param {IntersectionObserverEntry[]} entries
	 */
	manageIntersection(entries) {
		entries.forEach((entry) => {
			if (this.onEntersViewport) {
				this.reportOnEntersViewport(entry)
			}

			if (this.onRead) {
				this.summariseAndReport(entry)
			}
		})
	}

	/**
	 * Adds window visibility data to dataset.visibilityData for all DOM elements if this.visibleElements
	 */
	handleVisibilityChange(event) {
		const timestamp = new Date()
		if (this.visibleElements.size > 0) {
			this.visibleElements.forEach((element) => {
				if (element.dataset.visibilityData) {
					let visibilityData = JSON.parse(element.dataset.visibilityData)
					if (Array.isArray(visibilityData)) {
						let data = {
							type: DATA_TYPES.tabVisibilityDATA,
							hidden: document.hidden,
							timestamp,
							time: event.timeStamp
						}
						visibilityData.push(data)
						element.dataset.visibilityData = JSON.stringify(visibilityData)
					}
				}
			})
		}
	}

	/**
	 * Starts observing a list of elements that match query.
	 * Calls the on error callback if no element is found.
	 *
	 * @param {string} query - query string to be used for matching
	 */
	observeElements(query) {
		let elements = this.wrapperElement.querySelectorAll(query)
		if (query && elements.length) {
			elements.forEach((element) => {
				if (!this.isElementBeingObserved(element)) {
					this.observer.observe(element)
					this.currentlyObservedElements.add(element)
				}
			})
		} else {
			this.triggerError(new Error('No DOM elements found with the query passed in PostTrackerConfig'))
		}
	}

	/**
	 * Observes new post rendered in the wrapper
	 */
	observeNewElements() {
		this.observeElements(this.config.query)
	}

	/**
	 * Disconnects the intersection observer and stops watching for visibility changes
	 * @returns
	 */
	stopObservation() {
		if (!this.observer || !this.config.query || !this.wrapperElement) {
			return
		}
		this.observer.disconnect()
	}

	/**
	 * Stops observing element visibility and cleans up resources
	 */
	destroy() {
		this.runFinalReadReport()
		this.stopObservation()
		this.currentlyObservedElements = new Set()
		this.visibleElements = new Set()
	}

	/**
	 * Calls the onEntersViewport callback only once when the target element of an IntersectionObserverEntry enters the user's viewPort.
	 *
	 * @param {IntersectionObserverEntry} entry
	 */
	reportOnEntersViewport(entry) {
		if (entry.isIntersecting && !entry.target.dataset.seen) {
			let element = entry.target
			element.dataset.seen = true
			let eventData = {
				timestamp: new Date().toISOString()
			}
			if (this.config.returnVisibleElement) {
				eventData = {
					...eventData,
					element
				}
			}
			this.onEntersViewport(eventData)
		}
	}

	/**
	 *
	 * @param {IntersectionObserverEntry} entry
	 */
	summariseAndReport(entry) {
		// only add summary data when threshold/intersectionRatio is greater than 0
		if (entry.intersectionRatio > 0) {
			this.summariseAndStoreViewData(entry)
		}

		if (!entry.isIntersecting) {
			this.reportRead(entry.target)
		}

		this.updateVisibleElements(entry)
	}

	/**
	 * Gets the summary data from the IntersectionObserverEntry and stores it
	 * in the IntersectionObserverEntry.target.dataset.visibilityData as a
	 * JSON.stringified object (refers to an Array).
	 *
	 * @param {IntersectionObserverEntry} entry
	 */
	summariseAndStoreViewData(entry) {
		const element = entry.target
		const data = {
			type: DATA_TYPES.intersectionData,
			threshold: entry.intersectionRatio,
			xBound: entry.intersectionRect.x, // x coordinate on the screen. left of screen = 0
			yBound: entry.intersectionRect.y, // y coordinate on the screen. top of screen = 0
			visibleHeight: entry.intersectionRect.height,
			visibleWidth: entry.intersectionRect.width,
			elementHeight: element.clientHeight,
			elementWidth: element.clientWidth,
			start: new Date(),
			time: entry.time,
			viewport: {
				height: window.innerHeight,
				width: window.innerWidth
			}
		}
		if (element.dataset.visibilityData) {
			let currentData = JSON.parse(element.dataset.visibilityData)
			currentData.push(data)
			element.dataset.visibilityData = JSON.stringify(currentData)
		} else {
			element.dataset.visibilityData = JSON.stringify([data])
		}
	}

	/**
	 * Emits the View data to the consumer
	 *
	 * @param {HTMLElement} element
	 */
	reportRead(element) {
		/**
		 * @type {(VisibilityData|TabVisibilityData)[]}
		 */
		let summary = element.dataset.visibilityData
		if (summary) {
			summary = JSON.parse(summary)
			let viewData = {
				...this.processTime(summary),
				element: this.config.returnVisibleElement ? element : null,
				post: {
					height: element.clientHeight,
					width: element.clientWidth
				},
				viewport: {
					height: window.innerHeight,
					width: window.innerWidth
				}
			}
			if (viewData.duration >= this.config.minMillisecondsToReport) {
				this.onRead(viewData)
			}
		}

		delete element.dataset.visibilityData
	}

	/**
	 * Adds or removes a DOM element from the this.visibleElements depending on if
	 * the element is intersecting
	 *
	 * @param {IntersectionObserverEntry} entry
	 */
	updateVisibleElements(entry) {
		if (entry.isIntersecting && !this.visibleElements.has(entry.target)) {
			this.visibleElements.add(entry.target)
		} else if (this.visibleElements.has(entry.target)) {
			this.visibleElements.delete(entry.target)
		}
	}

	/**
	 * Processes the times for when the DOM element was in view
	 *
	 * @param {(VisibilityData|TabVisibilityData)[]} summary
	 */
	processTime(summary) {
		/**
		 * total time visible
		 * time away from tab
		 * time a specific intersection was visible
		 */
		let aggregatedSummary = []
		let totalTime = 0
		const start = summary[0].start
		let end
		for (let i = 0; i < summary.length; i++) {
			const element = summary[i]
			const next = summary[i + 1]
			let newElement
			// calculate duration for total time spent for specific intersection
			if (element.type === DATA_TYPES.intersectionData) {
				newElement = {
					...element,
					// if no next element, use window performance to calculate total time of intersection
					duration: (next ? next.time : performance.now()) - element.time
				}
				totalTime += newElement.duration
			}

			// this also considers situations where the user closes the tab
			// while it is hidden. The last dataset should be tab_visibility_data with hidden = true
			if (!next) {
				end = element.timestamp || new Date().toISOString()
			}

			aggregatedSummary.push(newElement || element)
		}

		return {
			summary: aggregatedSummary,
			duration: totalTime,
			start,
			end
		}
	}

	/**
	 * Emits the read event for all visible elements when the user closes the browser window
	 */
	handleWindowClose() {
		this.runFinalReport()
	}

	/**
	 * runs read report for all visible elements
	 */
	runFinalReadReport() {
		this.visibleElements.forEach((element) => this.reportRead(element))
	}

	/**
	 * Calls the onError callback if a function is passed to the
	 * @param {*} error
	 */
	triggerError(error) {
		if (this.onError) {
			this.onError(error)
		}
	}

	/**
	 * checks if an element is currently being observed
	 *
	 * @param {HTMLElement} element
	 *
	 * @returns {boolean}
	 */
	isElementBeingObserved(element) {
		return this.currentlyObservedElements.has(element)
	}
}
