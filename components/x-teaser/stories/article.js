import { presets } from '../src/Teaser';

export const title = 'Article';

// This data will provide defaults for the Knobs defined below and used
// to render examples in the documentation site.
export const data = Object.assign({
	type: 'article',
	id: '',
	url: '#',
	title: 'Inside charity fundraiser where hostesses are put on show',
	altTitle: 'Men Only, the charity fundraiser with hostesses on show',
	standfirst: 'FT investigation finds groping and sexual harassment at secretive black-tie dinner',
	altStandfirst: 'Groping and sexual harassment at black-tie dinner charity event',
	publishedDate: '2018-01-23T15:07:00.000Z',
	firstPublishedDate: '2018-01-23T13:53:00.000Z',
	metaPrefixText: '',
	metaSuffixText: '',
	metaLink: {
		url: '#',
		prefLabel: 'Sexual misconduct allegations'
	},
	metaAltLink: {
		url: '#',
		prefLabel: 'FT Investigations'
	},
	image: {
		url: 'http://prod-upp-image-read.ft.com/a25832ea-0053-11e8-9650-9c0ad2d7c5b5',
		width: 2048,
		height: 1152
	},
	indicators: {
		isEditorsChoice: true
	}
}, presets.SmallHeavy);

// A list of properties to pass to the component when rendered in Storybook. If a Knob
// exists for the property then it will be editable with the default as defined above.
export const knobs = [
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
export const m = module;
