import appLinksConfig from './config/app-links'

export default function generateAppLinks(rssUrl) {
	return appLinksConfig.map((data) => {
		const url = data.includeProtocol ? rssUrl : rssUrl.replace(/^https?:\/\//, '')

		return Object.assign({}, data, {
			url: data.template.replace(/{url}/, url)
		})
	})
}
