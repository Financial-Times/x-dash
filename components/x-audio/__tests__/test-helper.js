export const getProps = (overrides = {}) => ({
	onPlayClick: jest.fn(),
	onPauseClick: jest.fn(),
	onCloseClick: jest.fn(),
	onExpand: jest.fn(),
	onMinimise: jest.fn(),
	onScrub: jest.fn(),
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
	scrubbing: false,
	options: {
		canExpand: true
	},
	imageDataSet: {
		url: 'image-url'
	},
	...overrides
});

export const playPauseButtonSelector = '[className*="audio-player__play-pause"]';
export const playButtonSelector = '[className*="audio-player__play-pause--play"]';
export const pauseButtonSelector = '[className*="audio-player__play-pause--pause"]';
export const closeButtonSelector = '[className*="audio-player__close"]';
export const forwardButtonSelector = '[className*="audio-player__forward"]';
export const rewindButtonSelector = '[className*="audio-player__rewind"]';
export const minimisedButtonSelector = '[className*="audio-player__minimise-button"]';
export const playBackRateButtonSelector = '[className*="audio-player__control-speed"]';
export const imageSelector = '[className*="audio-player__info__image"]';
export const titleSelector = '[className*="audio-player__info__title"]';
export const seriesNameSelector = '[className*="audio-player__info__series-name"]';
export const timelineSelector = '[className*="audio-player__timeline"]';

export const classnamesHelperMock = (...classes) => classes.join(' ');
