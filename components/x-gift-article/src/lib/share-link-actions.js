function createMailtoLink (articleTitle, shareUrl) {
	const subject = encodeURIComponent(articleTitle);
	const body = encodeURIComponent(shareUrl);

	return `mailto:?subject=${subject}&body=${body}`;
}


function copyToClipboard (copyText) {

	const selected =
	document.getSelection().rangeCount > 0          // Check if there is any content selected previously
		? document.getSelection().getRangeAt(0)       // Store selection if found
		: false;                                      // Mark as false to know no selection existed before

	const el = document.createElement('textarea');  // Create a <textarea> element
	el.value = copyText;                            // Set its value to the string that you want copied
	el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
	el.style.position = 'absolute';
	el.style.left = '-9999px';                      // Move outside the screen to make it invisible
	document.body.appendChild(el);                  // Append the <textarea> element to the HTML document

	el.select();                                    // Select the <textarea> content
	document.execCommand('copy');                   // Copy
	document.body.removeChild(el);                  // Remove the <textarea> element

	if (selected) {                                 // If a selection existed before copying
		document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
		document.getSelection().addRange(selected);   // Restore the original selection
	}

}

module.exports = {
	createMailtoLink,
	copyToClipboard
}
