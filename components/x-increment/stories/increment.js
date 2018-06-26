exports.title = 'Increment';

exports.data = {
	count: 1,
	id: 'base-increment-static-id',
};

exports.knobs = ['count'];

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
