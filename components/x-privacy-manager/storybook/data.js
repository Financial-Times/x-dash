const CONSENT_API = 'https://mock-consent.ft.com'

const defaults = {
	userId: 'fakeUserId',
	consent: true,
	legislationId: 'ccpa',
	referrer: 'ft.com',
	fow: {
		id: 'privacyCCPA',
		version: 'H0IeyQBalorD.6nTqqzhNTKECSgOPJCG'
	},
	consentSource: 'next-control-centre',
	consentProxyApiHost: CONSENT_API,
	buttonText: {
		allow: {
			label: 'Allow',
			text: 'See personalised adverts'
		},
		block: {
			label: 'Block',
			text: 'Opt out of personalised adverts'
		},
		submit: {
			label: 'Save'
		}
	}
}

const getFetchMock = (status = 200, options = {}) => (fetchMock) => {
	fetchMock.mock('https://mock-consent.ft.com/__consent/consent-record/FTPINK/fakeUserId', status, {
		delay: 1000,
		...options
	})
}

module.exports = {
	CONSENT_API,
	defaults,
	getFetchMock
}
