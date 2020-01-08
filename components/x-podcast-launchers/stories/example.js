const { brand } = require('@financial-times/n-concept-ids');

exports.title = 'Example';

exports.data = {
	conceptId: brand.rachmanReviewPodcast,
	conceptName: 'Rachman Review',
	isFollowed: false,
	csrfToken: 'token',
	acastRSSHost: 'https://access.acast.com',
	acastAccessToken: 'abc-123',
	isApp: false,
};

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
