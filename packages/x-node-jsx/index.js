const { addHook } = require('pirates')
const { transform } = require('sucrase')

const extension = '.jsx'

// Assume .jsx components are using x-engine
const jsxOptions = {
	jsxPragma: 'h',
	jsxFragmentPragma: 'Fragment'
}

const defaultOptions = {
	// Do not output JSX debugger information
	production: true,
	// https://github.com/alangpierce/sucrase#transforms
	transforms: ['imports', 'jsx']
}

module.exports = (userOptions = {}) => {
	const options = { ...defaultOptions, ...userOptions, ...jsxOptions }

	const handleJSX = (code) => {
		const transformed = transform(code, options)
		return transformed.code
	}

	// Return a function to revert the hook
	return addHook(handleJSX, { exts: [extension] })
}
