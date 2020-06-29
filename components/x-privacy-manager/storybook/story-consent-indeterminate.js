const { defaults, parameters, getFetchMock } = require('./data');

exports.title = 'Consent: indeterminate';

exports.data = {
	...defaults,
	consent: undefined
};

exports.parameters = parameters;

exports.knobs = Object.keys(exports.data);

exports.fetchMock = getFetchMock();

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
