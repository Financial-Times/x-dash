
const data = require('./data');
const { CONSENT_API } = require('../src/privacy-manager');

exports.title = 'Save failed';

exports.data = {
	...data,
	consent: true
};

exports.knobs = Object.keys(exports.data);

exports.fetchMock = (fetchMock) => {
	fetchMock.patch(CONSENT_API, 500, {
		throw: new Error('bad membership api'),
		delay: 1000
	});
};

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
