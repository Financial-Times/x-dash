const { Teaser } = require('../');
const h = require('@financial-times/x-engine');

exports.component = 'x-teaser';

exports.fixture = {
	type: 'article',
	id: '',
	url: '#',
	title: 'Inside charity fundraiser where hostesses are put on show',
	alternativeTitle: 'Men Only, the charity fundraiser with hostesses on show',
	standfirst: 'FT investigation finds groping and sexual harassment at secretive black-tie dinner',
	alternativeStandfirst: 'Groping and sexual harassment at black-tie dinner charity event',
	publishedDate: '2018-01-23T15:07:00.000Z',
	firstPublishedDate: '2018-01-23T13:53:00.000Z',
	conceptPrefix: '',
	conceptSuffix: '',
	concept: {
		url: '#',
		prefLabel: 'Sexual misconduct allegations'
	},
	alternativeConcept: {
		url: '#',
		prefLabel: 'FT Investigations'
	},
	image: {
		url: 'http://prod-upp-image-read.ft.com/a25832ea-0053-11e8-9650-9c0ad2d7c5b5',
		width: 2048,
		height: 1152
	},
	indicators: {}
};

exports.stories = {

	Article ({ createProps }) {
		const props = createProps([
			'id',
			'url',
			'type',
			// Meta
			'showMeta',
			'conceptPrefix',
			'concept',
			'conceptSuffix',
			'alternativeConcept',
			'useAlternativeConcept',
			// Title
			'showTitle',
			'title',
			'alternativeTitle',
			'useAlternativeTitle',
			// Standfirst
			'showStandfirst',
			'standfirst',
			'alternativeStandfirst',
			'useAlternativeStandfirst',
			// Status
			'showStatus',
			'publishedDate',
			'firstPublishedDate',
			'useRelativeTime',
			'status',
			// Headshot
			// TODO: 'showHeadshot',
			// TODO: 'headshot',
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

		return h(Teaser, props);
	}
};

exports.knobs = require('./knobs');

exports.module = module;
