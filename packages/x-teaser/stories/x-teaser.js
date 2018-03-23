const {Teaser} = require('../');
const h = require('@financial-times/x-engine');

exports.title = 'Teaser';

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
		height: 1152,
		aspectRatio: 0.5625
	},
	imageSize: 'Small',
	premium: false
};

exports.stories = {
	'Extra Light' ({createProps}) {
		const props = createProps([
			// Core content
			'id',
			'url',
			'type',
			'title',
			'alternativeTitle',
			'standfirst',
			'alternativeStandfirst',
			'publishedDate',
			'firstPublishedDate',
			'conceptPrefix',
			'concept',
			'conceptSuffix',
			'alternativeConcept',
			'premium',
			// Variant options
			'layout',
			'modifiers',
			// Features
			'showConcept',
			'showTitle',
			'showStandfirst',
			'showDateTimeStatus',
			// Feature options
			'useRelativeTime',
			'useAlternativeTitle',
			'useAlternativeStandfirst',
			'useAlternativeConcept'
		]);

		return <Teaser {...props} modifiers={['small']} />;
	},

	'Light' ({createProps}) {
		const props = createProps([
			// Core content
			'id',
			'url',
			'type',
			'title',
			'alternativeTitle',
			'standfirst',
			'alternativeStandfirst',
			'publishedDate',
			'firstPublishedDate',
			'conceptPrefix',
			'concept',
			'conceptSuffix',
			'alternativeConcept',
			'premium',
			'image',
			// Variant options
			'layout',
			'modifiers',
			// Features
			'showConcept',
			'showTitle',
			'showStandfirst',
			'showDateTimeStatus',
			'showImage',
			// Feature options
			'useRelativeTime',
			'useAlternativeTitle',
			'useAlternativeStandfirst',
			'useAlternativeConcept',
			'imageSize'
		]);

		return <Teaser {...props} modifiers={['small', 'has-image']} />;
	}
};


exports.knobs = (data, {text, boolean, date, select}) => {
	// Available in Storybook 3.4.x
	const KnobGroups = {
		Content: 'Content',
		Meta: 'Meta',
		Variants: 'Variants',
		Features: 'Features',
		Options: 'Options',
	};

	const ContentKnobs = {
		title: text(
			'Title',
			data.title,
			KnobGroups.Content
		),
		alternativeTitle: text(
			'Alternative title',
			data.alternativeTitle,
			KnobGroups.Content
		),
		standfirst: text(
			'Standfirst',
			data.standfirst,
			KnobGroups.Content
		),
		alternativeStandfirst: text(
			'Alternative standfirst',
			data.alternativeStandfirst,
			KnobGroups.Content
		),
		publishedDate: date(
			'Published date',
			new Date(data.publishedDate),
			KnobGroups.Content),
		firstPublishedDate: date(
			'First published date',
			new Date(data.firstPublishedDate),
			KnobGroups.Content
		),
		conceptPrefix: text(
			'Display concept prefix',
			data.conceptPrefix,
			KnobGroups.Meta
		),
		concept: ({
			url: data.concept.url,
			prefLabel: text(
				'Display concept',
				data.concept.prefLabel,
				KnobGroups.Meta
			)
		}),
		alternativeConcept: ({
			url: data.alternativeConcept.url,
			prefLabel: text(
				'Alternative display concept',
				data.alternativeConcept.prefLabel,
				KnobGroups.Meta
			)
		}),
		premium: boolean(
			'Premium',
			data.premium,
			KnobGroups.Content
		)
	};

	const FeatureKnobs = {
		showConcept: boolean('Show concept', true, KnobGroups.Features),
		showTitle: boolean('Show title', true, KnobGroups.Features),
		showStandfirst: boolean('Show standfirst', true, KnobGroups.Features),
		showDateTimeStatus: boolean('Show date/time/status', true, KnobGroups.Features),
		showImage: boolean('Show image', true, KnobGroups.Features),
		showHeadshot: boolean('Show headshot', false, KnobGroups.Features)
	};

	const FeatureOptionKnobs = {
		useAlternativeTitle: boolean('Use alternative title', false, KnobGroups.Options),
		useAlternativeStandfirst: boolean('Use alternative standfirst', false, KnobGroups.Options),
		useAlternativeConcept: boolean('Use alternative concept', false, KnobGroups.Options),
		useRelativeTime: boolean('Use relative time', false, KnobGroups.Options),
		imageSize: select('Image size', ['XS', 'Small', 'Medium', 'Large', 'XL'], 'Small', KnobGroups.Options)
	};

	const VariantKnobs = {
		layout: select('Layout', [ 'small', 'stacked', 'large', 'hero', 'top-story' ], 'small', KnobGroups.Variants),
		modifiers: select('Modifiers', [ 'none', 'stretched', 'inverse', 'opinion', 'opinion-background', 'centre', 'hero-image', 'extra-article', 'highlight', 'live', 'paid-post', 'promoted-content', 'big-video', 'big-story' ], 'none', KnobGroups.Variants)
	};

	return Object.assign({}, ContentKnobs, VariantKnobs, FeatureKnobs, FeatureOptionKnobs);
};

exports.module = module;
