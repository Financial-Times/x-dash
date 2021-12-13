export default class EnterpriseApiClient {
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

	async getEnterpriseArticleAllowance() {
		try {
			const json = await this.fetchJson('/allowance')

			return {
				limit: json.limit,
				hasCredits: json.hasCredits
			}
		} catch (e) {
			return { limit: null, hasCredits: false }
		}
	}
}
