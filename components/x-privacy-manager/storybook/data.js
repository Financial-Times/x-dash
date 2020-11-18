const CONSENT_API = 'https://consent.ft.com'

const referrers = {
	'ft.com': 'www.ft.com',
	'exec-appointments.com': 'www.exec-appointments.com',
	'fdibenchmark.com': 'www.fdibenchmark.com',
	'fdiintelligence.com': 'www.fdiintelligence.com',
	'fdimarkets.com': 'www.fdimarkets.com',
	'fdireports.com': 'www.fdireports.com',
	'ftadviser.com': 'www.ftadviser.com',
	'ftconfidentialresearch.com': 'www.ftconfidentialresearch.com',
	'globalriskregulator.com': 'www.globalriskregulator.com',
	'investorschronicle.co.uk': 'www.investorschronicle.co.uk',
	'non-execs.com': 'www.non-execs.com',
	'pensions-expert.com': 'www.pensions-expert.com',
	'pwmnet.com': 'www.pwmnet.com',
	'thebanker.com': 'www.thebanker.com',
	'thebankerdatabase.com': 'www.thebankerdatabase.com',
	Undefined: ''
}

const legislation = {
	CCPA: ['ccpa', 'gdpr']
}

const defaultArgs = {
	userId: 'fakeUserId',
	consent: undefined,
	legislation: 'ccpa',
	referrer: 'www.ft.com',
	consentProxyEndpoints: {
		core: CONSENT_API,
		enhanced: CONSENT_API,
		createOrUpdateRecord: CONSENT_API
	}
}

const defaultArgTypes = {
	userId: {
		name: 'Authentication',
		control: { type: 'select', options: { loggedIn: defaultArgs.userId, loggedOut: undefined } }
	},
	legislation: { control: { type: 'select', options: legislation['CCPA'] } },
	referrer: { control: { type: 'select', options: referrers } },
	consent: { control: { type: 'boolean' }, name: 'consent' }
}

const getFetchMock = (status = 200, options = {}) => (fetchMock) => {
	fetchMock.mock(CONSENT_API, status, {
		delay: 1000,
		...options
	})
}

module.exports = {
	CONSENT_API,
	defaultArgs,
	defaultArgTypes,
	getFetchMock
}
