const { h } = require('@financial-times/x-engine');
const { shallow } = require('@financial-times/x-test-utils/enzyme');
const { TimeRemaining } = require('../TimeRemaining');

jest.mock('../classnames-helper', () => {
	const { classnamesHelperMock } = require('../../../__tests__/test-helper');
	return classnamesHelperMock;
});

describe('TimeRemaining', () => {

	const ONE_HOUR = 60 * 60;
	const THIRTY_MINUTES = 60 * 30;
	const FIVE_SECONDS = 60 * 5;

	const	props = {
		currentTime: FIVE_SECONDS,
		duration: ONE_HOUR + THIRTY_MINUTES + FIVE_SECONDS
	};

	describe('given expanded is true', () => {
		test('should return text in HMMSS format', () => {
			const subject = shallow(<TimeRemaining {...props} expanded={true}/>);
			expect(subject).toMatchSnapshot();
		});
		test('should display -00:00 if remaining seconds is less than 1', () => {
			const subject = shallow(
				<TimeRemaining {...props}
					expanded
					currentTime={59.2}
					duration={60}
				/>
			);
			expect(subject).toMatchSnapshot();
		});
	})

	describe('given expanded is false', () => {

		test('should return text in "XX min remaining" format', () => {
			const subject = shallow(<TimeRemaining {...props} expanded={false}/>);
			expect(subject).toMatchSnapshot();
		});

		test('should return 1 if remaining minutes is less than 1', () => {
			const subject = shallow(
				<TimeRemaining {...props}
					expanded={false}
					currentTime={1}
					duration={60}
				/>
			);
			expect(subject).toMatchSnapshot();
		});
	});

});
