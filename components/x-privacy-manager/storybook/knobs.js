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

module.exports = (data, { boolean, select }) => ({
	userId() {
		return select('Authenticated', { loggedIn: data.userId, loggedOut: undefined });
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
});
