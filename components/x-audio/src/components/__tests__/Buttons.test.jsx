const { h } = require('@financial-times/x-engine');
const { shallow } = require('@financial-times/x-test-utils/enzyme');
const {
	PlayPause,
	Close,
	Forward,
	Rewind
} = require('../Buttons');

jest.mock('../classnames-helper', () => {
	return (...classes) => classes.join(' ');
});

describe('Play/Pause button', () => {

	const props = {
		onPlayClick: jest.fn(),
		onPauseClick:	jest.fn(),
		playing: false
	};

	beforeEach(() => {
		props.onPlayClick.mockRestore();
		props.onPauseClick.mockRestore();
	});

	describe('Play', () => {
		const playButton = shallow(<PlayPause {...props}/>);

		test('should have necessary elements', () => {
			expect(playButton).toMatchSnapshot();
		});

		test('will play', () => {
			playButton.simulate('click');

			expect(props.onPauseClick).not.toHaveBeenCalled();
			expect(props.onPlayClick).toHaveBeenCalled();
		});
	});

	describe('Pause', () => {
		const pauseButton = shallow(<PlayPause {...props} playing={true}/>);

		test('should have necessary elements', () => {
			expect(pauseButton).toMatchSnapshot();
		});

		test('will pause', () => {
			pauseButton.simulate('click');

			expect(props.onPauseClick).toHaveBeenCalled();
			expect(props.onPlayClick).not.toHaveBeenCalled();
		});
	});
});

describe('Close button', () => {

	const onCloseClick = jest.fn();
	const closeButton = shallow(<Close onClick={onCloseClick}/>);

	test('should have necessary elements', () => {
		expect(closeButton).toMatchSnapshot();
	});

	test('will close', () => {
		closeButton.simulate('click');

		expect(onCloseClick).toHaveBeenCalled();
	});
});

describe('Skip timeline buttons', () => {

	const SKIP_SECONDS_AMOUNT = 30;
	const props = {
		updateCurrentTime: jest.fn(),
	};

	beforeEach(() => {
		props.currentTime = 1000;
		props.updateCurrentTime.mockRestore();
	});

	describe('Forward button', () => {

		test('should have necessary elements', () => {
			const forwardButton = shallow(<Forward {...props} duration={2000}/>);

			expect(forwardButton).toMatchSnapshot();
		});

		test('will update currentTime by forwarded currentTime', () => {
			const forwardedCurrentTime = props.currentTime + SKIP_SECONDS_AMOUNT;
			const duration = forwardedCurrentTime + 1;
			const forwardButton = shallow(<Forward {...props} duration={duration}/>);
			forwardButton.simulate('click');

			expect(props.updateCurrentTime).toHaveBeenCalledWith({ "currentTime": forwardedCurrentTime });
		});

		test('will update currentTime by duration if forwarded currentTime is more than duration', () => {
			const duration = props.currentTime + SKIP_SECONDS_AMOUNT - 1;
			const forwardButton = shallow(<Forward {...props} duration={duration}/>);
			forwardButton.simulate('click');

			expect(props.updateCurrentTime).toHaveBeenCalledWith({ "currentTime": duration });
		});
	});

	describe('Rewind button', () => {

		test('should have necessary elements', () => {
			const rewindButton = shallow(<Rewind {...props}/>);

			expect(rewindButton).toMatchSnapshot();
		});

		test('will update currentTime by rewinded currentTime', () => {
			const rewindButton = shallow(<Rewind {...props}/>);
			const rewindedCurrentTime = props.currentTime - SKIP_SECONDS_AMOUNT;
			rewindButton.simulate('click');

			expect(props.updateCurrentTime).toHaveBeenCalledWith({ "currentTime": rewindedCurrentTime });
		});

		test('will update currentTime by 0 if rewinded currentTime is less than 0', () => {
			const currentTime = SKIP_SECONDS_AMOUNT - 1;
			const rewindButton = shallow(<Rewind {...props} currentTime={currentTime}/>);
			rewindButton.simulate('click');

			expect(props.updateCurrentTime).toHaveBeenCalledWith({ "currentTime": 0 });
		});
	});
})
