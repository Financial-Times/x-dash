const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');

import { defaultProps } from './helpers';

import { BasePrivacyManager } from '../privacy-manager';

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

describe('x-privacy-manager', () => {
	describe('Messaging', () => {
		const messageProps = {
			...defaultProps,
			consent: true,
			legislation: ['ccpa'],
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
			const { messages, message, link } = findMessageComponent({
				...messageProps,
				referrer,
				_response,
			});

			expect(messages).toHaveLength(1);
			expect(message).toHaveClassName('o-message--error');
			expect(link).toHaveLength(0);
		});
	});
});
