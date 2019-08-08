import appLinksConfig from './app-links';

export default function generateAppLinks(rssUrl) {
	const encodedRSSUrl = encodeURIComponent(rssUrl);
	return appLinksConfig.map(data => {
		return Object.assign({}, data , {
			url: data.template.replace(/{url}/, encodedRSSUrl)
		})
	});
}
