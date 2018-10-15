import { presets } from '../src/Teaser';

export const title = 'Package item';

// This data will provide defaults for the Knobs defined below and used
// to render examples in the documentation site.
export const data = Object.assign({
	type: 'article',
	id: '',
	url: '#',
	title: 'Why so little has changed since the crash',
	standfirst: 'Martin Wolf on the power of vested interests in today’s rent-extracting economy',
	publishedDate: '2018-09-02T15:07:00.000Z',
	firstPublishedDate: '2018-09-02T13:53:00.000Z',
	metaPrefixText: 'FT Series',
	metaSuffixText: '',
	metaLink: {
		url: '#',
		prefLabel: 'Financial crisis: Are we safer now? '
	},
	image: {
		url: 'http://prod-upp-image-read.ft.com/a25832ea-0053-11e8-9650-9c0ad2d7c5b5',
		width: 2048,
		height: 1152
	},
	indicators: {
		isOpinion: true
	}
}, presets.Hero, { parentTheme: 'extra-article', modifiers: 'centre' });

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
	// Indicators
	'indicators',
	// Variants
	'layout',
	'theme',
	'parentTheme',
	'modifiers',
];

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
export const m = module;
