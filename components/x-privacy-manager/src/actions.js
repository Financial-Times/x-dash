import { withActions } from '@financial-times/x-interaction'

function onConsentChange(consent) {
	return () => ({ consent })
}

/**
 * Save the users choice via the ConsentProxy
 * - consentSource: (e.g. 'next-control-centre')
 * - cookieDomain: (e.g. '.thebanker.com')
 *
 * @param {XPrivacyManager.SendConsentProps} args
 * @returns {({ isLoading, consent }: { isLoading: boolean, consent: boolean }) => Promise<{_response: _Response}>}
 */
function sendConsent({
	setConsentCookie,
	consentApiUrl,
	onConsentSavedCallbacks,
	consentSource,
	cookieDomain,
	fow
}) {
	let res

	return async ({ isLoading, consent }) => {
		if (isLoading) return

		const categoryPayload = {
			onsite: {
				status: consent,
				lbi: true,
				source: consentSource,
				fow: `${fow.id}/${fow.version}`
			}
		}

		const payload = {
			setConsentCookie,
			formOfWordsId: fow.id,
			consentSource,
			data: {
				behaviouralAds: categoryPayload,
				demographicAds: categoryPayload,
				programmaticAds: categoryPayload
			}
		}

		if (cookieDomain) {
			// Optionally specify the domain for the cookie to set on the Consent API
			payload.cookieDomain = cookieDomain
		}

		try {
			res = await fetch(consentApiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload),
				credentials: 'include'
			})

			// On response call any externally defined handlers following Node's convention:
			// 1. Either an error object or `null` as the first argument
			// 2. An object containing `consent` and `payload` as the second
			// Allows callbacks to decide how to handle a failure scenario

			if (res.ok === false) {
				throw new Error(res.statusText || String(res.status))
			}

			for (const fn of onConsentSavedCallbacks) {
				fn(null, { consent, payload })
			}

			return { _response: { ok: true } }
		} catch (err) {
			for (const fn of onConsentSavedCallbacks) {
				fn(err, { consent, payload })
			}

			return { _response: { ok: false } }
		}
	}
}

export const withCustomActions = withActions(() => ({
	onConsentChange,
	sendConsent
}))
