const { addParameters } = require('@storybook/react');

const legislation = {
	CCPA: ['ccpa', 'gdpr'],
	// GDPR: ['gdpr']
};

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
	Undefined: '',
};

const loginPrompts = {
	loggedIn: '',
	loggedOut:
		'<p>Please <a href="https://www.ft.com/login?location=https://ft.com/preferences/privacy-ccpa">sign into your account</a> before submitting your preferences to ensure these changes are applied across all of your devices</p>',
};

module.exports = (data, { boolean, select }) => {
	return {
		loginPrompt() {
			return select(
				'Authenticated',
				loginPrompts,
				loginPrompts.loggedOut,
				addParameters({ escapeHTML: false })
			);
		},
		consent() {
			return boolean('Consent', data.consent, undefined);
		},
		legislation() {
			return select('Legislation', legislation, legislation['CCPA']);
		},
		referrer() {
			return select('Referrer', referrers, referrers['ft.com']);
		},
	};
};
