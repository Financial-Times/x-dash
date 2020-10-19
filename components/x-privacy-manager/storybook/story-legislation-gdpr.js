const { defaults, getFetchMock } = require('./data')

exports.title = 'Consent GDPR'

exports.data = {
	...defaults,
	legislationId: 'gdpr',
	consent: undefined,
	buttonText: {
		allow: {
			label: 'Allow',
			text: 'See personalised advertising and allow measurement of advertising effectiveness'
		},
		block: {
			label: 'Block',
			text: 'Block personalised advertising and measurement of advertising effectiveness'
		}
	}
}

exports.knobs = Object.keys(exports.data)

exports.fetchMock = getFetchMock()

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module
