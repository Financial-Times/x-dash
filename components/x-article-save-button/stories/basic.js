exports.title = 'Basic ArticleSaveButton';

const data = {
	contentId: '0000-0000-0000-0000',
	contentTitle: 'UK crime agency steps up assault on Russian dirty money',
	csrfToken: 'dummy-token',
	saved: false,
	trackableId: 'trackable-id'
};

exports.data = data;

exports.knobs = Object.keys(data);

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
