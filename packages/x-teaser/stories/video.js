const { Teaser } = require('../');
const h = require('@financial-times/x-engine');

exports.component = 'x-teaser';

exports.origamiDependencies = {
	'o-fonts': '^3',
	'o-typography': '^5.5.0',
	'o-teaser': '^2.2.0',
	'o-labels': '^3.0.0',
};

exports.fixture = {
	type: 'video',
	// The ID is required for the in-situ video demo to work
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
};

exports.stories = {

	Video ({ createProps }) {
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
		]);

		return h(Teaser, props);
	}
};

exports.knobs = require('./knobs');

exports.module = module;
