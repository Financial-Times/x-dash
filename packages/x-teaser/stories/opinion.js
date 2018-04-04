const { Teaser, presets } = require('../');

exports.title = 'Opinion Piece';

exports.data = Object.assign({
	type: 'article',
	id: '',
	url: '#',
	title: 'Anti-Semitism and the threat of identity politics',
	alternativeTitle: '',
	standfirst: 'Today, hatred of Jews is mixed in with fights about Islam and Israel',
	alternativeStandfirst: 'Anti-Semitism and identity politics',
	publishedDate: '2018-04-02T12:22:01.000Z',
	firstPublishedDate: '2018-04-02T12:22:01.000Z',
	conceptPrefix: 'Opinion',
	conceptSuffix: '',
	concept: {
		url: '#',
		prefLabel: 'Anti-Semitism'
	},
	alternativeConcept: {
		url: '#',
		prefLabel: 'Gideon Rachman'
	},
	image: {
		url: 'http://prod-upp-image-read.ft.com/1005ca96-364b-11e8-8b98-2f31af407cc8',
		width: 2048,
		height: 1152
	},
	headshot: {
		url: 'fthead-v1:gideon-rachman',
		width: null,
		height: null
	},
	indicators: {
		isOpinion: true,
		isColumn: true
	}
}, presets.SMALL_HEAVY_OPINION);

// To ensure that component stories do not need to depend on Storybook themselves we return a
// function that may be passed the required dependencies.
exports.story = function ({ createProps }) {
	const props = createProps([
		'id',
		'url',
		'type',
		// Meta
		'showMeta',
		'conceptPrefix',
		'concept',
		'conceptSuffix',
		// Title
		'showTitle',
		'title',
		// Standfirst
		'showStandfirst',
		'standfirst',
		// Status
		'showStatus',
		'publishedDate',
		'firstPublishedDate',
		'useRelativeTime',
		'status',
		// Headshot
		'showHeadshot',
		'headshot',
		// Image
		'showImage',
		'image',
		'imageSize',
		// Variants
		'layout',
		'modifiers',
		// Indicators
		'indicators',
	]);

	return Teaser(props);
};

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
