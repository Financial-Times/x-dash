const { defaults, getFetchMock } = require('./data');

exports.title = 'Save failed';

exports.data = defaults;

exports.knobs = Object.keys(exports.data);

exports.fetchMock = getFetchMock(500);

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
