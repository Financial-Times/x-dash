const { h } = require('@financial-times/x-engine')
const { mount } = require('@financial-times/x-test-utils/enzyme')

import { defaultProps } from './helpers'

import { BasePrivacyManager } from '../privacy-manager'

function findMessageComponent(props) {
	const subject = mount(<BasePrivacyManager {...props} />)
	const messages = subject.find('[data-o-component="o-message"]')
	const message = messages.first()
	const link = message.find('[data-component="redirect-link"]')

	return {
		messages,
		message,
		link
	}
}

const redirectScenarios = {
	'Valid homepage URL': {
		redirectUrl: 'https://www.ft.com',
		expected: { href: 'https://www.ft.com/', label: 'Return to homepage' }
	},
	'URI-Encoded article URL': {
		redirectUrl: 'https%3A%2F%2Fwww.ft.com%2Fcontent%2F6d2655e2-7c7d-4bbc-91af-035b1a074fb1',
		expected: {
			href: 'https://www.ft.com/content/6d2655e2-7c7d-4bbc-91af-035b1a074fb1',
			label: 'Return to the previous page'
		}
	},
	'Specialist title homepage URL': {
		redirectUrl: 'https://www.thebanker.com',
		expected: {
			href: 'https://www.thebanker.com/',
			label: 'Return to homepage'
		}
	},
	'Specialist title article URL': {
		redirectUrl: 'https://www.thebanker.com/just-bank-things/deposit',
		expected: {
			href: 'https://www.thebanker.com/just-bank-things/deposit',
			label: 'Return to the previous page'
		}
	},
	'Invalid URL': {
		redirectUrl: 'not-a-valid-url',
		expected: { href: '/', label: 'Return to homepage' }
	},
	'Empty URL': {
		redirectUrl: '',
		expected: { href: '/', label: 'Return to homepage' }
	},
	'Undefined URL': {
		redirectUrl: undefined,
		expected: { href: '/', label: 'Return to homepage' }
	}
}

function getMessageProps(props = {}) {
	const messageDefaults = {
		consent: true,
		legislation: ['ccpa'],
		isLoading: false,
		_response: undefined
	}

	return {
		...defaultProps,
		...messageDefaults,
		...props
	}
}

function testRedirectScenarios({ statusProps, statusChecks }) {
	const messageProps = getMessageProps(statusProps)
	for (const [scenario, { redirectUrl, expected }] of Object.entries(redirectScenarios)) {
		test(scenario, () => {
			const msg = findMessageComponent({ ...messageProps, redirectUrl })

			expect(msg.messages).toHaveLength(1)
			expect(msg.message).toHaveClassName(statusChecks.msgClass)
			expect(msg.link).toHaveProp('href', expected.href)
			expect(msg.link).toHaveText(expected.label)
		})
	}
}

describe('x-privacy-manager', () => {
	describe('Messaging', () => {
		describe('Initial state', () => {
			it('Shows no message', () => {
				const { messages } = findMessageComponent(getMessageProps())
				expect(messages).toHaveLength(0)
			})
		})

		describe('While loading', () => {
			it('Shows a loading message', () => {
				const messageProps = getMessageProps({ isLoading: true })
				const { messages, message } = findMessageComponent(messageProps)
				expect(messages).toHaveLength(1)
				expect(message).toHaveClassName('o-message--neutral')
			})
		})

		describe('On response', () => {
			describe('200 status', () => {
				testRedirectScenarios({
					statusProps: { _response: { ok: true, status: 200 } },
					statusChecks: {
						msgClass: 'o-message--success'
					}
				})
			})

			describe('non-200 status', () => {
				testRedirectScenarios({
					statusProps: { _response: { ok: false, status: 400 } },
					statusChecks: {
						msgClass: 'o-message--error'
					}
				})
			})
		})
	})
})
