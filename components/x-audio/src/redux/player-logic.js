import Tracking from './tracking'
import { idempotentUpdate } from './utils';

// intial state
export const initialState = {
	playing: false,
	loading: false,
	duration: 0,
	error: false,
	currentTime: 0,
	ended: false,
	willPlayNotify: true,
	willPauseNotify: true,
	expanded: false,
	playbackRate: 1,
	seeking: false,
	scrubbing: false
}

export const REQUEST_PLAY = 'REQUEST_PLAY';
export const REQUEST_PAUSE = 'REQUEST_PAUSE';
export const PLAY = 'PLAY';
export const PAUSE = 'PAUSE';
export const LOADING = 'LOADING';
export const LOADED = 'LOADED';
export const UPDATE_DURATION = 'UPDATE_DURATION';
export const ERROR = 'ERROR';
export const UPDATE_CURRENT_TIME = 'UPDATE_CURRENT_TIME';
export const REQUEST_UPDATE_CURRENT_TIME = 'REQUEST_UPDATE_CURRENT_TIME';
export const ENDED = 'ENDED';
export const LOAD_MEDIA = 'LOAD_MEDIA';
export const WILL_CLOSE = 'WILL_CLOSE';
export const EXPAND = 'EXPAND';
export const MINIMISE = 'MINIMISE';
export const SET_PLAYBACK_RATE = 'SET_PLAYBACK_RATE';
export const SEEKING = 'SEEKING';
export const SEEKED = 'SEEKED';
export const UPDATE_SCRUBBING = 'UPDATE_SCRUBBING';

// reducer
export function reducer (state = initialState, action) {
	switch (action.type) {
		case LOAD_MEDIA:
			return { ...initialState };
		case PLAY:
			return idempotentUpdate(state, { playing: true, ended: false });
		case PAUSE:
			return idempotentUpdate(state, { playing: false });
		case LOADING:
			return idempotentUpdate(state, { loading: true, error: false });
		case LOADED:
			return idempotentUpdate(state, { loading: false });
		case UPDATE_DURATION:
			return idempotentUpdate(state, { duration: action.duration });
		case ERROR:
			return idempotentUpdate(state, { error: true, loading: false, playing: false });
		case UPDATE_CURRENT_TIME:
			return idempotentUpdate(state, { currentTime: action.currentTime });
		case ENDED:
			return idempotentUpdate(state, { ended: true });
		case REQUEST_PLAY:
			return idempotentUpdate(state, { ended: false, willPlayNotify: action.willNotify  });
		case REQUEST_PAUSE:
			return idempotentUpdate(state, { willPauseNotify: action.willNotify  });
		case EXPAND:
			return idempotentUpdate(state, { expanded: true });
		case MINIMISE:
			return idempotentUpdate(state, { expanded: false });
		case SET_PLAYBACK_RATE:
			return idempotentUpdate(state, { playbackRate: action.playbackRate });
		case SEEKING:
			return idempotentUpdate(state, { seeking: true });
		case SEEKED:
			return idempotentUpdate(state, { seeking: false });
		case UPDATE_SCRUBBING:
			return idempotentUpdate(state, { scrubbing: action.isScrubbing });
		default:
			return state;
	}
}


