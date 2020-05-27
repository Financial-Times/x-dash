const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');
const fetchMock = require('fetch-mock');

import { CONSENT_API, BasePrivacyManager, PrivacyManager } from '../privacy-manager';

function checkPayload(opts, expected) {
	const values = Object.values(JSON.parse(String(opts.body)));
	return values.every((v) => v === expected);
}

describe('x-privacy-manager', () => {
	describe('initial state', () => {
		beforeEach(() => {
			fetchMock.reset();
			fetchMock.mock(CONSENT_API, 200);
		});

		it('defaults to "Allow"', () => {
			const subject = mount(<PrivacyManager />);
			const inputTrue = subject.find('input[value="true"]').first();

			// Verify that initial props are correctly reflected
			expect(inputTrue.prop('checked')).toBe(true);
		});

		it('highlights explicitly set consent correctly: false', () => {
			const subject = mount(<PrivacyManager consent={false} />);
			const inputFalse = subject.find('input[value="false"]').first();

			// Verify that initial props are correctly reflected
			expect(inputFalse.prop('checked')).toBe(true);
		});

		it('highlights explicitly set consent correctly: true', () => {
			const subject = mount(<PrivacyManager consent={true} />);
			const inputTrue = subject.find('input[value="true"]').first();

			// Verify that initial props are correctly reflected
			expect(inputTrue.prop('checked')).toBe(true);
		});

		it('handles a change of consent', async () => {
			const subject = mount(<PrivacyManager consent={true} referrer="www.ft.com" />);
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

			expect(subject).toMatchSnapshot();
		});
	});

	describe('It displays the appropriate messaging', () => {
		const defaultProps = {
			consent: true,
			referrer: 'www.ft.com',
			legislation: ['ccpa'],
			actions: {
				onConsentChange: jest.fn(() => {}),
				sendConsent: jest.fn().mockReturnValue({ _response: { ok: undefined } })
			},
			isLoading: false,
			_response: undefined
		};

		it('None by default', () => {
			const subject = mount(<BasePrivacyManager {...defaultProps} />);

			const messages = subject.find('[data-o-component="o-message"]');
			expect(messages).toHaveLength(0);

			expect(subject).toMatchSnapshot();
		});

		it('While loading', () => {
			const props = { ...defaultProps, isLoading: true };
			const subject = mount(<BasePrivacyManager {...props} />);

			const messages = subject.find('[data-o-component="o-message"]');
			expect(messages).toHaveLength(1);
			expect(messages.first()).toHaveClassName('o-message--neutral');

			expect(subject).toMatchSnapshot();
		});

		it('On receiving a response with a status of 200', () => {
			const _response = { ok: true, status: 200 };
			const props = { ...defaultProps, _response };
			const subject = mount(<BasePrivacyManager {...props} />);

			const messages = subject.find('[data-o-component="o-message"]');
			const message = messages.first();

			expect(messages).toHaveLength(1);
			expect(message).toHaveClassName('o-message--success');

			const link = message.find('[data-component="referrer-link"]');
			expect(link).toHaveProp('href', 'https://www.ft.com/');

			expect(subject).toMatchSnapshot();
		});

		it('On receiving a response with a non-200 status', () => {
			const _response = { ok: false, status: 400 };
			const props = { ...defaultProps, _response };
			const subject = mount(<BasePrivacyManager {...props} />);

			const messages = subject.find('[data-o-component="o-message"]');
			const message = messages.first();

			expect(messages).toHaveLength(1);
			expect(message).toHaveClassName('o-message--error');

			const link = message.find('[data-component="referrer-link"]');
			expect(link).toHaveProp('href', 'https://www.ft.com/');

			expect(subject).toMatchSnapshot();
		});
	});
});
