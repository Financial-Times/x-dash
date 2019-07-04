export const getProps = (overrides = {}) => ({
	onPlayClick: jest.fn(),
	onPauseClick: jest.fn(),
	onCloseClick: jest.fn(),
	onExpand: jest.fn(),
	onMinimise: jest.fn(),
	setExpandedPlayerRef: jest.fn(),
	onPlaybackRateClick: jest.fn(),
	updateCurrentTime: jest.fn(),
	seeking: false,
	expanded: false,
	loading: false,
	error: false,
	playing: false,
	title: 'lorem',
	seriesName: 'ipsum',
	currentTime: 1234,
	duration: 5678,
	options: {
		canExpand: true
	},
	imageDataSet: {
		url: 'image-url'
	},
	...overrides
});
