const { getTrackingKeys, getConsentProxyEndpoints } = require('../utils')

describe('getTrackingKeys', () => {
	it('Creates legislation-specific tracking event names', () => {
		expect(getTrackingKeys('ccpa')).toEqual({
			'advertising-toggle-block': 'ccpa-advertising-toggle-block',
			'advertising-toggle-allow': 'ccpa-advertising-toggle-allow',
			'consent-allow': 'ccpa-consent-allow',
			'consent-block': 'ccpa-consent-block'
		})
	})
})

describe('getConsentProxyEndpoints', () => {
	const params = {
		userId: 'abcde',
		consentProxyApiHost: 'https://consent.ft.com',
		cookieDomain: '.ft.com'
	}

	const defaultEndpoint = 'https://consent.ft.com/__consent/consent-record-cookie'

	it('generates endpoints for logged-in users', () => {
		expect(getConsentProxyEndpoints(params)).toEqual({
			core: `https://consent.ft.com/__consent/consent-record/FTPINK/abcde`,
			enhanced: `https://consent.ft.com/__consent/consent/FTPINK/abcde`,
			createOrUpdateRecord: `https://consent.ft.com/__consent/consent-record/FTPINK/abcde`
		})
	})

	it('generates endpoints for logged-out users', () => {
		const loggedOutParams = { ...params, userId: undefined }
		expect(getConsentProxyEndpoints(loggedOutParams)).toEqual({
			core: defaultEndpoint,
			enhanced: defaultEndpoint,
			createOrUpdateRecord: defaultEndpoint
		})
	})

	it('generates endpoints for cookie-only circumstances', () => {
		const loggedOutParams = { ...params, cookiesOnly: true }
		expect(getConsentProxyEndpoints(loggedOutParams)).toEqual({
			core: defaultEndpoint,
			enhanced: defaultEndpoint,
			createOrUpdateRecord: defaultEndpoint
		})
	})
})
