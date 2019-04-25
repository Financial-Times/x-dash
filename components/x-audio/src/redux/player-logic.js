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
}


// middleware
export const middleware = store => {

	const audio = new Audio();
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
			console.log('audio eventy', evtName);
		});
	});

	audio.addEventListener('play', () => store.dispatch(actions.play()));

	audio.addEventListener('pause', () => store.dispatch(actions.pause()));

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
