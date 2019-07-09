const { h } = require('@financial-times/x-engine');
const { shallow } = require('@financial-times/x-test-utils/enzyme');
const { PlaybackRate } = require('../PlaybackRate');

jest.mock('../playback-rates', () => {
	return { getNextPlaybackRate: () => 1.5 };
});

jest.mock('../classnames-helper', () => {
	return (...classes) => classes.join(' ');
});


describe('PlaybackRate', () => {

	const props = { onClick: jest.fn() };
	const subject = shallow(<PlaybackRate {...props}/>);

	test('should have necessary elements', () => {
		expect(subject).toMatchSnapshot();
	});

	test('should call onClick function with next playbackRate when it is clicked', () => {
		subject.simulate('click');
		expect(subject).toMatchSnapshot();
		expect(props.onClick).toHaveBeenCalledWith(1.5);
	});
});
