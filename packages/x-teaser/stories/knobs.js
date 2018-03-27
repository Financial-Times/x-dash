module.exports = (data, { text, boolean, date, select }) => {
	// Groups will be available in Storybook 3.4.x
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
		showStatus: boolean('Show status', true, KnobGroups.Features),
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
