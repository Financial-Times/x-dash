import middleware, { NotifiersProxy } from '../../middleware/notifier';
import { actions, initialState } from '../../player-logic';


const create = (currentState = {}) => {
	const state = { ...initialState, ...currentState };
	const store = {
		getState: () => state,
		dispatch: jest.fn()
	}
	const next = jest.fn();

	const notifier = {
		play: jest.fn(),
		pause: jest.fn(),
		ended: jest.fn(),
		tracking: jest.fn(),
		expand: jest.fn(),
		minimise: jest.fn()
	}

	const middlewareWithNext = middleware(notifier)(store)(next);
	const invoke = action => middlewareWithNext(action)
	return { store, next, invoke, notifier };
}

describe('Notifier middleware', () => {

	test('just calls next for unknown actions', () => {
		const { invoke, next } = create();
		const action = { type: 'OTHER_PLAYER_ACTION' }
		invoke(action);
		expect(next).toHaveBeenCalledWith(action);
	});

	test(`PLAY action triggers play notification`, () => {
		const { invoke, notifier, next } = create();
		const action = actions.play();
		invoke(action);
		expect(notifier.play).toHaveBeenCalled();
		expect(next).toHaveBeenCalledWith(action);
	});

	test('PLAY action with willPlayNotifty=false does not trigger play notification', () => {
		const { invoke, notifier, next } = create({ willPlayNotify: false });
		const action = actions.play();
		invoke(action);
		expect(notifier.play).not.toHaveBeenCalled();
		expect(next).toHaveBeenCalledWith(action);
	});

	test(`PAUSE action triggers pause notification`, () => {
		const { invoke, notifier, next } = create();
		const action = actions.pause();
		invoke(action);
		expect(notifier.pause).toHaveBeenCalled();
		expect(next).toHaveBeenCalledWith(action);
	});

	test('PAUSE action with willPlayNotifty=false does not trigger pause notification', () => {
		const { invoke, notifier, next } = create({ willPauseNotify: false });
		const action = actions.pause();
		invoke(action);
		expect(notifier.pause).not.toHaveBeenCalled();
		expect(next).toHaveBeenCalledWith(action);
	});

	test(`ENDED action triggers ended notification`, () => {
		const { invoke, notifier, next } = create();
		const action = actions.ended();
		invoke(action);
		expect(notifier.ended).toHaveBeenCalled();
		expect(next).toHaveBeenCalledWith(action);
	});

	describe('tracking', () => {
		const state = { loading: true, error: false };

		test(`REQUEST_PLAY action triggers tracking notification`, () => {
			const { invoke, notifier, next } = create(state);
			const action = actions.requestPlay()
			invoke(action);
			expect(notifier.tracking).toHaveBeenCalledWith('play-click', state)
			expect(next).toHaveBeenCalledWith(action);
		});

		test('REQUEST_PLAY with willNotify=false does not trigger tracking notification', () => {
			const { invoke, notifier, next } = create();
			const action = actions.requestPlay({ willNotify: false });
			invoke(action);
			expect(notifier.play).not.toHaveBeenCalled();
			expect(next).toHaveBeenCalledWith(action);
		});

		test(`REQUEST_PAUSE action triggers tracking notification`, () => {
			const { invoke, notifier, next } = create(state);
			const action = actions.requestPause()
			invoke(action);
			expect(notifier.tracking).toHaveBeenCalledWith('pause-click', state)
			expect(next).toHaveBeenCalledWith(action);
		});

		test('REQUEST_PAUSE with willNotify=false does not trigger tracking notification', () => {
			const { invoke, notifier, next } = create();
			const action = actions.requestPause({ willNotify: false });
			invoke(action);
			expect(notifier.pause).not.toHaveBeenCalled();
			expect(next).toHaveBeenCalledWith(action);
		});

		test(`WILL_CLOSE action triggers tracking notification`, () => {
			const { invoke, notifier, next } = create(state);
			const action = actions.willClose()
			invoke(action);
			expect(notifier.tracking).toHaveBeenCalledWith('close-click', state)
			expect(next).toHaveBeenCalledWith(action);
		});

		test(`EXPAND action triggers tracking notification`, () => {
			const { invoke, notifier, next } = create(state);
			const action = actions.expand()
			invoke(action);
			expect(notifier.expand).toHaveBeenCalled();
			expect(notifier.tracking).toHaveBeenCalledWith('expand', state)
			expect(next).toHaveBeenCalledWith(action);
		});

		test('EXPAND with willNotify=false does not trigger tracking notification', () => {
			const { invoke, notifier } = create();
			const action = actions.expand({ willNotify: false });
			invoke(action);
			expect(notifier.expand).not.toHaveBeenCalled();
			expect(notifier.tracking).not.toHaveBeenCalled();
		});


		test(`MINIMISE action triggers tracking notification`, () => {
			const { invoke, notifier, next } = create(state);
			const action = actions.minimise()
			invoke(action);
			expect(notifier.minimise).toHaveBeenCalled();
			expect(notifier.tracking).toHaveBeenCalledWith('minimise', state)
			expect(next).toHaveBeenCalledWith(action);
		});

		test('MINIMISE with willNotify=false does not trigger tracking notification', () => {
			const { invoke, notifier } = create();
			const action = actions.minimise({ willNotify: false });
			invoke(action);
			expect(notifier.minimise).not.toHaveBeenCalled();
			expect(notifier.tracking).not.toHaveBeenCalled();
		});

		test(`SET_PLAYBACK_RATE action triggers tracking notification`, () => {
			const { invoke, notifier, next } = create(state);
			const action = actions.setPlaybackRate(1.5)
			invoke(action);
			expect(notifier.tracking).toHaveBeenCalledWith('playback-rate-click', state)
			expect(next).toHaveBeenCalledWith(action);
		});
	});

});

describe('NotifiersProxy', () => {
	test('Notifier calls play', () => {
		const play = jest.fn()
		const notifiers = new NotifiersProxy()
		notifiers.set({ play });
		notifiers.play();
		expect(play).toHaveBeenCalled();
	});
	test('Notifier calls pause', () => {
		const pause = jest.fn()
		const notifiers = new NotifiersProxy()
		notifiers.set({ pause });
		notifiers.pause();
		expect(pause).toHaveBeenCalled();
	});
	test('Notifier calls tracking', () => {
		const tracking = jest.fn()
		const notifiers = new NotifiersProxy()
		notifiers.set({ tracking });
		notifiers.tracking('payload');
		expect(tracking).toHaveBeenCalledWith('payload');
	});
	test('Notifier calls expand', () => {
		const expand = jest.fn()
		const notifiers = new NotifiersProxy()
		notifiers.set({ expand });
		notifiers.expand();
		expect(expand).toHaveBeenCalledWith();
	});
	test('Notifier calls minimise', () => {
		const minimise = jest.fn()
		const notifiers = new NotifiersProxy()
		notifiers.set({ minimise });
		notifiers.minimise();
		expect(minimise).toHaveBeenCalledWith();
	});
});
