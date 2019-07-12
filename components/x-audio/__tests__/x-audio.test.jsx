const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');
const { default: createAudioPlayer, Audio } = require('../');
const {
	getProps,
	playButtonSelector,
	pauseButtonSelector,
	seriesNameSelector
} = require('./test-helper');

describe('x-audio', () => {

	describe('when play button was clicked', () => {

		let subject;

		const htmlMediaElementPlayMock = jest.fn(function() {
			this.dispatchEvent(new Event('play'));
		});
		window.HTMLMediaElement.prototype.play = htmlMediaElementPlayMock;

		const props = {
			trackingContext: {
				contentId: 'abc-123'
			},
			title: 'the biggest banking stories of the week',
			seriesName: 'Banking Weekly podcast',
			notifiers: {
				tracking: jest.fn(),
				play: jest.fn()
			}
		};

		beforeEach(() => {
			htmlMediaElementPlayMock.mockRestore();
			props.notifiers.tracking.mockRestore();
			props.notifiers.play.mockRestore();

			const audioPlayer = createAudioPlayer();
			subject = mount(audioPlayer(props));

			const playButton = subject.find(playButtonSelector);
			playButton.simulate('click');
		});

		test('should display title and seriesName', () => {
			const seriesNameAndTitle = subject.find(seriesNameSelector).hostNodes();
			expect(seriesNameAndTitle.exists()).toBe(true);
			expect(seriesNameAndTitle.text()).toBe(`${props.seriesName}: ${props.title}`);
		});

		test('should play', () => {
			expect(htmlMediaElementPlayMock).toHaveBeenCalled();
			expect(props.notifiers.tracking).toHaveBeenCalled();
			expect(props.notifiers.play).toHaveBeenCalled();
		});

		test('should display pause button', () => {
			const pauseButton = subject.find(pauseButtonSelector);
			expect(pauseButton.exists()).toBe(true);
		})
	})

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
});
