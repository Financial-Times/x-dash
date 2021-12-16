export default class EnterpriseApiClient {
	constructor(baseUrl) {
		this.baseUrl = baseUrl
	}

	/**
	 * Concatenates protocol, domain and path URLs.
	 * @param {string} path URL Path
	 * @returns {string} Fetch URL
	 * @throws {Error} if baseURL is empty
	 */
	getFetchUrl(path) {
		if (!this.baseUrl) {
			throw new Error('Enterprise Sharing API base url missing')
		}

		return `${this.baseUrl}${path}`
	}

	/**
	 * Makes a fetch request to the path with additional options
	 * @param {string} path URL path
	 * @param {RequestInit} additionalOptions fetch additional options
	 * @returns {Promise<object>} A promise that resolves to the requested URL response parsed from json
	 */
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

	/**
	 * @typedef EnterpriseSharingAllowance
	 * @type {object}
	 * @property {number | null} limit - number of views per share for the user's licence, null if licence doesn't have a ES package
	 * @property {boolean} hasCredits - true if user's licence has ES credits
	 * @property {boolean} firstTimeUser - true if user hasn't created an ES link before
	 * @property {boolean} enabled - true if enterprise sharing is enabled for this user
	 * @property {boolean} requestAccess - true if user should see the request access journey
	 */

	/**
	 * Retrieves the Enterprise Sharing allowance for an user
	 * @returns {EnterpriseSharingAllowance} the Enterprise Sharing allowance for an user
	 */
	async getEnterpriseArticleAllowance() {
		try {
			const json = await this.fetchJson('/allowance')

			return {
				limit: json.limit,
				hasCredits: json.hasCredits,
				firstTimeUser: json.firstTimeUser,
				enabled: json.enabled,
				requestAccess: json.enabled && json.limit === null
			}
		} catch (e) {
			return { enabled: false, limit: null, hasCredits: false, firstTimeUser: false, requestAccess: false }
		}
	}

	/**
	 * Generates an enterprise sharing redeem link for the contentId
	 * @param {string} contentId Article ID
	 * @returns {string} enterprise sharing redeem link URL
	 */
	async getESUrl(contentId) {
		const json = await this.fetchJson('/', { method: 'POST', body: JSON.stringify({ contentId }) })

		return {
			redemptionUrl: json.url
		}
	}
}
