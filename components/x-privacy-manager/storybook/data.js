const CONSENT_API = 'https://mock-consent.ft.com'

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
	Default: ''
}

const defaultArgs = {
	userId: 'fakeUserId',
	legislationId: 'ccpa',
	consent: true,
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

const defaultArgTypes = {
	userId: {
		name: 'Authentication',
		control: { type: 'select', options: { loggedIn: defaultArgs.userId, loggedOut: undefined } }
	},
	referrer: { control: { type: 'select', options: referrers } },
	consent: { control: { type: 'boolean' }, name: 'consent' }
}

const fetchMock = (status = 200, options = {}) => (fetchMock) => {
	fetchMock.mock('https://mock-consent.ft.com/__consent/consent-record/FTPINK/fakeUserId', status, {
		delay: 1000,
		...options
	})
}

module.exports = {
	CONSENT_API,
	defaultArgs,
	defaultArgTypes,
	fetchMock
}
