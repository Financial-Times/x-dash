function dispatchEvent(detail) {
	const event = new CustomEvent('oTracking.event', {
		detail,
		bubbles: true
	})

	document.body.dispatchEvent(event)
}

module.exports = {
	createGiftLink: (link, longUrl) =>
		dispatchEvent({
			category: 'gift-link',
			action: 'create',
			linkType: 'giftLink',
			link,
			longUrl
		}),

	createESLink: (link) =>
		dispatchEvent({
			category: 'gift-link',
			action: 'create',
			linkType: 'enterpriseLink',
			link
		}),

	initEnterpriseSharing: (status) =>
		dispatchEvent({
			category: 'gift-link',
			action: 'open',
			status
		}),

	copyLink: (linkType, link) =>
		dispatchEvent({
			category: 'gift-link',
			action: 'copy',
			linkType,
			link
		}),

	emailLink: (linkType, link) =>
		dispatchEvent({
			category: 'gift-link',
			action: 'mailto',
			linkType,
			link
		})
}
