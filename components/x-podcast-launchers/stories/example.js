const { brand } = require('@financial-times/n-concept-ids');

exports.title = 'Example';

exports.data = {
	seriesConceptId: brand.rachmanReviewPodcast,
	acastRSSHost: 'https://access.acast.cloud',
	acastAccessToken: 'abc-123'
};

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
