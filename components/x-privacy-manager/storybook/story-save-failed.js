const { CONSENT_API, defaults } = require('./data');

exports.title = 'Save failed';

exports.data = defaults;

exports.knobs = Object.keys(exports.data);

exports.fetchMock = (fetchMock) => {
	fetchMock.mock(CONSENT_API, 200, {
		delay: 1000,
	});
};

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
