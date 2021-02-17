function dispatchEvent(detail) {
	const event = new CustomEvent('oTracking.event', {
		detail,
		bubbles: true
	})

	document.body.dispatchEvent(event)
}

module.exports = {
	createAdvancedSharingLink: (link, longUrl) =>
		dispatchEvent({
			category: 'advanced-sharing',
			action: 'create',
			linkType: 'advancedSharingLink',
			link,
			longUrl
		}),

	copyLink: (linkType, link) =>
		dispatchEvent({
			category: 'advanced-sharing',
			action: 'copy',
			linkType,
			link
		}),

	emailLink: (linkType, link) =>
		dispatchEvent({
			category: 'advanced-sharing',
			action: 'mailto',
			linkType,
			link
		})
}
