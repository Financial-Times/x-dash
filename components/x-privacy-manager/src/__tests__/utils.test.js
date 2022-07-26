const { getTrackingKeys, getConsentProxyEndpoints, getPayload, onConsentSavedFn } = require('../utils')

const fixtures = {
	fow: { id: 'xxxx', version: 1 },
	consentSource: 'test-source',
	getCategoryPayload(status) {
		return {
			onsite: {
				lbi: true,
				status,
				source: fixtures.consentSource,
				fow: `${fixtures.fow.id}/${fixtures.fow.version}`
			}
		}
	}
}

function getExpectedPayload({ consent }) {
	const input = {
		consent,
		consentSource: fixtures.consentSource,
		fow: fixtures.fow,
		setConsentCookie: true
	}

	const expectedCategoryPayload = fixtures.getCategoryPayload(input.consent)
	return {
		setConsentCookie: input.setConsentCookie,
		formOfWordsId: fixtures.fow.id,
		consentSource: fixtures.consentSource,
		data: {
			behaviouralAds: expectedCategoryPayload,
			demographicAds: expectedCategoryPayload,
			programmaticAds: expectedCategoryPayload
		}
	}
}

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

	it('generates a payload', () => {
		const input = {
			fow: fixtures.fow,
			consentSource: fixtures.consentSource,
			consent: true,
			setConsentCookie: false
		}

		const expectedCategoryPayload = fixtures.getCategoryPayload(input.consent)

		const expected = {
			setConsentCookie: input.setConsentCookie,
			formOfWordsId: fixtures.fow.id,
			consentSource: fixtures.consentSource,
			data: {
				behaviouralAds: expectedCategoryPayload,
				demographicAds: expectedCategoryPayload,
				programmaticAds: expectedCategoryPayload
			}
		}

		expect(getPayload(input)).toEqual(expected)
	})

	describe('Runs callbacks with user input', () => {
		test.each([
			['{ payload: null }', { consent: false, payload: null }],
			['{ consent: true }', { consent: true, payload: getExpectedPayload({ consent: true }) }],
			['{ consent: false }', { consent: false, payload: getExpectedPayload({ consent: false }) }],
			[
				"{ err: 'error', ok: false }",
				{ consent: true, err: 'error', ok: false, payload: getExpectedPayload({ consent: true }) }
			]
		])('onConsentSaved(%s)', (_label, input) => {
			const fnA = jest.fn()
			const fnB = jest.fn()
			const fnC = jest.fn()
			const onConsentSaved = onConsentSavedFn([fnA, fnB, fnC])

			const { consent, payload, err = null, ok = true } = input
			const { _response } = onConsentSaved(input)

			expect(fnA).toHaveBeenCalledWith(err, { consent, payload })
			expect(fnB).toHaveBeenCalledWith(err, { consent, payload })
			expect(fnC).toHaveBeenCalledWith(err, { consent, payload })
			expect(_response).toEqual({ ok })
		})
	})
})
