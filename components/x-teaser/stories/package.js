const { presets } = require('../');

exports.title = 'Content Package';

// This data will provide defaults for the Knobs defined below and used
// to render examples in the documentation site.
exports.data = Object.assign({
	type: 'package',
	id: '',
	url: '#',
	title: 'The royal wedding',
	altTitle: '',
	standfirst: 'Prince Harry and Meghan Markle will tie the knot at Windsor Castle',
	altStandfirst: '',
	publishedDate: '2018-05-14T16:38:49.000Z',
	firstPublishedDate: '2018-05-14T16:38:49.000Z',
	metaPrefixText: '',
	metaSuffixText: '',
	metaLink: {
		url: '#',
		prefLabel: 'FT Magazine'
	},
	metaAltLink: {
		url: '#',
		prefLabel: 'FT Series'
	},
	image: {
		url: 'http://prod-upp-image-read.ft.com/7e97f5b6-578d-11e8-b8b2-d6ceb45fa9d0',
		width: 2048,
		height: 1152
	}
}, presets.Hero, { modifiers: 'centre' });

// A list of properties to pass to the component when rendered in Storybook. If a Knob
// exists for the property then it will be editable with the default as defined above.
exports.knobs = [
	'id',
	'url',
	'type',
	// Meta
	'showMeta',
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
	// Image
	'showImage',
	'image',
	'imageSize',
	// Variants
	'layout',
	'modifiers',
];

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
