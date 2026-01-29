import { Layouts } from './constants'

const Small = {
	layout: Layouts.Small,
	useRelativeTime: true,
	showMeta: true,
	showTitle: true,
	showPremiumLabel: true,
	showExclusiveLabel: false,
	showStatus: true,
	showByline: true,
	showBylineHeadshot: true
}

const SmallHeavy = {
	layout: Layouts.Small,
	useRelativeTime: true,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showPremiumLabel: true,
	showExclusiveLabel: false,
	showStatus: true,
	showByline: true,
	showBylineHeadshot: true,
	showImage: true,
	imageSize: 'Small'
}

const Large = {
	layout: Layouts.Large,
	useRelativeTime: true,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showPremiumLabel: true,
	showExclusiveLabel: false,
	showStatus: true,
	showByline: true,
	showBylineHeadshot: true,
	showImage: true,
	imageSize: 'Medium'
}

const Hero = {
	layout: Layouts.Hero,
	useRelativeTime: true,
	showMeta: true,
	showTitle: true,
	showPremiumLabel: true,
	showExclusiveLabel: false,
	showStatus: true,
	showByline: true,
	showBylineHeadshot: true,
	showImage: true,
	imageSize: 'Medium'
}

const HeroNarrow = {
	layout: Layouts.Hero,
	useRelativeTime: true,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showPremiumLabel: true,
	showExclusiveLabel: false,
	showStatus: true,
	showByline: true,
	showBylineHeadshot: true
}

const HeroVideo = {
	layout: Layouts.Hero,
	useRelativeTime: true,
	showMeta: true,
	showTitle: true,
	showVideo: true,
	showByline: true,
	showBylineHeadshot: true,
	imageSize: 'Large'
}

const HeroOverlay = {
	layout: Layouts.Hero,
	useRelativeTime: true,
	showMeta: true,
	showTitle: true,
	showPremiumLabel: true,
	showExclusiveLabel: false,
	showStatus: true,
	showByline: true,
	showBylineHeadshot: true,
	showImage: true,
	imageSize: 'XL',
	modifiers: ['hero-image']
}

const TopStory = {
	layout: Layouts.TopStory,
	useRelativeTime: true,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showPremiumLabel: true,
	showExclusiveLabel: false,
	showStatus: true,
	showByline: true,
	showBylineHeadshot: true,
	showRelatedLinks: true
}

const TopStoryLandscape = {
	layout: Layouts.TopStory,
	useRelativeTime: true,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showPremiumLabel: true,
	showExclusiveLabel: false,
	showStatus: true,
	showByline: true,
	showBylineHeadshot: true,
	showImage: true,
	imageSize: 'XL',
	showRelatedLinks: true,
	modifiers: ['landscape']
}

export default {
	Small,
	SmallHeavy,
	Large,
	Hero,
	HeroNarrow,
	HeroVideo,
	HeroOverlay,
	TopStory,
	TopStoryLandscape
}
