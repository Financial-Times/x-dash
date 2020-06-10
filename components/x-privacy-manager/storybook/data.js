const CONSENT_API = 'https://consent.ft.com';

const defaults = {
	consent: true,
	legislation: [],
	referrer: 'ft.com',
	consentProxyEndpoints: {
		core: CONSENT_API,
		enhanced: CONSENT_API,
		createOrUpdateRecord: CONSENT_API,
	},
};

module.exports = {
	CONSENT_API,
	defaults,
};
