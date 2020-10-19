const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');
const fetchMock = require('fetch-mock');

import * as helpers from './helpers';

import { PrivacyManager } from '../privacy-manager';

const checkInput = ({ consent }) => () => {
	const props = { ...helpers.defaultProps, consent };
	const subject = mount(<PrivacyManager {...props} />);
	const input = subject.find(`input[value="${consent}"]`).first();

	// Verify that initial props are correctly reflected
	expect(input.prop('checked')).toBe(true);
};

describe('x-privacy-manager', () => {
	describe('Messaging', () => {
		beforeEach(() => {
			fetchMock.reset();
			const okResponse = {
				body: { a: 'b' },
				status: 200,
			};

			const targetUrl = helpers.CONSENT_PROXY_ENDPOINT
			fetchMock.mock(targetUrl, okResponse, { delay: 500 });
		});

		it('defaults to "undefined"', () => {
			const subject = mount(<PrivacyManager {...helpers.defaultProps} />);
			subject.find('input').forEach((input) => expect(input.prop('checked')).toBe(false));
		});

		it('highlights explicitly set consent correctly: false', checkInput({ consent: false }));
		it('highlights explicitly set consent correctly: true', checkInput({ consent: true }));

		it('handles a change of consent', async () => {
			const callback1 = jest.fn();
			const callback2 = jest.fn();
			const consentVal = true;

			const props = {
				...helpers.defaultProps,
				consent: true,
				onConsentSavedCallbacks: [callback1, callback2],
			};
			const payload = helpers.buildPayload(consentVal);

			const subject = mount(<PrivacyManager {...props} />);
			const form = subject.find('form').first();
			const inputTrue = subject.find('input[value="true"]').first();
			const inputFalse = subject.find('input[value="false"]').first();

			// Switch consent to false and submit form
			await inputFalse.prop('onChange')(undefined);
			await form.prop('onSubmit')(undefined);

			// Reconcile snapshot with state
			await subject.update();

			// Check that fetch was called with the correct values
			expect(helpers.checkPayload(fetchMock.lastOptions(), false)).toBe(true);

			// Switch consent back to true and resubmit form
			await inputTrue.prop('onChange')(undefined);
			await form.prop('onSubmit')(undefined);

			// Reconcile snapshot with state
			await subject.update();

			// Check both callbacks were run with `payload`
			expect(callback1).toHaveBeenCalledWith(null, { payload, consent: true });
			expect(callback2).toHaveBeenCalledWith(null, { payload, consent: true });

			// Check that fetch was called with the correct values
			expect(helpers.checkPayload(fetchMock.lastOptions(), true)).toBe(true);

			// Verify that confimatory nmessage is displayed
			const message = subject.find('[data-o-component="o-message"]').first();
			const link = message.find('[data-component="referrer-link"]');
			// expect(message).toHaveClassName('o-message--success');
			expect(link).toHaveProp('href', 'https://www.ft.com/');
			expect(inputTrue).toHaveProp('checked', true);
		});
	});
});
