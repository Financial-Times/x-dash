exports.title = 'Example';

exports.data = {
	items: require('./content-items.json'),
};

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
