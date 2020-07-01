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
	cookieDomain: '.ft.com',
	formOfWordsId: 'privacyCCPA',
});

function checkPayload(opts, expected) {
	const consents = JSON.parse(String(opts.body)).data;

	let worked = true;
	for (const category in consents) {
		worked = worked && consents[category].onsite.status === expected;
	}
	return worked;
}

const defaultProps = {
	consentProxyEndpoints: {
		core: TEST_CONSENT_URL,
		enhanced: TEST_CONSENT_URL,
		createOrUpdateRecord: TEST_CONSENT_URL
	},
	consentSource: 'consuming-app',
	referrer: 'www.ft.com',
	cookieDomain: '.ft.com',
};

describe('x-privacy-manager', () => {
	describe('initial state', () => {
		beforeEach(() => {
			fetchMock.reset();
			const okResponse = {
				body: { a: 'b' },
				status: 200,
			};
			fetchMock.mock(TEST_CONSENT_URL, okResponse, { delay: 500 });
		});

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

		it('handles a change of consent', async () => {
			const callback1 = jest.fn();
			const callback2 = jest.fn();
			const consentVal = true;

			const props = { ...defaultProps, onConsentSavedCallbacks: [callback1, callback2] };

			const payload = buildPayload(consentVal);

			const subject = mount(<PrivacyManager {...props} />);
			const form = subject.find('form').first();
			const inputTrue = subject.find('input[value="true"]').first();
			const inputFalse = subject.find('input[value="false"]').first();

			// Switch consent to false and submit form
			await inputFalse.prop('onChange')(undefined);
			await form.prop('onSubmit')(undefined);

			// Reconcile snapshot with state
			subject.update();

			// Check that fetch was called with the correct values
			expect(checkPayload(fetchMock.lastOptions(), false)).toBe(true);

			// Switch consent back to true and resubmit form
			await inputTrue.prop('onChange')(undefined);
			await form.prop('onSubmit')(undefined);

			// Check both callbacks were run with `payload`
			expect(callback1).toHaveBeenCalledWith(null, { payload, consent: true });
			expect(callback2).toHaveBeenCalledWith(null, { payload, consent: true });

			// Reconcile snapshot with state
			subject.update();

			// Check that fetch was called with the correct values
			expect(checkPayload(fetchMock.lastOptions(), true)).toBe(true);

			// Verify that confimatory nmessage is displayed
			const message = subject.find('[data-o-component="o-message"]').first();
			const link = message.find('[data-component="referrer-link"]');
			expect(message).toHaveClassName('o-message--success');
			expect(link).toHaveProp('href', 'https://www.ft.com/');
			expect(inputTrue).toHaveProp('checked', true);
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
