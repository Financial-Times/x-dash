const { h } = require('@financial-times/x-engine');
const { shallow } = require('@financial-times/x-test-utils/enzyme');
const { PlaybackRate } = require('../PlaybackRate');
const { PLAYBACK_RATES } = require('../playback-rates');

jest.mock('../classnames-helper', () => {
	return (...classes) => classes.join(' ');
});


describe('PlaybackRate', () => {

	const props = { onClick: jest.fn() };

	beforeEach(() => {
		props.onClick.mockRestore();
	});

	test('should have necessary elements', () => {
		const subject = shallow(<PlaybackRate {...props}/>);
		expect(subject).toMatchSnapshot();
	});

	describe('when clicked', () => {

		PLAYBACK_RATES.forEach(rate => {
			test(`should set playbackRate correctly [${rate}]`, () => {
				const subject = shallow(<PlaybackRate {...props} rate={rate}/>);
				subject.simulate('click');

				expect(subject).toMatchSnapshot();
				expect(props.onClick).toHaveBeenCalled();
			});
		});

	})

});
