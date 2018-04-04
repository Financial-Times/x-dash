// To ensure that component stories do not need to depend on Storybook themselves we return a
// function that may be passed the required dependencies.
module.exports = (data, { object, text, number, boolean, date, selectV2 }) => {
	const Groups = {
		Meta: 'Meta',
		Title: 'Title',
		Standfirst: 'Standfirst',
		Status: 'Status',
		Video: 'Video',
		Headshot: 'Headshot',
		Image: 'Image',
		Related: 'Related',
		Indicators: 'Indicators',
		Variant: 'Variant'
	};

	const Meta = {
		showMeta() {
			return boolean('Show meta', data.showMeta, Groups.Meta);
		},
		conceptPrefix() {
			return text('Display concept prefix', data.conceptPrefix, Groups.Meta);
		},
		conceptSuffix() {
			return text('Display concept suffix', data.conceptSuffix, Groups.Meta);
		},
		concept() {
			return {
				url: data.concept.url,
				prefLabel: text('Display concept', data.concept.prefLabel, Groups.Meta)
			};
		},
		alternativeConcept() {
			return {
				url: data.alternativeConcept.url,
				prefLabel: text('Alternative display concept', data.alternativeConcept.prefLabel, Groups.Meta)
			};
		},
		useAlternativeConcept() {
			return boolean('Use alternative concept', false, Groups.Meta);
		},
		promotedPrefix() {
			return text('Promoted prefix', data.promotedPrefix, Groups.Meta);
		},
		promotedSuffix() {
			return text('Promoted suffix', data.promotedSuffix, Groups.Meta);
		}
	};

	const Title = {
		showTitle() {
			return boolean('Show title', data.showTitle, Groups.Title);
		},
		title() {
			return text('Title', data.title, Groups.Title);
		},
		alternativeTitle() {
			return text('Alternative title', data.alternativeTitle, Groups.Title);
		},
		useAlternativeTitle() {
			return boolean('Use alternative title', false, Groups.Title);
		}
	};

	const Standfirst = {
		showStandfirst() {
			return boolean('Show standfirst', data.showStandfirst, Groups.Standfirst);
		},
		standfirst() {
			return text('Standfirst', data.standfirst, Groups.Standfirst);
		},
		alternativeStandfirst() {
			return text('Alternative standfirst', data.alternativeStandfirst, Groups.Standfirst);
		},
		useAlternativeStandfirst() {
			return boolean('Use alternative standfirst', false, Groups.Standfirst);
		}
	};

	const Status = {
		showStatus() {
			return boolean('Show status', data.showStatus, Groups.Status);
		},
		publishedDate() {
			return date('Published date', new Date(data.publishedDate), Groups.Status);
		},
		firstPublishedDate() {
			return date('First published date', new Date(data.firstPublishedDate), Groups.Status);
		},
		useRelativeTime() {
			return boolean('Use relative time', false, Groups.Status);
		},
		status() {
			return selectV2(
				'Live blog status',
				{
					None: '',
					'Coming soon': 'comingsoon',
					'In progress': 'inprogress',
					Closed: 'closed'
				},
				'',
				Groups.Status
			);
		}
	};

	const Video = {
		showVideo() {
			return boolean('Show video', data.showVideo, Groups.Video);
		},
		video() {
			return {
				url: text('Video URL', data.video.url, Groups.Video),
				width: number('Video width', data.video.width, {}, Groups.Video),
				height: number('Video height', data.video.height, {}, Groups.Video)
			};
		}
	};

	const Headshot = {
		showHeadshot() {
			return boolean('Show headshot', data.showHeadshot, Groups.Headshot);
		},
		headshot() {
			return {
				url: text('Headshot URL', data.headshot.url, Groups.Headshot),
				width: number('Headshot width', data.headshot.width, {}, Groups.Headshot),
				height: number('Headshot height', data.headshot.height, {}, Groups.Headshot)
			};
		},
		headshotTint() {
			return selectV2('Headshot tint', { 'Default': '' }, 'Default', Groups.Headshot);
		}
	};

	const Image = {
		showImage() {
			return boolean('Show image', data.showImage, Groups.Image);
		},
		image() {
			return {
				url: text('Image URL', data.image.url, Groups.Image),
				width: number('Image width', data.image.width, {}, Groups.Image),
				height: number('Image height', data.image.height, {}, Groups.Image)
			};
		},
		imageSize() {
			return selectV2('Image size', ['XS', 'Small', 'Medium', 'Large', 'XL'], 'Small', Groups.Image);
		}
	};

	const Related = {
		showRelated() {
			return boolean('Show related links', data.showRelated, Groups.Related);
		},
		related() {
			return object('Related links', data.related, Groups.Related);
		}
	};

	// const Features = {
	// 	showActions() {
	// 		return boolean('Show actions', true, Groups.Features);
	// 	}
	// };

	const Indicators = {
		indicators() {
			return {
				canBeDistributed: selectV2('Can be distributed', ['yes', 'no', 'verify'], data.indicators.canBeDistributed || 'yes', Groups.Indicators),
				canBeSyndicated: selectV2('Can be syndicated', ['yes', 'no', 'verify'], data.indicators.canBeSyndicated || 'yes', Groups.Indicators),
				accessLevel: selectV2('Access level', ['free', 'registered', 'subscribed', 'premium'], data.indicators.accessLevel || 'free', Groups.Indicators),
				isOpinion: boolean('Is opinion', data.indicators.isOpinion, Groups.Indicators),
				isColumn: boolean('Is column', data.indicators.isColumn, Groups.Indicators),
				isEditorsChoice: boolean('Is editor\'s choice', data.indicators.isEditorsChoice, Groups.Indicators),
				isExclusive: boolean('Is exclusive', data.indicators.isExclusive, Groups.Indicators),
				isScoop: boolean('Is scoop', data.indicators.isScoop, Groups.Indicators),
				isLive: boolean('Is live', data.indicators.isLive, Groups.Indicators),
			};
		}
	};

	const Variant = {
		layout() {
			console.log(data)
			return selectV2('Layout', ['small', 'large', 'hero', 'top-story'], data.layout, Groups.Variant);
		},
		modifiers() {
			return selectV2(
				'Modifiers',
				{
					// Currently no support for optgroups or multiple selections
					'None': '',
					'Small stacked': 'stacked',
					'Small image on right': 'image-on-right',
					'Large portrait': 'large-portrait',
					'Large landscape': 'large-landscape',
					'Hero centre': 'centre',
					'Hero image': 'hero-image',
					'Top story landscape': 'landscape',
					'Top story big': 'big-story'
				},
				data.modifiers || '',
				Groups.Variant
			);
		}
	};

	return Object.assign({}, Meta, Title, Standfirst, Status, Video, Headshot, Image, Related, Indicators, Variant);
};
