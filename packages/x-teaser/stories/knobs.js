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
		title () {
			return text(
				'Title',
				data.title,
				KnobGroups.Content
			);
		},
		alternativeTitle () {
			return text(
				'Alternative title',
				data.alternativeTitle,
				KnobGroups.Content
			);
		},
		standfirst () {
			return text(
				'Standfirst',
				data.standfirst,
				KnobGroups.Content
			);
		},
		alternativeStandfirst () {
			return text(
				'Alternative standfirst',
				data.alternativeStandfirst,
				KnobGroups.Content
			);
		},
		publishedDate () {
			return date(
				'Published date',
				new Date(data.publishedDate),
				KnobGroups.Content,
			);
		},
		firstPublishedDate () {
			return date(
				'First published date',
				new Date(data.firstPublishedDate),
				KnobGroups.Content
			);
		},
		conceptPrefix () {
			return text(
				'Display concept prefix',
				data.conceptPrefix,
				KnobGroups.Meta
			);
		},
		conceptSuffix () {
			return text(
				'Display concept suffix',
				data.conceptSuffix,
				KnobGroups.Meta
			);
		},
		concept () {
			return {
				url: data.concept.url,
				prefLabel: text(
					'Display concept',
					data.concept.prefLabel,
					KnobGroups.Meta
				)
			};
		},
		alternativeConcept () {
			return {
				url: data.alternativeConcept.url,
				prefLabel: text(
					'Alternative display concept',
					data.alternativeConcept.prefLabel,
					KnobGroups.Meta
				)
			};
		},
		premium () {
			return boolean(
				'Premium',
				data.premium,
				KnobGroups.Content
			);
		}
	};

	const FeatureKnobs = {
		showConcept () {
			return boolean('Show concept', true, KnobGroups.Features);
		},
		showTitle () {
			return boolean('Show title', true, KnobGroups.Features);
		},
		showStandfirst () {
			return boolean('Show standfirst', true, KnobGroups.Features);
		},
		showStatus () {
			return boolean('Show status', true, KnobGroups.Features);
		},
		showImage () {
			return boolean('Show image', true, KnobGroups.Features);
		},
		showHeadshot () {
			return boolean('Show headshot', false, KnobGroups.Features);
		}
	};

	const FeatureOptionKnobs = {
		useAlternativeTitle () {
			return boolean('Use alternative title', false, KnobGroups.Options);
		},
		useAlternativeStandfirst () {
			return boolean('Use alternative standfirst', false, KnobGroups.Options);
		},
		useAlternativeConcept () {
			return boolean('Use alternative concept', false, KnobGroups.Options);
		},
		useRelativeTime () {
			return boolean('Use relative time', false, KnobGroups.Options);
		},
		imageSize () {
			return select('Image size', ['XS', 'Small', 'Medium', 'Large', 'XL'], 'Small', KnobGroups.Options);
		}
	};

	const VariantKnobs = {
		layout () {
			return select('Layout', [
				'small',
				'large',
				'hero',
				'top-story'
			], 'small', KnobGroups.Variants);
		},
		modifiers () {
			return select('Modifiers', [
				'none',
				'stretched',
				'inverse',
				'opinion',
				'opinion-background',
				'centre',
				'hero-image',
				'extra-article',
				'highlight',
				'live',
				'paid-post',
				'promoted-content',
				'big-video',
				'big-story'
			], 'none', KnobGroups.Variants);
		}
	};

	return Object.assign({}, ContentKnobs, VariantKnobs, FeatureKnobs, FeatureOptionKnobs);
};
