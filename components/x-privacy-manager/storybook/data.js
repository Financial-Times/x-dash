import fetchMock from 'fetch-mock'

export const CONSENT_API = 'https://mock-consent.ft.com'

const legislations = ['gdpr', 'ccpa']

export const redirectUrls = {
	'FT.com': 'https://www.ft.com',
	'FT.com: article': 'https://www.ft.com/content/6d2655e2-7c7d-4bbc-91af-035b1a074fb1',
	Specialist: 'https://www.exec-appointments.com',
	'Specialist: article':
		'https://www.exec-appointments.com/job/1632533/director-loans-and-social-development-directorate/?LinkSource=PremiumListing',
	Empty: '',
	None: undefined
}

export const defaultArgs = {
	userId: 'fakeUserId',
	legislationId: 'ccpa',
	redirectUrl: redirectUrls['FT.com'],
	loginUrl: 'https://www.ft.com/login?location=/',
	fow: {
		id: 'privacyCCPA',
		version: 'H0IeyQBalorD.6nTqqzhNTKECSgOPJCG'
	},
	consent: true,
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

export const defaultArgTypes = {
	userId: {
		name: 'Authentication',
		control: { type: 'select', options: { loggedIn: defaultArgs.userId, loggedOut: undefined } }
	},
	legislationId: { control: { type: 'select', options: legislations } },
	redirectUrl: { control: { type: 'select', options: redirectUrls } },
	consent: { control: { type: 'boolean' }, name: 'consent' },
	fow: { table: { disable: true } },
	consentSource: { table: { disable: true } },
	consentProxyApiHost: { table: { disable: true } },
	buttonText: { table: { disable: true } }
}

export const getFetchMock = (status = 200, options = {}) => {
	fetchMock.reset()
	fetchMock.mock('https://mock-consent.ft.com/__consent/consent-record/FTPINK/fakeUserId', status, {
		delay: 1000,
		...options
	})
}
