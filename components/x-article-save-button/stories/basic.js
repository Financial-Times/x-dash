exports.title = 'Basic ArticleSaveButton';

exports.data = {
	action: '/article-save',
	contentId: '0000-0000-0000-0000',
	contentTitle: 'UK crime agency steps up assault on Russian dirty money',
	csrfToken: 'dummy-token',
	method: 'POST',
	saved: false,
	trackableId: 'trackable-id'
};

exports.knobs = [
	'action',
	'method',
	'csrfToken',
	'contentId',
	'contentTitle',
	'saved',
	'trackableId'
];

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
