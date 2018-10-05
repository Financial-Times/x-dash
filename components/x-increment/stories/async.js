exports.title = 'Async';

const data = {
	count: 1,
	timeout: 1000,
	id: 'base-increment-static-id',
};

exports.data = data;

exports.knobs = Object.keys(data);

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
