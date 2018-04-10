const { presets } = require('../');

exports.title = 'Video';

// This data will provide defaults for the Knobs defined below and used
// to render examples in the documentation site.
exports.data = Object.assign({
	type: 'video',
	// The ID is required for the in-situ video demo to work
	// NOTE: o-video is not be called on component mount so won't render anyway.
	id: '0e89d872-5711-457b-80b1-4ca0d8afea46',
	url: '#',
	title: 'FT View: Donald Trump, man of steel',
	standfirst: 'The FT\'s Rob Armstrong looks at why Donald Trump is pushing trade tariffs',
	publishedDate: '2018-03-26T08:12:28.137Z',
	firstPublishedDate: '2018-03-26T08:12:28.137Z',
	conceptPrefix: '',
	conceptSuffix: '02:51min',
	concept: {
		url: '#',
		prefLabel: 'Global Trade'
	},
	alternativeConcept: {
		url: '#',
		prefLabel: 'US'
	},
	image: {
		url: 'http://com.ft.imagepublish.upp-prod-eu.s3.amazonaws.com/a27ce49b-85b8-445b-b883-db6e2f533194',
		width: 1920,
		height: 1080
	},
	video: {
		url: 'https://next-media-api.ft.com/renditions/15218247321960/640x360.mp4',
		width: 640,
		height: 360,
		mediaType: 'video/mp4'
	}
}, presets.HeroVideo);

// A list of properties to pass to the component when rendered in Storybook. If a Knob
// exists for the property then it will be editable with the default as defined above.
exports.knobs = [
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
	// Status
	'showStatus',
	'publishedDate',
	'firstPublishedDate',
	'useRelativeTime',
	// Image
	'showImage',
	'image',
	'imageSize',
	// Video
	'showVideo',
	'video',
	// Variants
	'layout',
	'modifiers',
];

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
