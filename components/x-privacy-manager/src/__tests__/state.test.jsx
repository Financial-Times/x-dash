const { h } = require('@financial-times/x-engine')
const { mount } = require('@financial-times/x-test-utils/enzyme')
const fetchMock = require('fetch-mock')

import * as helpers from './helpers'

import { PrivacyManager } from '../privacy-manager'

function getLastFetchPayload() {
	return JSON.parse(fetchMock.lastOptions().body)
}

describe('x-privacy-manager', () => {
	describe('handling consent choices', () => {
		function setup(propOverrides = {}) {
			const props = {
				...helpers.defaultProps,
				onConsentSavedCallbacks: [jest.fn(), jest.fn()],
				...propOverrides
			}
			const subject = mount(<PrivacyManager {...props} />)

			return {
				subject,
				callbacks: props.onConsentSavedCallbacks,
				async submitConsent(value) {
					// Switch consent to false and submit form
					await subject.find(`input[value="${value}"]`).first().prop('onChange')(undefined)
					await subject.find('form').first().prop('onSubmit')(undefined)

					// Reconcile snapshot with state
					subject.update()
				}
			}
		}

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
			let payload
			const { subject, callbacks, submitConsent } = setup({ consent: true })
			const optInInput = subject.find('[data-trackable="ccpa-advertising-toggle-allow"]').first()

			await submitConsent(false)

			// Check fetch and both callbacks were run with correct `payload` values
			payload = helpers.buildPayload(false)
			expect(getLastFetchPayload()).toEqual(payload)
			expect(callbacks[0]).toHaveBeenCalledWith(null, { payload, consent: false })
			expect(callbacks[1]).toHaveBeenCalledWith(null, { payload, consent: false })

			await submitConsent(true)

			// Check fetch and both callbacks were run with correct `payload` values
			payload = helpers.buildPayload(true)
			expect(getLastFetchPayload()).toEqual(payload)
			expect(callbacks[0]).toHaveBeenCalledWith(null, { payload, consent: true })
			expect(callbacks[1]).toHaveBeenCalledWith(null, { payload, consent: true })

			// Verify that confimatory nmessage is displayed
			const message = subject.find('[data-o-component="o-message"]').first()
			const link = message.find('[data-component="referrer-link"]')
			expect(message).toHaveClassName('o-message--success')
			expect(link).toHaveProp('href', 'https://www.ft.com/')
			expect(optInInput).toHaveProp('checked', true)
		})

		it('when provided, passes the cookieDomain prop in the fetch and callback payload', async () => {
			const { callbacks, submitConsent } = setup({ cookieDomain: '.ft.com' })
			const payload = { ...helpers.buildPayload(false), cookieDomain: '.ft.com' }

			await submitConsent(false)

			// Check fetch and both callbacks were run with correct `payload` values
			expect(getLastFetchPayload()).toEqual(payload)
			expect(callbacks[0]).toHaveBeenCalledWith(null, { payload, consent: false })
			expect(callbacks[1]).toHaveBeenCalledWith(null, { payload, consent: false })
		})

		it('passes error object to callbacks when fetch fails', async () => {
			const { callbacks, submitConsent } = setup()
			const payload = helpers.buildPayload(false)

			// Override fetch-mock to fail requests
			fetchMock.mock(helpers.CONSENT_PROXY_ENDPOINT, { status: 500 }, { delay: 500 })

			await submitConsent(false)

			// calls fetch with the correct payload
			expect(getLastFetchPayload()).toEqual(payload)

			// Calls both callbacks with an error as first argument
			callbacks.forEach((callback) => {
				const [errorArgument, resultArgument] = callback.mock.calls.pop()
				expect(errorArgument).toBeInstanceOf(Error)
				expect(resultArgument).toEqual({ payload, consent: false })
			})
		})
	})
})
