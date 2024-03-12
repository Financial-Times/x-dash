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
	async fetchJson(path, additionalOptions) {
		const url = this.getFetchUrl(path)
		const options = Object.assign(
			{
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			},
			additionalOptions
		)

		const response = await fetch(url, options)
		if (response.status === 403) {
			// If ES API response code is 403 - User is B2B without access and should see the request access page
			throw new Error('ShowRequestAccess')
		}
		if (response.status === 404) {
			const body = await response.json()
			// If ES API response code is 404 - User is not B2c and should not see anything about ES
			throw new Error(body.message.includes('b2c') ? 'UserIsB2C' : 'UserIsRegistered')
		}
		const responseJSON = await response.json()
		return responseJSON
	}

	/**
	 * @typedef EnterpriseSharingAllowance
	 * @type {object}
	 * @property {number} limit - number of views per share for the user's licence, null if licence doesn't have a ES package
	 * @property {boolean} hasCredits - true if user's licence has ES credits
	 * @property {boolean} enabled - true if enterprise sharing is enabled for this user
	 * @property {boolean} requestAccess - true if user should see the request access journey
	 */

	/**
	 * Retrieves the Enterprise Sharing allowance for an user
	 * @returns {Promise<EnterpriseSharingAllowance>} the Enterprise Sharing allowance for an user
	 */
	async getEnterpriseArticleAllowance() {
		try {
			const json = await this.fetchJson('/v1/users/me/allowance')

			return {
				limit: json.limit,
				hasCredits: json.hasCredits,
				budget: json.budget ?? 0,
				enabled: true,
				requestAccess: false,
				isRegisteredUser: false
			}
		} catch (e) {
			if (e?.message === 'ShowRequestAccess') {
				// limit = 100 is the default value used for marketing ES ("share with up to 100 people")
				return {
					enabled: true,
					limit: 100,
					hasCredits: false,
					requestAccess: true,
					budget: 0,
					isRegisteredUser: false
				}
			}
			return {
				enabled: false,
				limit: 0,
				hasCredits: false,
				requestAccess: false,
				budget: 0,
				isRegisteredUser: e?.message === 'UserIsRegistered'
			}
		}
	}

	/**
	 * Generates an enterprise sharing redeem link for the contentId
	 * @param {string} contentId Article ID
	 * @param {boolean} [includeHighlights] should include the user highlights in the share link
	 * @returns {Promise<{ redeemLimit: number, redemptionUrl: string }>} object with enterprise sharing redeem link URL and limit
	 */
	async getESUrl(contentId, includeHighlights = false) {
		try {
			const json = await this.fetchJson('/v1/shares', {
				method: 'POST',
				body: JSON.stringify({ contentId, includeHighlights })
			})

			return {
				redemptionUrl: json.url,
				redemptionLimit: json.redeemLimit
			}
		} catch (e) {
			return { redemptionUrl: undefined, redemptionLimit: undefined }
		}
	}
}