// actions
export const actions = {
	loadMedia: ({ url, trackingContext = {}, autoplay = false }) => ({
		type: LOAD_MEDIA,
		url,
		trackingContext,
		autoplay
	}),
	play: () => ({
		type: PLAY
	}),
	pause: () => ({
		type: PAUSE
	}),
	requestPlay: ({ willNotify = true } = {}) => ({
		type: REQUEST_PLAY,
		willNotify
	}),
	requestPause: ({ willNotify = true } = {}) => ({
		type: REQUEST_PAUSE,
		willNotify
	}),
	loading: () => ({
		type: LOADING
	}),
	loaded: () => ({
		type: LOADED
	}),
	updateDuration: ({ duration }) => ({
		type: UPDATE_DURATION,
		duration
	}),
	error: () => ({
		type: ERROR
	}),
	updateCurrentTime: ({ currentTime }) => ({
		type: UPDATE_CURRENT_TIME,
		currentTime
	}),
	requestUpdateCurrentTime: ({ currentTime }) => ({
		type: REQUEST_UPDATE_CURRENT_TIME,
		currentTime
	}),
	ended: () => ({
		type: ENDED
	}),
	willClose: () => ({
		type: WILL_CLOSE
	}),
	expand: ({ willNotify = true } = {}) => ({
		type: EXPAND,
		willNotify
	}),
	minimise: ({ willNotify = true } = {}) => ({
		type: MINIMISE,
		willNotify
	}),
	setPlaybackRate: ({ playbackRate }) => ({
		type: SET_PLAYBACK_RATE,
		playbackRate
	}),
	seeking: () => ({
		type: SEEKING
	}),
	seeked: () => ({
		type: SEEKED
	}),
	updateScrubbing: ({ isScrubbing }) => ({
		type: UPDATE_SCRUBBING,
		isScrubbing
	})
}


// middleware
export const middleware = (store, audio = new Audio()) => {

	audio.preload = 'metadata';

	// debuging
	// [
	// 	'loadeddata',
	// 	'loadedmetadata',
	// 	'loadstart',
	// 	'progress',
	// 	'canplay',
	// 	'canplaythrough',
	// 	'error'
	// ].forEach(evtName => {
	// 	audio.addEventListener(evtName, () => {
	// 		console.log('audio eventy', evtName);
	// 	});
	// });

	audio.addEventListener('play', () => store.dispatch(actions.play()));

	audio.addEventListener('pause', () => store.dispatch(actions.pause()));

	// loading / loaded events
	audio.addEventListener('waiting', () => store.dispatch(actions.loading()));
	audio.addEventListener('stalled', () => store.dispatch(actions.loading()));
	audio.addEventListener('loadstart', () => store.dispatch(actions.loading()));
	audio.addEventListener('loadeddata', () => store.dispatch(actions.loading()));
	audio.addEventListener('canplaythrough', () => store.dispatch(actions.loaded()));
	audio.addEventListener('playing', () => store.dispatch(actions.loaded()));

	audio.addEventListener('durationchange', () => {
		store.dispatch(actions.updateDuration({ duration: audio.duration }));
	});

	audio.addEventListener('error', () => store.dispatch(actions.error()));

	audio.addEventListener('timeupdate', () => {
		const state = store.getState();
		const newCurrentTime = Math.floor(audio.currentTime);

		if (state.currentTime !== newCurrentTime) {
			store.dispatch(actions.updateCurrentTime({ currentTime: newCurrentTime }));
		}
	});

	audio.addEventListener('seeking', () => store.dispatch(actions.seeking()));

	audio.addEventListener('seeked', () => store.dispatch(actions.seeked()));

	audio.addEventListener('ended', () => store.dispatch(actions.ended()));

	const tracking = new Tracking(audio);

	return next => action => {
		switch (action.type) {
			case LOAD_MEDIA:
				audio.src = action.url;
				tracking.start(action.trackingContext);
				if (action.autoplay) {
					store.dispatch(actions.requestPlay({ willNotify: false }));
				}
				break;
			case REQUEST_PLAY:
			// eslint-disable-next-line no-case-declarations
				const state = store.getState();
				if (state.error) {
					audio.load();
					audio.currentTime = state.currentTime;
				}
				audio.play();
				break;
			case REQUEST_PAUSE:
				audio.pause();
				break;
			case WILL_CLOSE:
				store.dispatch(actions.requestPause({ willNotify: false }));
				tracking.finish();
				break;
			case SET_PLAYBACK_RATE:
				audio.playbackRate = action.playbackRate;
				break;
			case REQUEST_UPDATE_CURRENT_TIME:
				audio.currentTime = action.currentTime;
				break;
		}
		next(action);
	}
}
