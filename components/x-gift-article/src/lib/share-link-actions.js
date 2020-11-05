function createMailtoUrl(articleTitle, shareUrl) {
	const subject = encodeURIComponent(articleTitle)
	const body = encodeURIComponent(shareUrl)

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
