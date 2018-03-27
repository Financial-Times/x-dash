module.exports = (data, { text, boolean, date, selectV2 }) => {
	// Groups will be available in Storybook 3.4.x
	const Groups = {
		Content: 'Content',
		Meta: 'Meta',
		Variants: 'Variants',
		Features: 'Features',
		Options: 'Options',
	};

	const Content = {
		title () {
			return text(
				'Title',
				data.title,
				Groups.Content
			);
		},
		alternativeTitle () {
			return text(
				'Alternative title',
				data.alternativeTitle,
				Groups.Content
			);
		},
		standfirst () {
			return text(
				'Standfirst',
				data.standfirst,
				Groups.Content
			);
		},
		alternativeStandfirst () {
			return text(
				'Alternative standfirst',
				data.alternativeStandfirst,
				Groups.Content
			);
		},
		publishedDate () {
			return date(
				'Published date',
				new Date(data.publishedDate),
				Groups.Content,
			);
		},
		firstPublishedDate () {
			return date(
				'First published date',
				new Date(data.firstPublishedDate),
				Groups.Content
			);
		},
		premium () {
			return boolean(
				'Premium',
				data.premium,
				Groups.Content
			);
		}
	};

	const Meta = {
		conceptPrefix () {
			return text(
				'Display concept prefix',
				data.conceptPrefix,
				Groups.Meta
			);
		},
		conceptSuffix () {
			return text(
				'Display concept suffix',
				data.conceptSuffix,
				Groups.Meta
			);
		},
		concept () {
			return {
				url: data.concept.url,
				prefLabel: text(
					'Display concept',
					data.concept.prefLabel,
					Groups.Meta
				)
			};
		},
		alternativeConcept () {
			return {
				url: data.alternativeConcept.url,
				prefLabel: text(
					'Alternative display concept',
					data.alternativeConcept.prefLabel,
					Groups.Meta
				)
			};
		},
		promotedPrefix () {
			return text(
				'Promoted prefix',
				data.promotedPrefix,
				Groups.Meta
			);
		},
		promotedSuffix () {
			return text(
				'Promoted suffix',
				data.promotedSuffix,
				Groups.Meta
			);
		}
	};

	const Features = {
		showMeta () {
			return boolean('Show meta', true, Groups.Features);
		},
		showTitle () {
			return boolean('Show title', true, Groups.Features);
		},
		showStandfirst () {
			return boolean('Show standfirst', true, Groups.Features);
		},
		showStatus () {
			return boolean('Show status', true, Groups.Features);
		},
		showImage () {
			return boolean('Show image', true, Groups.Features);
		},
		showActions () {
			return boolean('Show actions', true, Groups.Features);
		},
		showHeadshot () {
			return boolean('Show headshot', false, Groups.Features);
		}
	};

	const FeatureOptions = {
		useAlternativeTitle () {
			return boolean('Use alternative title', false, Groups.Options);
		},
		useAlternativeStandfirst () {
			return boolean('Use alternative standfirst', false, Groups.Options);
		},
		useAlternativeConcept () {
			return boolean('Use alternative concept', false, Groups.Options);
		},
		useRelativeTime () {
			return boolean('Use relative time', false, Groups.Options);
		},
		imageSize () {
			return selectV2('Image size', ['XS', 'Small', 'Medium', 'Large', 'XL'], 'Small', Groups.Options);
		}
	};

	const VariantKnobs = {
		layout () {
			return selectV2('Layout', [
				'small',
				'large',
				'hero',
				'top-story'
			], 'small', Groups.Variants);
		},
		modifiers () {
			return selectV2('Modifiers', {
				// No support for optgroups or multiple selections
				'None': null,
				'Small stacked': 'stacked',
				'Small image on right': 'image-on-right',
				'Small live': 'live',
				'Large portrait': 'large-portrait',
				'Large landscape': 'large-landscape',
				'Large opinion': 'opinion-background',
				'Hero centre': 'centre',
				'Hero extra': 'extra-article',
				'Hero big video': 'big-video',
				'Top story landscape': 'landscape',
				'Top story big': 'big-story'
			}, 'None', Groups.Variants);
		}
	};

	return Object.assign({}, Content, Meta, VariantKnobs, Features, FeatureOptions);
};
