/** @type {XPrivacyManager.TrackingKey[]} */
const trackingKeys = [
	'advertising-toggle-block',
	'advertising-toggle-allow',
	'consent-allow',
	'consent-block'
]

/**
 * Create a look-up table legislationId-specific tracking event names
 * e.g. { 'advertising-toggle-block': 'gdpr-advertising-toggle-block' }
 *
 * @param {string} legislationId
 *
 * @returns {XPrivacyManager.TrackingKeys}
 */
export function getTrackingKeys(legislationId) {
	/** @type Record<TrackingKey, string> */
	const dict = {}
	for (const key of trackingKeys) {
		dict[key] = `${legislationId}-${key}`
	}

	return dict
}

/**
 * @param {{
 *   userId: string;
 *   consentProxyApiHost: string;
 *   cookiesOnly?: boolean;
 *   cookieDomain?: string;
 * }} param
 *
 * @returns {XPrivacyManager.ConsentProxyEndpoint}
 */
export function getConsentProxyEndpoints({
	userId,
	consentProxyApiHost,
	cookiesOnly = false,
	cookieDomain = ''
}) {
	if (cookieDomain.length > 0) {
		// Override the domain so that set-cookie headers in consent api responses are respected
		consentProxyApiHost = consentProxyApiHost.replace('.ft.com', cookieDomain)
	}

	const endpointDefault = `${consentProxyApiHost}/__consent/consent-record-cookie`

	if (userId && !cookiesOnly) {
		const endpointCore = `${consentProxyApiHost}/__consent/consent-record/FTPINK/${userId}`
		const endpointEnhanced = `${consentProxyApiHost}/__consent/consent/FTPINK/${userId}`

		return {
			core: endpointCore,
			enhanced: endpointEnhanced,
			createOrUpdateRecord: endpointCore
		}
	}

	return {
		core: endpointDefault,
		enhanced: endpointDefault,
		createOrUpdateRecord: endpointDefault
	}
}
