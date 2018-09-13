exports.title = 'Basic ArticleSaveButton';

exports.data = {
	saved: false,
	csrfToken: 'dummy-token',
	action: '/article-save',
	contentId: '0000-0000-0000-0000',
	method: 'POST'
};

exports.knobs = [
	'action',
	'method',
	'csrfToken',
	'contentId',
	'saved'
];

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
