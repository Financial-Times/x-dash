const { PrivacyManager } = require('../src/privacy-manager')

exports.component = PrivacyManager

exports.package = require('../package.json')

exports.dependencies = {
	'o-loading': '^4.0.0',
	'o-message': '^4.0.0',
	'o-typography': '^6.0.0'
}

exports.stories = [
	require('./story-consent-indeterminate'),
	require('./story-consent-accepted'),
	require('./story-consent-blocked'),
	require('./story-save-failed')
]

exports.knobs = require('./knobs')
