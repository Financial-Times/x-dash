export default (articleTitle, shareUrl) => {
	const subject = encodeURIComponent(articleTitle);
	const body = encodeURIComponent(shareUrl);

	return `mailto:?subject=${subject}&body=${body}`;
}
