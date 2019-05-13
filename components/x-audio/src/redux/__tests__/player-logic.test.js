import { middleware, actions, initialState, reducer } from '../player-logic';
const runActions = (initialState, ...actions) => actions.reduce(reducer, initialState);

describe('actions and reducer', () => {

	test('Actions not relevant to audio have no effect on state', () => {
		const updatedState = runActions(initialState, { type: 'UNKNOWN_ACTION' });

		expect(updatedState).toBe(initialState);
	});

	test('Play action sets playing to true', () => {
		const updatedState = runActions(initialState, actions.play());

		expect(updatedState).toMatchSnapshot();
	});

	test('Pause action sets playing to false', () => {
		const updatedState = runActions(initialState, actions.play(), actions.pause());

		expect(updatedState).toMatchSnapshot();
	});

	test('Loading action sets loading to true', () => {
		const updatedState = runActions(initialState, actions.loading());

		expect(updatedState).toMatchSnapshot();
	});

	test('Loaded action sets loading to false', () => {
		const updatedState = runActions(initialState, actions.loading(), actions.loaded());

		expect(updatedState).toMatchSnapshot();
	});

	test('Update current time action updates currentTime', () => {
		const currentTime = 10;
		const updatedState = runActions(initialState, actions.updateCurrentTime({currentTime}));

		expect(updatedState).toMatchSnapshot();
	});

});

describe('middleware', () => {

	const create = (state = initialState) => {
		const store = {
			getState: jest.fn(() => state),
			dispatch: jest.fn()
		}
		const next = jest.fn();
		const audio = new Audio();
		audio.play = jest.fn();
		audio.pause = jest.fn();
		const middlewareWithNext = middleware(store, audio)(next);
		const invoke = action => middlewareWithNext(action)

		return { store, next, invoke, audio };
	}

	test('requestPlay with url sets src and plays', () => {
		const { invoke, audio } = create();
		invoke(actions.requestPlay({ url: 'https://local.ft.com/url' }));

		expect(audio.play).toHaveBeenCalled();
		expect(audio.src).toBe('https://local.ft.com/url');
	});

	test('requestPlay without url just plays', () => {
		const { invoke, audio } = create();
		const url = 'https://local.ft.com/url';
		audio.src = url;
		invoke(actions.requestPlay({}));

		expect(audio.play).toHaveBeenCalled();
		expect(audio.src).toBe(url);
	});

	test('requestPause pauses', () => {
		const { invoke, audio } = create();
		invoke(actions.requestPause());

		expect(audio.pause).toHaveBeenCalled();
	});

	test('HTML play event dispatches play action', () => {
		const { store, audio } = create();
		audio.dispatchEvent(new Event('play'));

		expect(store.dispatch).toHaveBeenCalledWith(actions.play());
	});

	test('HTML pause event dispatches pause action', () => {
		const { store, audio } = create();
		audio.dispatchEvent(new Event('pause'));

		expect(store.dispatch).toHaveBeenCalledWith(actions.pause());
	});

	[
		'waiting',
		'stalled',
		'loadstart',
		'loadedmetadata',
		'loadeddata'
	].forEach(action => {
		test(`HTML ${action} event dispatches loading action`, () => {
			const { store, audio } = create();
			audio.dispatchEvent(new Event(action));

			expect(store.dispatch).toHaveBeenCalledWith(actions.loading());
		});
	})

	test('HTML canplay event dispatches loaded action', () => {
		const { store, audio } = create();
		audio.dispatchEvent(new Event('canplay'));

		expect(store.dispatch).toHaveBeenCalledWith(actions.loaded());
	});

	test('HTML timeupdate event dispatches updateCurrentTime action', () => {
		const { store, audio } = create({ currentTime: 9 });
		audio.currentTime = 10;
		audio.dispatchEvent(new Event('timeupdate'));

		expect(store.dispatch).toHaveBeenCalledWith(actions.updateCurrentTime({currentTime: 10}));
	});

	test('updateCurrentTime action is only dispatched once per second', () => {
		const { store, audio } = create({ currentTime: 10 });
		audio.currentTime = 10.5;
		audio.dispatchEvent(new Event('timeupdate'));

		expect(store.dispatch).not.toHaveBeenCalled();
	});

});
