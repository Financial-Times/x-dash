import { HIGHLIGHTS_BASE_URL } from './constants'

export default class HighlightsApiClient {
	constructor(baseUrl = HIGHLIGHTS_BASE_URL) {
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
			throw new Error('User Annotations API base url missing')
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

		if (!response.ok) {
			throw new Error(`failed to fetch ${url}, received ${response.status}`)
		}

		const responseJSON = await response.json()
		return responseJSON
	}

	async copySharedHighlights(highlightsToken) {
		try {
			const json = await this.fetchJson('/copy-annotations', {
				method: 'POST',
				body: JSON.stringify({ highlightsToken })
			})

			return {
				annotationsCopyResult: json.annotationsCopyResult
			}
		} catch (error) {
			return { annotationsCopyResult: undefined }
		}
	}

	async shareHighlights(articleId, includeHighlights = false) {
		try {
			if (!includeHighlights) {
				return {}
			}

			return await this.fetchJson('/create-token', {
				method: 'POST',
				body: JSON.stringify({ articleId })
			})
		} catch (error) {
			return {}
		}
	}
}
