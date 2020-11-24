const { h } = require('@financial-times/x-engine')
const { mount } = require('@financial-times/x-test-utils/enzyme')

import { defaultProps } from './helpers'

import { BasePrivacyManager } from '../privacy-manager'

describe('Config', () => {
	it('renders the default UI', () => {
		const subject = mount(<BasePrivacyManager {...defaultProps} />)
		const labelTrue = subject.find('label[htmlFor="consent-true"]')
		const labelFalse = subject.find('label[htmlFor="consent-false"]')

		expect(labelTrue.text()).toBe('Allow' + 'See personalised adverts')
		expect(labelFalse.text()).toBe('Block' + 'Opt out of personalised adverts')
	})

	it('renders custom Button text', () => {
		const buttonText = {
			allow: {
				label: 'Custom label',
				text: 'Custom allow text'
			},
			submit: { label: 'Custom save' }
		}
		const props = { ...defaultProps, buttonText }

		const subject = mount(<BasePrivacyManager {...props} />)
		const labelTrue = subject.find('[data-trackable="ccpa-advertising-toggle-allow"] + label')
		const labelFalse = subject.find('[data-trackable="ccpa-advertising-toggle-block"] + label')
		const btnSave = subject.find('[data-trackable="ccpa-consent-block"]')

		expect(labelTrue.text()).toBe('Custom label' + 'Custom allow text')
		expect(labelFalse.text()).toBe('Block' + 'Opt out of personalised adverts')
		expect(btnSave.text()).toBe('Custom save')
	})

	it('renders legislation-specific data-trackable attrs', () => {
		const props = { ...defaultProps, legislationId: 'gdpr' }
		const subject = mount(<BasePrivacyManager {...props} />)

		const inputTrue = subject.find('[data-trackable="gdpr-advertising-toggle-allow"] + label')
		const inputFalse = subject.find('[data-trackable="gdpr-advertising-toggle-block"] + label')

		expect(inputTrue.text()).toBe('Allow' + 'See personalised adverts')
		expect(inputFalse.text()).toBe('Block' + 'Opt out of personalised adverts')
	})
})
