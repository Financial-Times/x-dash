function createMailtoLink (articleTitle, shareUrl) {
	const subject = encodeURIComponent(articleTitle);
	const body = encodeURIComponent(shareUrl);

	return `mailto:?subject=${subject}&body=${body}`;
}


function copyToClipboard (url) {
	const el = document.createElement('textarea');
	el.value = url;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
	//
	// const oldContentEditable = inputEl.contentEditable;
	// const oldReadOnly = inputEl.readOnly;
	// const range = document.createRange();
	//
	// inputEl.contenteditable = true;
	// inputEl.readonly = false;
	// inputEl.focus();
	// range.selectNodeContents(inputEl);
	//
	// const selection = window.getSelection();
	//
	// try {
	// 	selection.removeAllRanges();
	// 	selection.addRange(range);
	// 	inputEl.setSelectionRange(0, 999999);
	// } catch (err) {
	// 	inputEl.select(); // IE11 etc.
	// }
	// inputEl.contentEditable = oldContentEditable;
	// inputEl.readOnly = oldReadOnly;
	// document.execCommand('copy');
	// inputEl.blur();
}

module.exports = {
	createMailtoLink,
	copyToClipboard
}
