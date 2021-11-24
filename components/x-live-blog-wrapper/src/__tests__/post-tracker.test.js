import { PostTracker } from '../lib/post-tracker'
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const doc = new JSDOM(
	'<html><head></head><body><div><article data-trackable="live-post" class="live-blog-post></article><article data-trackable="live-post" class="live-blog-post></article></div></body></html>'
)
doc.addEventListener = jest.fn(() => {})

describe('Live blog Visibility Tracker', function () {
	beforeEach(function () {
		Object.defineProperty(global, 'IntersectionObserver', {
			writable: true,
			configurable: true,
			value: null
		})
	})

	afterEach(function () {
		clearMocks()
	})

	it("should emit an error when the browser doesn't have intersection observer", function () {
		let spy = jest.fn(() => {})
		new PostTracker({ query: 'article[data-trackable="live-post"]', onError: spy })
		expect(spy).toHaveBeenCalledTimes(1)
	})

	it('should emit an error when a query is not passed to config', function () {
		setupIntersectionObserverMock()
		global.window = doc
		global.window.addEventListener = jest.fn(() => {})
		global.document = doc.window
		global.document.querySelectorAll = jest.fn(() => [{}])
		let spy = jest.fn(() => {})
		new PostTracker({ onError: spy })
		expect(spy).toHaveBeenCalledTimes(1)
	})

	it("should emit an error when a query doesn't match any elements ", function () {
		setupIntersectionObserverMock()
		let spy = jest.fn(() => {})
		global.window = doc
		global.window.addEventListener = jest.fn(() => {})

		global.document = doc.window
		global.document.querySelector = jest.fn(() => {
			return { querySelectorAll: jest.fn(() => []) }
		})
		new PostTracker({ query: 'lord-of-the-rings', onError: spy })
		expect(spy).toHaveBeenCalledTimes(1)
	})
})

function setupIntersectionObserverMock({
	root = null,
	rootMargin = '',
	thresholds = [],
	disconnect = () => null,
	observe = () => null,
	takeRecords = () => [],
	unobserve = () => null
} = {}) {
	class MockIntersectionObserver {
		constructor() {
			this.root = root
			this.rootMargin = rootMargin
			this.thresholds = thresholds
			this.disconnect = disconnect
			this.observe = observe
			this.takeRecords = takeRecords
			this.unobserve = unobserve
		}
	}

	Object.defineProperty(window, 'IntersectionObserver', {
		writable: true,
		configurable: true,
		value: MockIntersectionObserver
	})

	Object.defineProperty(global, 'IntersectionObserver', {
		writable: true,
		configurable: true,
		value: MockIntersectionObserver
	})
}

function clearMocks() {
	Object.defineProperty(global, 'IntersectionObserver', {
		writable: true,
		configurable: true,
		value: null
	})
}
