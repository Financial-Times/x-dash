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
		RelatedLinks: 'Related Links',
		Indicators: 'Indicators',
		Context: 'Context',
		Variant: 'Variant'
	};

	const Meta = {
		showMeta() {
			return boolean('Show meta', data.showMeta, Groups.Meta);
		},
		metaPrefixText() {
			return text('Meta prefix text', data.metaPrefixText, Groups.Meta);
		},
		metaSuffixText() {
			return text('Meta suffix text', data.metaSuffixText, Groups.Meta);
		},
		metaLink() {
			return {
				url: data.metaLink.url,
				prefLabel: text('Meta link', data.metaLink.prefLabel, Groups.Meta)
			};
		},
		metaAltLink() {
			return {
				url: data.metaAltLink.url,
				prefLabel: text('Alt meta link', data.metaAltLink.prefLabel, Groups.Meta)
			};
		},
		promotedPrefixText() {
			return text('Promoted prefix text', data.promotedPrefixText, Groups.Meta);
		},
		promotedSuffixText() {
			return text('Promoted suffix text', data.promotedSuffixText, Groups.Meta);
		}
	};

	const Title = {
		showTitle() {
			return boolean('Show title', data.showTitle, Groups.Title);
		},
		title() {
			return text('Title', data.title, Groups.Title);
		},
		altTitle() {
			return text('Alt title', data.altTitle, Groups.Title);
		}
	};

	const Standfirst = {
		showStandfirst() {
			return boolean('Show standfirst', data.showStandfirst, Groups.Standfirst);
		},
		standfirst() {
			return text('Standfirst', data.standfirst, Groups.Standfirst);
		},
		altStandfirst() {
			return text('Alt standfirst', data.altStandfirst, Groups.Standfirst);
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
			return selectV2('Image size', ['XS', 'Small', 'Medium', 'Large', 'XL'], data.imageSize, Groups.Image);
		}
	};

	const RelatedLinks = {
		showRelatedLinks() {
			return boolean('Show related links', data.showRelatedLinks, Groups.RelatedLinks);
		},
		relatedLinks() {
			return object('Related links', data.relatedLinks, Groups.RelatedLinks);
		}
	};

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
				isScoop: boolean('Is scoop', data.indicators.isScoop, Groups.Indicators)
			};
		}
	};

	const Context = {
		headlineTesting() {
			return boolean('Headline testing', false, Groups.Context);
		},
		parentId() {
			return string('Parent ID', data.context.parentId, Groups.Context);
		},
		parentLabel() {
			return string('Parent Label', data.context.parentLabel, Groups.Context);
		}
	};

	const Variant = {
		layout() {
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

	return Object.assign({}, Meta, Title, Standfirst, Status, Video, Headshot, Image, RelatedLinks, Indicators, Context, Variant);
};
