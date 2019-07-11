const { h } = require('@financial-times/x-engine');
const { shallow } = require('@financial-times/x-test-utils/enzyme');
const { Marquee } = require('../Marquee');

describe('Marquee', () => {
	test('should have necessary elements', () => {
		const props = {
			text: 'Moving text... Moving text...',
			className: 'class-name'
		};
		const subject = shallow(<Marquee {...props}/>);

		expect(subject).toMatchSnapshot();
	});
});
