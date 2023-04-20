/**
 * @typedef {import('../typings/x-privacy-manager').SendConsentProps} SendConsentProps
 * @typedef {import('../typings/x-privacy-manager').SendConsentResponse} SendConsentResponse
 */

import { withActions } from '@financial-times/x-interaction'
import { getPayload } from './utils'

function onConsentChange(consent) {
	return () => ({ consent })
}

/**
 * Save the users choice via the ConsentProxy
 * - consentSource: (e.g. 'next-control-centre')
 * - cookieDomain: (e.g. '.thebanker.com')
 *
 * @param {SendConsentProps} props
 * @returns {SendConsentResponse}
 */
function sendConsent({ setConsentCookie, consentApiUrl, onConsentSaved, consentSource, cookieDomain, fow }) {
	let res

	return async ({ isLoading, consent }) => {
		if (isLoading) return

		/**
		 * FoW will be undefined if a user is anonymous (i.e. not logged in)
		 * In this case there is no need to send anything to the ConsentProxy
		 */
		if (typeof fow === 'undefined') {
			return onConsentSaved({ consent })
		}

		const payload = getPayload({ fow, consent, consentSource, setConsentCookie })

		if (cookieDomain) {
			// Optionally specify the domain for the cookie to set on the Consent API
			payload.cookieDomain = cookieDomain
		}

		try {
			res = await fetch(consentApiUrl, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			})

			if (res.ok === false) {
				throw new Error(res.statusText || String(res.status))
			}

			return onConsentSaved({ consent, payload })
		} catch (err) {
			return onConsentSaved({ consent, payload, err, ok: false })
		}
	}
}

export const withCustomActions = withActions(() => ({
	onConsentChange,
	sendConsent
}))
