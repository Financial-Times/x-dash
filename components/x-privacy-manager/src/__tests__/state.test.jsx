const fetchMock = require('fetch-mock')

import * as helpers from './helpers'

function getLastFetchPayload() {
	return JSON.parse(fetchMock.lastOptions().body)
}

describe('x-privacy-manager', () => {
	describe('handling consent choices', () => {
		beforeEach(() => {
			fetchMock.reset()
			fetchMock.config.overwriteRoutes = true
			const okResponse = {
				body: { a: 'b' },
				status: 200
			}
			fetchMock.mock(helpers.CONSENT_PROXY_ENDPOINT, okResponse, { delay: 500 })
		})

		it('handles consecutive changes of consent', async () => {
			let expectedPayload
			const { subject, callbacks, submitConsent } = helpers.setupPrivacyManager({ consent: true })
			const optInInput = subject.find('[data-trackable="ccpa-advertising-toggle-allow"]').first()

			await submitConsent(false)

			// Check fetch and both callbacks were run with correct `payload` values
			expectedPayload = helpers.buildPayload({ setConsentCookie: false, consent: false })
			expect(getLastFetchPayload()).toEqual(expectedPayload)
			expect(callbacks[0]).toHaveBeenCalledWith(null, { payload: expectedPayload, consent: false })
			expect(callbacks[1]).toHaveBeenCalledWith(null, { payload: expectedPayload, consent: false })

			await submitConsent(true)

			// Check fetch and both callbacks were run with correct `payload` values
			expectedPayload = helpers.buildPayload({ setConsentCookie: false, consent: true })
			expect(getLastFetchPayload()).toEqual(expectedPayload)
			expect(callbacks[0]).toHaveBeenCalledWith(null, { payload: expectedPayload, consent: true })
			expect(callbacks[1]).toHaveBeenCalledWith(null, { payload: expectedPayload, consent: true })

			// Verify that confimatory nmessage is displayed
			const message = subject.find('[data-o-component="o-message"]').first()
			const link = message.find('[data-component="redirect-link"]')
			expect(message).toHaveClassName('o-message--success')
			expect(link).toHaveProp('href', '/')
			expect(optInInput).toHaveProp('checked', true)
		})

		it('when provided, passes the cookieDomain prop in the fetch and callback payload', async () => {
			const { callbacks, submitConsent } = helpers.setupPrivacyManager({ cookieDomain: '.ft.com' })
			const expectedPayload = {
				...helpers.buildPayload({ setConsentCookie: false, consent: false }),
				cookieDomain: '.ft.com'
			}

			await submitConsent(false)

			// Check fetch and both callbacks were run with correct `payload` values
			expect(getLastFetchPayload()).toEqual(expectedPayload)
			expect(callbacks[0]).toHaveBeenCalledWith(null, { payload: expectedPayload, consent: false })
			expect(callbacks[1]).toHaveBeenCalledWith(null, { payload: expectedPayload, consent: false })
		})

		it('passes error object to callbacks when fetch fails', async () => {
			const { callbacks, submitConsent } = helpers.setupPrivacyManager()
			const expectedPayload = helpers.buildPayload({ setConsentCookie: false, consent: false })

			// Override fetch-mock to fail requests
			fetchMock.mock(helpers.CONSENT_PROXY_ENDPOINT, { status: 500 }, { delay: 500 })

			await submitConsent(false)

			// calls fetch with the correct payload
			expect(getLastFetchPayload()).toEqual(expectedPayload)

			// Calls both callbacks with an error as first argument
			callbacks.forEach((callback) => {
				const [errorArgument, resultArgument] = callback.mock.calls.pop()
				expect(errorArgument).toBeInstanceOf(Error)
				expect(resultArgument).toEqual({ payload: expectedPayload, consent: false })
			})
		})

		it('Sends legislation-specific values (e.g. setConsentCookie)', async () => {
			const expectedPayload = helpers.buildPayload({ setConsentCookie: true, consent: false })
			const { submitConsent } = helpers.setupPrivacyManager({
				legislationId: 'gdpr',
				consent: true
			})

			await submitConsent(false)

			expect(getLastFetchPayload()).toEqual(expectedPayload)
		})
	})
})
