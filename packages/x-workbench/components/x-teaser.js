import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, date, boolean } from '@storybook/addon-knobs/react';
import { Teaser } from '../../x-teaser';

const stories = storiesOf('Teaser', module);

stories.addDecorator(withKnobs);

// Available in Storybook 3.4.x
const KnobGroups = {
	Content: 'Content',
	Meta: 'Meta',
	Features: 'Features',
	Options: 'Options',
};

const ContentFixture = {
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

const ContentKnobs = Object.assign({}, ContentFixture, {
	title: () => text(
		'Title',
		ContentFixture.title,
		KnobGroups.Content
	),
	titleVariant: () => text(
		'Alternative title',
		ContentFixture.titleVariant,
		KnobGroups.Content
	),
	standfirst: () => text(
		'Standfirst',
		ContentFixture.standfirst,
		KnobGroups.Content
	),
	standfirstVariant: () => text(
		'Alternative standfirst',
		ContentFixture.standfirstVariant,
		KnobGroups.Content
	),
	publishedDate: () => date(
		'Published date',
		new Date(ContentFixture.publishedDate),
		KnobGroups.Content),
	firstPublishedDate: () => date(
		'First published date',
		new Date(ContentFixture.firstPublishedDate),
		KnobGroups.Content
	),
	conceptPrefix: () => text(
		'Display concept prefix',
		ContentFixture.conceptPrefix,
		KnobGroups.Meta
	),
	concept: () => ({
		url: ContentFixture.concept.url,
		prefLabel: text(
			'Display concept',
			ContentFixture.concept.prefLabel,
			KnobGroups.Meta
		)
	}),
	alternativeConcept: () => ({
		url: ContentFixture.alternativeConcept.url,
		prefLabel: text(
			'Alternative display concept',
			ContentFixture.alternativeConcept.prefLabel,
			KnobGroups.Meta
		)
	}),
	premium: () => boolean(
		'Premium',
		ContentFixture.premium,
		KnobGroups.Content
	)
});

const FeatureKnobs = {
	showConcept: () => boolean('Show concept', true, KnobGroups.Features),
	showTitle: () => boolean('Show title', true, KnobGroups.Features),
	showStandfirst: () => boolean('Show standfirst', true, KnobGroups.Features),
	showDateTimeStatus: () => boolean('Show date/time/status', true, KnobGroups.Features),
	showImage: () => boolean('Show image', true, KnobGroups.Features),
	showHeadshot: () => boolean('Show headshot', false, KnobGroups.Features)
};

const FeatureOptionKnobs = {
	useTitleVariant: () => boolean('Use alternative title', false, KnobGroups.Options),
	useStandfirstVariant: () => boolean('Use alternative standfirst', false, KnobGroups.Options),
	useRelativeTime: () => boolean('Use relative time', false, KnobGroups.Options)
};

const createProps = (whitelist = []) => {
	const props = { ...ContentKnobs, ...FeatureKnobs, ...FeatureOptionKnobs };

	return whitelist.reduce((allowed, item) => {
		if (props.hasOwnProperty(item)) {
			const target = props[item];
			allowed[item] = typeof target === 'function' ? target() : target;
		}

		return allowed;
	}, {});
};

stories
	.add('Extra light', () => {
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
	})
	.add('Light', () => {
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
	});
