/**
 * @typedef {import("../typings/x-privacy-manager").TrackingKey} TrackingKey
 * @typedef {import("../typings/x-privacy-manager").TrackingKeys} TrackingKeys
 */

export const trackingKeys = /** @type {const} */ [
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
 * @returns {TrackingKeys}
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
 * @param {Object} props
 * @param {string} props.userId
 * @param {string} props.consentProxyApiHost
 * @param {boolean} [props.cookiesOnly]
 * @param {string} [props.cookieDomain]
 *
 * @returns {ConsentProxyEndpoint}
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

/**
 *
 * @param {Object} props
 * @param {FoWConfig} props.fow
 * @param {boolean} props.consent
 * @param {string} props.consentSource
 * @param {boolean} props.setConsentCookie
 * @returns
 */
export function getPayload({ fow, consent, consentSource, setConsentCookie }) {
	const categoryPayload = {
		onsite: {
			status: consent,
			lbi: true,
			source: consentSource,
			fow: `${fow.id}/${fow.version}`
		}
	}

	return {
		setConsentCookie,
		formOfWordsId: fow.id,
		consentSource,
		data: {
			behaviouralAds: categoryPayload,
			demographicAds: categoryPayload,
			programmaticAds: categoryPayload
		}
	}
}

/**
 * On response call any externally defined handlers following Node's convention:
 * 1. Either an error object or `null` as the first argument
 * 2. An object containing `consent` and `payload` as the second
 * Allows callbacks to decide how to handle a failure scenario
 *
 * @param {ConsentSavedCallback[]} onConsentSavedCallbacks
 */
export function onConsentSavedFn(onConsentSavedCallbacks) {
	return function onConsentSaved({ consent, payload = null, err = null, ok = true }) {
		for (const fn of onConsentSavedCallbacks) {
			fn(err, { consent, payload })
		}

		return { _response: { ok } }
	}
}
