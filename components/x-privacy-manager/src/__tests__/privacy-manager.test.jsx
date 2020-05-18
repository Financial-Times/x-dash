const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');
const { Response } = require('node-fetch');

import { BasePrivacyManager, PrivacyManager } from '../privacy-manager';

describe('x-privacy-manager', () => {
	describe('initial state', () => {
		it('defaults to "Allow"', () => {
			const subject = mount(<PrivacyManager />);
			const input = subject.find('input[value="true"]');
			expect(input.first().prop('checked')).toBe(true);
		});

		it('highlights explicitly set consent correctly: false', () => {
			const subject = mount(<PrivacyManager consent={false} />);
			const input = subject.find('input[value="false"]').first();
			expect(input.prop('checked')).toBe(true);
		});

		it('highlights explicitly set consent correctly: true', () => {
			const subject = mount(<PrivacyManager consent={true} />);
			const input = subject.find('input[value="true"]').first();
			expect(input.prop('checked')).toBe(true);
		});
	});

	describe('It displays the appropriate messaging', () => {
		const defaultProps = {
			consent: true,
			referrer: 'www.ft.com',
			legislation: ['ccpa'],
			actions: {
				onConsentChange: jest.fn(),
				onSubmit: jest.fn().mockReturnValue({ _response: new Response() })
			},
			isLoading: false,
			_response: undefined
		};

		it('None by default', () => {
			const subject = mount(<BasePrivacyManager {...defaultProps} />);

			const messages = subject.find('[data-o-component="o-message"]');
			expect(messages).toHaveLength(0);
		});

		it('While loading', () => {
			const props = { ...defaultProps, isLoading: true };
			const subject = mount(<BasePrivacyManager {...props} />);

			const messages = subject.find('[data-o-component="o-message"]');
			expect(messages).toHaveLength(1);
			expect(messages.first()).toHaveClassName('o-message--neutral');
		});

		it('On receiving a response with a status of 200', () => {
			const _response = new Response('', { status: 200 });
			const props = { ...defaultProps, _response };
			const subject = mount(<BasePrivacyManager {...props} />);

			const messages = subject.find('[data-o-component="o-message"]');
			const message = messages.first();

			expect(messages).toHaveLength(1);
			expect(message).toHaveClassName('o-message--success');

			const link = message.find('[data-component="referrer-link"]');
			expect(link).toHaveProp('href', 'https://www.ft.com/');
		});

		it('On receiving a response with a non-200 status', () => {
			const _response = new Response('', { status: 400 });
			const props = { ...defaultProps, _response };
			const subject = mount(<BasePrivacyManager {...props} />);

			const messages = subject.find('[data-o-component="o-message"]');
			const message = messages.first();

			expect(messages).toHaveLength(1);
			expect(message).toHaveClassName('o-message--error');

			const link = message.find('[data-component="referrer-link"]');
			expect(link).toHaveProp('href', 'https://www.ft.com/');
		});
	});
});
