const { brand } = require('@financial-times/n-concept-ids');

exports.title = 'Example';

exports.data = {
	conceptId: brand.rachmanReviewPodcast,
	acastRSSHost: 'https://access.acast.cloud',
	acastAccessToken: 'abc-123',
	conceptName: 'Rachman Review',
	isFollowed: false,
	csrfToken: 'token',
};

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
