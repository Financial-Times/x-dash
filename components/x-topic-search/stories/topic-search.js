exports.title = 'Topic Search Bar';

exports.data = {
	minSearchLength: 2,
	maxSuggestions: 10,
	apiUrl: '//tag-facets-api.ft.com/annotations',
	followedTopics: [
		{
			name: 'World Elephant Polo Association',
			uuid: 'f95d1e16-2307-4feb-b3ff-6f224798aa49'
		}
	]
};

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
