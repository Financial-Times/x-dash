import styles from './PodcastLaunchers.css';

export default function  copyToClipboard (event) {
	const url = event.target.dataset.url;
	const containerEl = event.target.parentElement;
	const rssLink = document.createElement('span');

	rssLink.classList.add(styles['rss-url__copy-span']);
	rssLink.appendChild(document.createTextNode(url));
	containerEl.appendChild(rssLink);

	const range = document.createRange();

	window.getSelection().removeAllRanges();
	range.selectNode(rssLink);
	window.getSelection().addRange(range);
	document.execCommand('copy');

	window.getSelection().removeAllRanges();
	containerEl.removeChild(rssLink);
}
