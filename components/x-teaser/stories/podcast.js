const { presets } = require('../');

exports.title = 'Podcast';

// This data will provide defaults for the Knobs defined below and used
// to render examples in the documentation site.
exports.data = Object.assign({
	type: 'audio',
	id: 'd1246074-f7d3-4aaf-951c-80a6db495765',
	url: 'https://www.ft.com/content/d1246074-f7d3-4aaf-951c-80a6db495765',
	title: 'Who sets the internet standards?',
	standfirst: 'Hannah Kuchler talks to American social scientist and cyber security expert Andrea…',
	altStandfirst: '',
	publishedDate: '2018-10-24T04:00:00.000Z',
	firstPublishedDate: '2018-10-24T04:00:00.000Z',
	metaSuffixText: '12 mins',
	metaLink: {
		url: '#',
		prefLabel: 'Tech Tonic podcast'
	},
	metaAltLink: null,
	image: {
		url: 'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fprod-upp-image-read.ft.com%2F5d1a54aa-f49b-11e8-ae55-df4bf40f9d0d?source=next&fit=scale-down&compression=best&width=240',
		width: 2048,
		height: 1152
	},
	indicators: {
		"isPodcast": true
	}
}, presets.SmallHeavy);

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
	'altTitle',
	// Standfirst
	'showStandfirst',
	'standfirst',
	'altStandfirst',
	// Status
	'showStatus',
	'publishedDate',
	'firstPublishedDate',
	'useRelativeTime',
	'status',
	// Image
	'showImage',
	'image',
	'imageSize',
	// Indicators
	'indicators',
	// Context
	'headlineTesting',
	// Variants
	'layout',
	'modifiers',
];

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
