exports.title = 'Teaser list';

const data = {
	items: require('./content-items.json'),
	csrfToken: 'dummy-token',
	showSaveButtons: true
};

exports.data = data;

exports.knobs = Object.keys(data);

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
