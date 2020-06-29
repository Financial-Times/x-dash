const CONSENT_API = 'https://consent.ft.com';

const defaults = {
	loginPrompt: '',
	consent: true,
	legislation: [],
	referrer: 'ft.com',
	consentProxyEndpoints: {
		core: CONSENT_API,
		enhanced: CONSENT_API,
		createOrUpdateRecord: CONSENT_API,
	},
};

const parameters = {
	knobs: {
		escapeHTML: false,
	},
};

const getFetchMock = (status = 200, options = {}) => (fetchMock) => {

	fetchMock.mock(CONSENT_API, status, {
		delay: 1000,
		...options,
	});
};

module.exports = {
	CONSENT_API,
	defaults,
	parameters,
	getFetchMock,
};
