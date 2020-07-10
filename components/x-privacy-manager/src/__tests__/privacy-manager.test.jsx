const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');
const fetchMock = require('fetch-mock');

import { BasePrivacyManager, PrivacyManager } from '../privacy-manager';

const TEST_CONSENT_URL = 'https://consent.ft.com';

const buildPayload = (consent) => ({
	consentSource: 'consuming-app',
	data: {
		behaviouralAds: {
			onsite: {
				fow: 'privacyCCPA/H0IeyQBalorD.6nTqqzhNTKECSgOPJCG',
				lbi: true,
				source: 'consuming-app',
				status: consent,
			},
		},
		demographicAds: {
			onsite: {
				fow: 'privacyCCPA/H0IeyQBalorD.6nTqqzhNTKECSgOPJCG',
				lbi: true,
				source: 'consuming-app',
				status: consent,
			},
		},
		programmaticAds: {
			onsite: {
				fow: 'privacyCCPA/H0IeyQBalorD.6nTqqzhNTKECSgOPJCG',
				lbi: true,
				source: 'consuming-app',
				status: consent,
			},
		},
	},
	formOfWordsId: 'privacyCCPA',
});

function getLastFetchPayload() {
	return JSON.parse(fetchMock.lastOptions().body);
}

const defaultProps = {
	consentProxyEndpoints: {
		core: TEST_CONSENT_URL,
		enhanced: TEST_CONSENT_URL,
		createOrUpdateRecord: TEST_CONSENT_URL
	},
	consentSource: 'consuming-app',
	referrer: 'www.ft.com',
};

