// intial state
export const initialState = {
	playing: false,
	loading: false
}

// reducer
export function reducer (state = initialState, action) {
	switch (action.type) {
		case 'PLAY':
			return {...state, playing: true }
		case 'PAUSE':
			return {...state, playing: false }
		case 'LOADING': {
			return {...state, loading: true}
		}
		case 'LOADED': {
			return {...state, loading: false}
		}
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
	requestPlay: ({ url } = {}) => ({
		type: 'REQUEST_PLAY',
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
}


// middleware
export const middleware = store => {

	const audio = new Audio();
	audio.preload = 'none';

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

	return next => action => {
		switch (action.type) {
			case 'REQUEST_PLAY':
				if (action.url) audio.src = action.url;
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
