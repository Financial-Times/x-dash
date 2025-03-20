import util from 'util'

// Polyfill for TextEncoder so it is available to enzyme.render(<Component />)
// Jest and JSDOM do not have a built-in TextEncoder implementation in the test environment
if (typeof global.TextEncoder === 'undefined') {
	Object.defineProperty(global, 'TextEncoder', {
		value: util.TextEncoder
	})
}
