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

export const defaultProps = {
	userId: 'abcde',
	legislationId: 'ccpa',
	consentSource: 'consuming-app',
	consentProxyApiHost: CONSENT_PROXY_HOST,
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
