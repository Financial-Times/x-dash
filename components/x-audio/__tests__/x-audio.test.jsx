const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');
const { Audio } = require('../');
const { getProps } = require('./test-helpers');

describe('x-audio', () => {
	describe('loader', () => {
		const props = getProps();
		test('should show the loader when loading is true', () => {
			const subject = mount(<Audio {...props} loading={true} />);
			expect(subject.find('Loading')).toHaveLength(1);
		});

		test('should not show the loader when loaded event occurs', () => {
			const subject = mount(<Audio {...props} />);
			expect(subject.find('Loading')).toHaveLength(0);
		});

		test('should show the error message when error is true', () => {
			const subject = mount(<Audio {...props} error={true} />);
			expect(subject.find('ErrorMessage')).toHaveLength(1);
		});
	});

	describe('minimised player', () => {
		test('will expand', () => {
			const props = getProps();
			const subject = mount(<Audio {...props} />);
			subject.simulate('click');
			expect(props.onExpand).toHaveBeenCalled();
		});

		test('will not expand when options.canExpand=false', () => {
			const props = getProps({ options: { canExpand: false }});
			const subject = mount(<Audio {...props} />);
			subject.simulate('click');
			expect(props.onExpand).not.toHaveBeenCalled();
		});
	});
});
