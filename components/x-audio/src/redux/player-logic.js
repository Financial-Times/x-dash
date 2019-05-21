import Tracking from './tracking'
// intial state
export const initialState = {
	playing: false,
	loading: false,
	duration: 0,
	error: false,
	currentTime: 0,
	ended: false,
	isPlayInternal: true,
	isPauseInternal: true
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
export const ENDED = 'ENDED';
export const LOAD_MEDIA = 'LOAD_MEDIA';
export const WILL_CLOSE = 'WILL_CLOSE';


// reducer
export function reducer (state = initialState, action) {
	switch (action.type) {
		case LOAD_MEDIA:
			return { ... initialState };
		case PLAY:
			return { ...state, playing: true, ended: false };
		case PAUSE:
			return { ...state, playing: false };
		case LOADING:
			return { ...state, loading: true, error: false };
		case LOADED:
			return { ...state, loading: false };
		case UPDATE_DURATION:
			return { ...state, duration: action.duration };
		case ERROR:
			return { ...state, error: true, loading: false, playing: false };
		case UPDATE_CURRENT_TIME:
			return { ...state, currentTime: action.currentTime };
		case ENDED:
			return { ...state, ended: true };
		case REQUEST_PLAY:
			return { ...state, ended: false, isPlayInternal: action.isInternal  };
		case REQUEST_PAUSE:
			return { ...state, isPauseInternal: action.isInternal  };
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
	requestPlay: ({ isInternal = true } = {}) => ({
		type: REQUEST_PLAY,
		isInternal
	}),
	requestPause: ({ isInternal = true } = {}) => ({
		type: REQUEST_PAUSE,
		isInternal
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
	ended: () => ({
		type: ENDED
	}),
	willClose: () => ({
		type: WILL_CLOSE
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
	audio.addEventListener('canplay', () => store.dispatch(actions.loaded()));

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

	audio.addEventListener('ended', () => store.dispatch(actions.ended()));


	const tracking = new Tracking(audio);

	return next => action => {
		switch (action.type) {
			case LOAD_MEDIA:
				audio.src = action.url;
				tracking.start(action.trackingContext);
				if (action.autoplay) {
					store.dispatch(actions.requestPlay());
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
				store.dispatch(actions.requestPause());
				tracking.finish();
				break;
		}
		next(action);
	}
}
