const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');
const { ExpandedPlayer, MinimisedPlayer } = require('../Players');
const {
	getProps,
	playPauseButtonSelector,
	closeButtonSelector,
	forwardButtonSelector,
	rewindButtonSelector,
	minimisedButtonSelector,
	playBackRateButtonSelector,
	imageSelector,
	titleSelector,
	seriesNameSelector,
	timelineSelector
} = require('../../../__tests__/test-helper');

jest.mock('../classnames-helper', () => {
	return (...classes) => classes.join(' ');
});

describe('Expanded player', () => {

	const props = getProps({ expanded: true });
	const subject = mount(<ExpandedPlayer {...props} />);
	const playPauseButton = subject.find(playPauseButtonSelector);
	const closeButton = subject.find(closeButtonSelector);
	const forwardButton = subject.find(forwardButtonSelector);
	const rewindButton = subject.find(rewindButtonSelector);
	const minimisedButton = subject.find(minimisedButtonSelector);
	const playBackRateButton = subject.find(playBackRateButtonSelector);
	const image = subject.find(imageSelector);
	const title = subject.find(titleSelector);
	const seriesName = subject.find(seriesNameSelector);
	const timeline = subject.find(timelineSelector);

	test('should display necessary components', () => {
		// should display
		expect(playPauseButton.exists()).toBe(true);
		expect(forwardButton.exists()).toBe(true);
		expect(rewindButton.exists()).toBe(true);
		expect(minimisedButton.exists()).toBe(true);
		expect(playBackRateButton.exists()).toBe(true);
		expect(image.exists()).toBe(true);
		expect(title.exists()).toBe(true);
		expect(seriesName.exists()).toBe(true);
		expect(timeline.exists()).toBe(true);
		// should not display
		expect(closeButton.exists()).toBe(false);
	});

	test('should minimise', () => {
		minimisedButton.simulate('click');
		expect(props.onMinimise).toHaveBeenCalled();
	})
});

describe('Minimised player', () => {

	const props = getProps();
	const subject = mount(<MinimisedPlayer {...props} />);
	const playPauseButton = subject.find(playPauseButtonSelector);
	const closeButton = subject.find(closeButtonSelector);
	const forwardButton = subject.find(forwardButtonSelector);
	const rewindButton = subject.find(rewindButtonSelector);
	const minimisedButton = subject.find(minimisedButtonSelector);
	const playBackRateButton = subject.find(playBackRateButtonSelector);
	const image = subject.find(imageSelector);
	const title = subject.find(titleSelector);
	const seriesName = subject.find(seriesNameSelector);
	const timeline = subject.find(timelineSelector);

	test('should display necessary components', () => {
		// should display
		expect(playPauseButton.exists()).toBe(true);
		expect(closeButton.exists()).toBe(true);
		expect(seriesName.exists()).toBe(true);
		// should not display
		expect(forwardButton.exists()).toBe(false);
		expect(rewindButton.exists()).toBe(false);
		expect(minimisedButton.exists()).toBe(false);
		expect(playBackRateButton.exists()).toBe(false);
		expect(image.exists()).toBe(false);
		expect(title.exists()).toBe(false);
		expect(timeline.exists()).toBe(false);
	});

	test('will expand', () => {
		subject.simulate('click');
		expect(props.onExpand).toHaveBeenCalled();
	});

	test('will not expand when options.canExpand=false', () => {
		const props = getProps({ options: { canExpand: false }});
		const subject = mount(<MinimisedPlayer {...props} />);
		subject.simulate('click');
		expect(props.onExpand).not.toHaveBeenCalled();
	});
});