describe('x-privacy-manager', () => {
	describe('initial state', () => {
		it('defaults to "Allow"', () => {
			const subject = mount(<PrivacyManager {...defaultProps} />);
			const inputTrue = subject.find('input[value="true"]').first();

			// Verify that initial props are correctly reflected
			expect(inputTrue.prop('checked')).toBe(true);
		});

		it('highlights explicitly set consent correctly: false', () => {
			const subject = mount(<PrivacyManager {...defaultProps} consent={false} />);
			const inputFalse = subject.find('input[value="false"]').first();

			// Verify that initial props are correctly reflected
			expect(inputFalse.prop('checked')).toBe(true);
		});

		it('highlights explicitly set consent correctly: true', () => {
			const subject = mount(<PrivacyManager consent={true} {...defaultProps} />);
			const inputTrue = subject.find('input[value="true"]').first();

			// Verify that initial props are correctly reflected
			expect(inputTrue.prop('checked')).toBe(true);
		});
	});

	describe('handling consent choices', () => {
		function setup(propOverrides = {}) {
			const props = {
				...defaultProps,
				onConsentSavedCallbacks: [jest.fn(), jest.fn()],
				...propOverrides,
			};
			const subject = mount(<PrivacyManager {...props} />);

			return {
				subject,
				callbacks: props.onConsentSavedCallbacks,
				async submitConsent (value) {
					// Switch consent to false and submit form
					await subject.find(`input[value="${value}"]`).first().prop('onChange')(undefined);
					await subject.find('form').first().prop('onSubmit')(undefined);

					// Reconcile snapshot with state
					subject.update();
				},
			};
		}

		beforeEach(() => {
			fetchMock.reset();
			fetchMock.config.overwriteRoutes = true;
			const okResponse = {
				body: { a: 'b' },
				status: 200,
			};
			fetchMock.mock(TEST_CONSENT_URL, okResponse, { delay: 500 });
		});

		it('handles consecutive changes of consent', async () => {
			let payload;
			const { subject, callbacks, submitConsent } = setup();
			const optInInput = subject.find(`input[value="true"]`).first();

			await submitConsent(false);

			// Check fetch and both callbacks were run with correct `payload` values
			payload = buildPayload(false);
			expect(getLastFetchPayload()).toEqual(payload);
			expect(callbacks[0]).toHaveBeenCalledWith(null, { payload, consent: false });
			expect(callbacks[1]).toHaveBeenCalledWith(null, { payload, consent: false });

			await submitConsent(true);

			// Check fetch and both callbacks were run with correct `payload` values
			payload = buildPayload(true);
			expect(getLastFetchPayload()).toEqual(payload);
			expect(callbacks[0]).toHaveBeenCalledWith(null, { payload, consent: true });
			expect(callbacks[1]).toHaveBeenCalledWith(null, { payload, consent: true });

			// Verify that confimatory nmessage is displayed
			const message = subject.find('[data-o-component="o-message"]').first();
			const link = message.find('[data-component="referrer-link"]');
			expect(message).toHaveClassName('o-message--success');
			expect(link).toHaveProp('href', 'https://www.ft.com/');
			expect(optInInput).toHaveProp('checked', true);
		});

		it('when provided, passes the cookieDomain prop in the fetch and callback payload', async () => {
			const { callbacks, submitConsent } = setup({ cookieDomain: '.ft.com' });
			const payload = { ...buildPayload(false), cookieDomain: '.ft.com' };

			await submitConsent(false);

			// Check fetch and both callbacks were run with correct `payload` values
			expect(getLastFetchPayload()).toEqual(payload);
			expect(callbacks[0]).toHaveBeenCalledWith(null, { payload, consent: false });
			expect(callbacks[1]).toHaveBeenCalledWith(null, { payload, consent: false });
		});

		it('passes error object to callbacks when fetch fails', async () => {
			const { callbacks, submitConsent } = setup();
			const payload = buildPayload(false);

			// Override fetch-mock to fail requests
			const errorResponse = { status: 500 };
			fetchMock.mock(TEST_CONSENT_URL, errorResponse, { delay: 500 });

			await submitConsent(false);

			// calls fetch with the correct payload
			expect(getLastFetchPayload()).toEqual(payload);

			// Calls both callbacks with an error as first argument
			callbacks.forEach(callback => {
				const [errorArgument, resultArgument] = callback.mock.calls.pop();
				expect(errorArgument).toBeInstanceOf(Error);
				expect(resultArgument).toEqual({ payload, consent: false });
			});
		});
	});

	describe('It displays the appropriate messaging', () => {
		function findMessageComponent(props) {
			const subject = mount(<BasePrivacyManager {...props} />);
			const messages = subject.find('[data-o-component="o-message"]');
			const message = messages.first();
			const link = message.find('[data-component="referrer-link"]');

			return {
				messages,
				message,
				link,
			};
		}

		const messageProps = {
			...defaultProps,
			consent: true,
			legislation: ['ccpa'],
			actions: {
				onConsentChange: jest.fn(() => {}),
				sendConsent: jest.fn().mockReturnValue({ _response: { ok: undefined } }),
			},
			isLoading: false,
			_response: undefined,
		};

		it('None by default', () => {
			const { messages } = findMessageComponent(messageProps);
			expect(messages).toHaveLength(0);
		});

		it('While loading', () => {
			const { messages, message } = findMessageComponent({ ...messageProps, isLoading: true });
			expect(messages).toHaveLength(1);
			expect(message).toHaveClassName('o-message--neutral');
		});

		it('On receiving a response with a status of 200', () => {
			const _response = { ok: true, status: 200 };
			const { messages, message, link } = findMessageComponent({ ...messageProps, _response });

			expect(messages).toHaveLength(1);
			expect(message).toHaveClassName('o-message--success');
			expect(link).toHaveProp('href', 'https://www.ft.com/');
		});

		it('On receiving a response with a non-200 status', () => {
			const _response = { ok: false, status: 400 };
			const { messages, message, link } = findMessageComponent({ ...messageProps, _response });

			expect(messages).toHaveLength(1);
			expect(message).toHaveClassName('o-message--error');
			expect(link).toHaveProp('href', 'https://www.ft.com/');
		});

		it('On receiving any response with referrer undefined', () => {
			const _response = { ok: false, status: 400 };
			const referrer = undefined;
			const { messages, message, link } = findMessageComponent({ ...messageProps, referrer, _response });

			expect(messages).toHaveLength(1);
			expect(message).toHaveClassName('o-message--error');
			expect(link).toHaveLength(0);
		});
	});
});
