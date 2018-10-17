exports.title = 'Example';

exports.data = {
	articles: require('./articles.json')
};

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
