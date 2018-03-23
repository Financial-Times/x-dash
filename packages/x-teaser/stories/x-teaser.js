const {Teaser} = require('../');
const h = require('@financial-times/x-engine');

exports.title = 'Teaser';

exports.fixture = {
	type: 'article',
	id: '',
	url: '#',
	title: 'Inside charity fundraiser where hostesses are put on show',
	titleVariant: '',
	standfirst: 'FT investigation finds groping and sexual harassment at secretive black-tie dinner',
	standfirstVariant: '',
	publishedDate: '2018-01-23T15:07:00.000Z',
	firstPublishedDate: '2018-01-23T13:53:00.000Z',
	conceptPrefix: '',
	conceptSuffix: '',
	concept: {
		url: '#',
		prefLabel: 'FT Investigations'
	},
	alternativeConcept: {
		url: '#',
		prefLabel: ''
	},
	image: {
		url: 'http://prod-upp-image-read.ft.com/a25832ea-0053-11e8-9650-9c0ad2d7c5b5',
		width: 2048,
		height: 1152,
		aspectRatio: 0.5625
	},
	premium: false
};

exports.stories = {
	'Extra Light' ({createProps}) {
		const props = createProps([
			// Content
			'id',
			'url',
			'title',
			'standfirst',
			'publishedDate',
			'firstPublishedDate',
			'conceptPrefix',
			'concept',
			'premium',
			// Features
			'showConcept',
			'showTitle',
			'showStandfirst',
			'showDateTimeStatus',
			// Feature options
			'useRelativeTime',
			'useTitleVariant',
			'useStandfirstVariant'
		]);

		return <Teaser {...props} modifiers={['small']} />;
	},

	'Light' ({createProps}) {
		const props = createProps([
			// Content
			'id',
			'url',
			'title',
			'standfirst',
			'publishedDate',
			'firstPublishedDate',
			'conceptPrefix',
			'concept',
			'image',
			'premium',
			// Features
			'showConcept',
			'showTitle',
			'showStandfirst',
			'showDateTimeStatus',
			'showImage',
			// Feature options
			'useRelativeTime',
			'useTitleVariant',
			'useStandfirstVariant'
		]);

		return <Teaser {...props} modifiers={['small', 'has-image']} />;
	}
};


exports.knobs = (data, {text, boolean, date}) => {
	// Available in Storybook 3.4.x
	const KnobGroups = {
		Content: 'Content',
		Meta: 'Meta',
		Features: 'Features',
		Options: 'Options',
	};

	const ContentKnobs = {
		title: text(
			'Title',
			data.title,
			KnobGroups.Content
		),
		titleVariant: text(
			'Alternative title',
			data.titleVariant,
			KnobGroups.Content
		),
		standfirst: text(
			'Standfirst',
			data.standfirst,
			KnobGroups.Content
		),
		standfirstVariant: text(
			'Alternative standfirst',
			data.standfirstVariant,
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
		useTitleVariant: boolean('Use alternative title', false, KnobGroups.Options),
		useStandfirstVariant: boolean('Use alternative standfirst', false, KnobGroups.Options),
		useRelativeTime: boolean('Use relative time', false, KnobGroups.Options)
	};

	return Object.assign(ContentKnobs, FeatureKnobs, FeatureOptionKnobs);
};

exports.module = module;
