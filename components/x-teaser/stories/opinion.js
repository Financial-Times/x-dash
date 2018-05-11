const { presets } = require('../');

exports.title = 'Opinion Piece';

// This data will provide defaults for the Knobs defined below and used
// to render examples in the documentation site.
exports.data = Object.assign({
	type: 'article',
	id: '',
	url: '#',
	title: 'Anti-Semitism and the threat of identity politics',
	altTitle: '',
	standfirst: 'Today, hatred of Jews is mixed in with fights about Islam and Israel',
	altStandfirst: 'Anti-Semitism and identity politics',
	publishedDate: '2018-04-02T12:22:01.000Z',
	firstPublishedDate: '2018-04-02T12:22:01.000Z',
	metaPrefixText: 'Opinion',
	metaSuffixText: '',
	metaLink: {
		url: '#',
		prefLabel: 'Anti-Semitism'
	},
	metaAltLink: {
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
}, presets.SmallHeavy, { showHeadshot: true });

// A list of properties to pass to the component when rendered in Storybook. If a Knob
// exists for the property then it will be editable with the default as defined above.
exports.knobs = [
	'id',
	'url',
	'type',
	// Meta
	'showMeta',
	'metaPrefixText',
	'metaSuffixText',
	'metaLink',
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
];

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
