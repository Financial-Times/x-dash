const { h } = require('@financial-times/x-engine');
const { shallow } = require('@financial-times/x-test-utils/enzyme');
const { TimeRemaining } = require('../TimeRemaining');

jest.mock('../classnames-helper', () => {
	return (...classes) => classes.join(' ');
});

describe('TimeRemaining', () => {

	const	props = {
		currentTime: 60*5,
		duration: 60*60 + 60*30 + 60*5
	};

	describe('given expanded is true', () => {
		test('should return text in HMMSS format', () => {
			const subject = shallow(<TimeRemaining {...props} expanded={true}/>);
			expect(subject).toMatchSnapshot();
		});
	})

	describe('given expanded is false', () => {

		test('should return text in "XX min remaining" format', () => {
			const subject = shallow(<TimeRemaining {...props} expanded={false}/>);
			expect(subject).toMatchSnapshot();
		});

		test('should return 1 if remaining minutes is less than 1', () => {
			const subject = shallow(<TimeRemaining {...props}
				expanded={false}
				currentTime={1}
				duration={60}
				/>);
			expect(subject).toMatchSnapshot();
		});
	});

});
