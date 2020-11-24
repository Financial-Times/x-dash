export const CONSENT_PROXY_HOST = 'https://consent.ft.com'
export const CONSENT_PROXY_ENDPOINT = 'https://consent.ft.com/__consent/consent-record/FTPINK/abcde'

export const buildPayload = (consent) => ({
	consentSource: 'consuming-app',
	data: {
		behaviouralAds: {
			onsite: {
				fow: 'privacyCCPA/H0IeyQBalorD.6nTqqzhNTKECSgOPJCG',
				lbi: true,
				source: 'consuming-app',
				status: consent
			}
		},
		demographicAds: {
			onsite: {
				fow: 'privacyCCPA/H0IeyQBalorD.6nTqqzhNTKECSgOPJCG',
				lbi: true,
				source: 'consuming-app',
				status: consent
			}
		},
		programmaticAds: {
			onsite: {
				fow: 'privacyCCPA/H0IeyQBalorD.6nTqqzhNTKECSgOPJCG',
				lbi: true,
				source: 'consuming-app',
				status: consent
			}
		}
	},
	cookieDomain: '.ft.com',
	formOfWordsId: 'privacyCCPA'
})

export function checkPayload(opts, expected) {
	const consents = JSON.parse(String(opts.body)).data

	let worked = true
	for (const category in consents) {
		worked = worked && consents[category].onsite.status === expected
	}
	return worked
}

export const defaultProps = {
	userId: 'abcde',
	legislationId: 'ccpa',
	consentProxyApiHost: CONSENT_PROXY_HOST,
	consentSource: 'consuming-app',
	referrer: 'www.ft.com',
	cookieDomain: '.ft.com',
	fow: {
		id: 'privacyCCPA',
		version: 'H0IeyQBalorD.6nTqqzhNTKECSgOPJCG'
	},
	actions: {
		onConsentChange: jest.fn(() => {}),
		sendConsent: jest.fn().mockReturnValue({ _response: { ok: undefined } })
	}
}
