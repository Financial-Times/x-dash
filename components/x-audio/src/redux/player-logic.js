// intial state
export const initialState = {
	playing: false,
	loading: false,
	currentTime: 0
}

// reducer
export function reducer (state = initialState, action) {
	switch (action.type) {
		case 'PLAY':
			return {...state, playing: true };
		case 'PAUSE':
			return {...state, playing: false };
		case 'LOADING':
			return {...state, loading: true };
		case 'LOADED':
			return {...state, loading: false };
		case 'UPDATE_CURRENT_TIME':
			return {...state, currentTime: action.currentTime };
		default:
			return state;
	}
}


// actions
export const actions = {
	play: () => ({
		type: 'PLAY'
	}),
	pause: () => ({
		type: 'PAUSE'
	}),
	requestPlay: () => ({
		type: 'REQUEST_PLAY'
	}),
	requestLoadURL: ({ url } = {}) => ({
		type: 'REQUEST_LOAD_URL',
		url
	}),
	requestPause: () => ({
		type: 'REQUEST_PAUSE'
	}),
	loading: () => ({
		type: 'LOADING'
	}),
	loaded: () => ({
		type: 'LOADED'
	}),
	updateCurrentTime: ({ currentTime }) => ({
		type: 'UPDATE_CURRENT_TIME',
		currentTime
	})
}


// middleware
export const middleware = (store, audio = new Audio()) => {

	audio.preload = 'metadata';

	// debuging
	[
		'loadeddata',
		'loadedmetadata',
		'loadstart',
		'progress',
		'canplay',
		'canplaythrough'
	].forEach(evtName => {
		audio.addEventListener(evtName, () => {
			// console.log('audio eventy', evtName);
		});
	});

	audio.addEventListener('play', () => store.dispatch(actions.play()));

	audio.addEventListener('pause', () => store.dispatch(actions.pause()));

	// loading / loaded events
	audio.addEventListener('waiting', () => store.dispatch(actions.loading()));
	audio.addEventListener('stalled', () => store.dispatch(actions.loading()));
	audio.addEventListener('loadstart', () => store.dispatch(actions.loading()));
	audio.addEventListener('loadedmetadata', () => store.dispatch(actions.loading()));
	audio.addEventListener('loadeddata', () => store.dispatch(actions.loading()));
	audio.addEventListener('canplay', () => store.dispatch(actions.loaded()));

	audio.addEventListener('timeupdate', () => {
		const state = store.getState();
		const newCurrentTime = Math.floor(audio.currentTime);

		if (state.currentTime !== newCurrentTime) {
			store.dispatch(actions.updateCurrentTime({ currentTime: newCurrentTime }));
		}
	});

	return next => action => {
		switch (action.type) {
			case 'REQUEST_LOAD_URL':
				audio.src = action.url;
				break;
			case 'REQUEST_PLAY':
				audio.play();
				break;
			case 'REQUEST_PAUSE':
				audio.pause();
				break;
		}
		next(action);
	}
}

// debug
