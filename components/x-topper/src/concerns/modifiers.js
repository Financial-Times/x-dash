const tagType = {
	BRAND: 'BRAND',
	TOPIC: 'TOPIC',
	GENRE: 'GENRE'
}

const imageType = {
	STANDARD: 'standard'
}

function setupInitialModel(m, props) {
	m.headline.show = !!props.headline
	m.headline.text = props.headline
	m.standfirst.show = !!props.standfirst
	m.standfirst.text = props.standfirst
	m.background.show = true
	m.tags.show = !!(props.prefixLink || props.mainLink)
	m.tags.entries = []

	if(props.prefixLink) {
		m.tags.entries.push(createTagFromConcept(props.prefixLink))
	}

	if(props.mainLink) {
		m.tags.entries.push(createTagFromConcept(props.mainLink))
	}

	if(props.leadImages && props.leadImages.length) {
		const standardLeadImage = getImageByType(imageType.STANDARD, props.leadImages)
		m.visual.show = true
		m.visual.image = asImageModel(standardLeadImage)
		m.visual.imageSources = getImagesNotOfType(imageType.STANDARD, props.leadImages).map(i => asPictureSourceModel(i))
		m.visual.credit.show = !!standardLeadImage.copyright
		m.visual.credit.text = standardLeadImage.copyright
	}

}

function setupBasicTheme(m) {
	m.wrapper.mods.colorPaper = true
}

function setupBasicLayout(m) {
	m.wrapper.mods.basic = true

}

function setupFullBleedImageLeftLayout(m) {
	m.wrapper.mods.fullBleedImageLeft = true
	m.headline.mods.large = true
}

function createTagFromConcept(concept) {
	return {
		id: concept.id,
		url: concept.url,
		text: concept.prefLabel,
		mods: {
			brand: concept.type === tagType.BRAND,
			topic: concept.type === tagType.TOPIC,
			genre: concept.type === tagType.GENRE
		}
	}
}

function getImageByType(type, images = []) {
	return images.find(img => img.type === type)
}

function getImagesNotOfType(type, images) {
	return images.filter(img => img.type !== type)
}

function asImageModel(image) {
	return {
		src: image.url,
		alt: image.title
	}
}

function asPictureSourceModel(image) {
	return {
		media: `(max-width: ${image.width}px)`,
		srcSet: image.url
	}
}

function iff(condition, callback) { // TODO: Dont use this. Remove it
	return (...args) => condition(...args) ? callback(...args) : () => {}
}

function iisProp(key, value) { // TODO: Dont use this. Remove it
	return (model, props) => props[key] === value
}

export const modifiers = [
    setupInitialModel,
    // TODO: Use const for names
    iff(iisProp('theme', 'basic'), setupBasicTheme),
    iff(iisProp('layout', 'basic'), setupBasicLayout),
    iff(iisProp('layout', 'full-bleed-image-left'), setupFullBleedImageLeftLayout)
]
