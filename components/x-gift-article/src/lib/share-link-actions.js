function getGreeting() {
	const hours = new Date().getHours()
	// Determine the appropriate greeting based on the current hour
	if (hours < 12) {
		return 'Good morning'
	}

	if (hours >= 12 && hours <= 17) {
		return 'Good afternoon'
	}

	return 'Good evening'
}

function createMailtoUrl(articleTitle, shareUrl) {
	const subject = 'Read this article from the Financial Times'
	const greeting = getGreeting()
	const body = encodeURIComponent(
		`${greeting},\n\nI read this article from the Financial Times and thought it would interest you.\n\n${articleTitle}\n${shareUrl}\n\nBest wishes,`
	)

	return `mailto:?subject=${subject}&body=${body}`
}

function copyToClipboard(event) {
	const urlSection = event.target.closest('.js-gift-article__url-section')
	const inputEl = urlSection.querySelector('input')
	const oldContentEditable = inputEl.contentEditable
	const oldReadOnly = inputEl.readOnly
	const range = document.createRange()

	inputEl.contenteditable = true
	inputEl.readonly = false
	inputEl.focus()
	range.selectNodeContents(inputEl)

	const selection = window.getSelection()

	try {
		selection.removeAllRanges()
		selection.addRange(range)
		inputEl.setSelectionRange(0, 999999)
	} catch (err) {
		inputEl.select() // IE11 etc.
	}
	inputEl.contentEditable = oldContentEditable
	inputEl.readOnly = oldReadOnly
	document.execCommand('copy')
	inputEl.blur()
}

module.exports = {
	createMailtoUrl,
	copyToClipboard
}
