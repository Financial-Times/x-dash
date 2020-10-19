const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');

import { defaultProps } from './helpers';

import { BasePrivacyManager } from '../privacy-manager';

describe('Config', () => {
	it('renders the default UI', () => {
		const subject = mount(<BasePrivacyManager {...defaultProps} />);
		const labelTrue = subject.find('label[htmlFor="consent-true"]');
		const labelFalse = subject.find('label[htmlFor="consent-false"]');

		expect(labelTrue.text()).toBe('Allow' + 'See personalised adverts');
		expect(labelFalse.text()).toBe('Block' + 'Opt out of personalised adverts');
	});

	it('renders custom Button text', () => {
		const buttonText = {
			allow: {
				label: 'Custom label',
				text: 'Custom allow text',
			},
			submit: { label: 'Custom save' },
		};
		const props = { ...defaultProps, buttonText };

		const subject = mount(<BasePrivacyManager {...props} />);
		const labelTrue = subject.find('label[htmlFor="consent-true"]');
		const labelFalse = subject.find('label[htmlFor="consent-false"]');
		const labelSave = subject.find('button[type="submit"]');

		expect(labelTrue.text()).toBe('Custom label' + 'Custom allow text');
		expect(labelFalse.text()).toBe('Block' + 'Opt out of personalised adverts');
		expect(labelSave.text()).toBe('Custom save');
	});
});
