import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, date, select, text } from '@storybook/addon-knobs/react';
import { Teaser } from '../../x-teaser';

const stories = storiesOf('Teaser', module);

stories.addDecorator(withKnobs);

// Available in Storybook 3.4.x
const KnobGroups = {
	Content: 'Content',
	Meta: 'Meta',
	Variants: 'Variants',
	Features: 'Features',
	Options: 'Options',
};

const ContentFixture = {
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

const ContentKnobs = Object.assign({}, ContentFixture, {
	title: () => text(
		'Title',
		ContentFixture.title,
		KnobGroups.Content
	),
	alternativeTitle: () => text(
		'Alternative title',
		ContentFixture.alternativeTitle,
		KnobGroups.Content
	),
	standfirst: () => text(
		'Standfirst',
		ContentFixture.standfirst,
		KnobGroups.Content
	),
	alternativeStandfirst: () => text(
		'Alternative standfirst',
		ContentFixture.alternativeStandfirst,
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
	useAlternativeTitle: () => boolean('Use alternative title', false, KnobGroups.Options),
	useAlternativeStandfirst: () => boolean('Use alternative standfirst', false, KnobGroups.Options),
	useAlternativeConcept: () => boolean('Use alternative concept', false, KnobGroups.Options),
	useRelativeTime: () => boolean('Use relative time', false, KnobGroups.Options),
	imageSize: () => select('Image size', ['XS', 'Small', 'Medium', 'Large', 'XL'], 'Small', KnobGroups.Options)
};

const VariantKnobs = {
	layout: () => select('Layout', [ 'small', 'stacked', 'lifestyle', 'large', 'hero' ], 'standard', KnobGroups.Variants),
	modifiers: () => select('Modifiers', [ 'none', 'stretched', 'inverse', 'opinion', 'opinion-background', 'centre', 'hero-image', 'extra-article', 'highlight', 'live', 'paid-post', 'promoted-content', 'big-video' ], 'none', KnobGroups.Variants)
};

const createProps = (whitelist = []) => {
	const props = { ...ContentKnobs, ...VariantKnobs, ...FeatureKnobs, ...FeatureOptionKnobs };

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

		return <Teaser {...props} />;
	})
	.add('Light', () => {
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

		return <Teaser {...props} />;
	});
