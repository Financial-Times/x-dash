export default class ApiClient {
	constructor({ protocol, domain } = {}) {
		this.protocol = protocol
		this.domain = domain
	}

	getFetchUrl(path) {
		let base = ''
		if (this.domain) {
			base = `//${this.domain}`

			if (this.protocol) {
				base = `${this.protocol}:${base}`
			}
		}

		return `${base}${path}`
	}

	fetchJson(path, additionalOptions) {
		const url = this.getFetchUrl(path)
		const options = Object.assign(
			{
				credentials: 'include'
			},
			additionalOptions
		)

		return fetch(url, options).then((response) => response.json())
	}

	async getGiftArticleAllowance() {
		try {
			const json = await this.fetchJson('/article/gift-credits')

			return {
				monthlyAllowance: json.allowance,
				giftCredits: json.remainingCredits,
				nextRenewalDate: json.renewalDate
			}
		} catch (e) {
			return { monthlyAllowance: undefined, giftCredits: undefined, nextRenewalDate: undefined }
		}
	}

	async getGiftUrl(articleId) {
		try {
			const json = await this.fetchJson('/article/gift-link/' + encodeURIComponent(articleId))

			if (json.errors) {
				throw new Error(`Failed to get gift article link: ${json.errors.join(', ')}`)
			}

			return {
				...json
			}
		} catch (e) {
			return { redemptionUrl: undefined, redemptionLimit: undefined }
		}
	}

	async getShorterUrl(originalUrl) {
		let url = originalUrl
		let isShortened = false

		try {
			const json = await this.fetchJson('/article/shorten-url/' + encodeURIComponent(originalUrl))

			if (json.shortenedUrl) {
				isShortened = true
				url = json.shortenedUrl
			}
		} catch (e) {
			// do nothing because it just returns original url at the end
		}

		return { url, isShortened }
	}
}
