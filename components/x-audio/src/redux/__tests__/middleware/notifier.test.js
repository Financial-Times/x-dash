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
		tracking: jest.fn()
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
		expect(next).toBeCalledWith(action);
	});

	test(`PLAY action triggers play notification`, () => {
		const { invoke, notifier, next } = create();
		const action = actions.play();
		invoke(action);
		expect(notifier.play).toHaveBeenCalled();
		expect(next).toBeCalledWith(action);
	});

	test('PLAY action with willPlayNotifty=false does not trigger play notification', () => {
		const { invoke, notifier, next } = create({ willPlayNotify: false });
		const action = actions.play();
		invoke(action);
		expect(notifier.play).not.toHaveBeenCalled();
		expect(next).toBeCalledWith(action);
	});

	test(`PAUSE action triggers pause notification`, () => {
		const { invoke, notifier, next } = create();
		const action = actions.pause();
		invoke(action);
		expect(notifier.pause).toHaveBeenCalled();
		expect(next).toBeCalledWith(action);
	});

	test('PAUSE action with willPlayNotifty=false does not trigger pause notification', () => {
		const { invoke, notifier, next } = create({ willPauseNotify: false });
		const action = actions.pause();
		invoke(action);
		expect(notifier.pause).not.toHaveBeenCalled();
		expect(next).toBeCalledWith(action);
	});

	test(`ENDED action triggers ended notification`, () => {
		const { invoke, notifier, next } = create();
		const action = actions.ended();
		invoke(action);
		expect(notifier.ended).toHaveBeenCalled();
		expect(next).toBeCalledWith(action);
	});

	describe('tracking', () => {
		const state = { loading: true, error: false };

		test(`REQUEST_PLAY action triggers tracking notification`, () => {
			const { invoke, notifier, next } = create(state);
			const action = actions.requestPlay()
			invoke(action);
			expect(notifier.tracking).toHaveBeenCalledWith('play-click', state)
			expect(next).toBeCalledWith(action);
		});

		test('REQUEST_PLAY with willNotify=false does not trigger tracking notification', () => {
			const { invoke, notifier, next } = create();
			const action = actions.requestPlay({ willNotify: false });
			invoke(action);
			expect(notifier.play).not.toHaveBeenCalled();
			expect(next).toBeCalledWith(action);
		});

		test(`REQUEST_PAUSE action triggers tracking notification`, () => {
			const { invoke, notifier, next } = create(state);
			const action = actions.requestPause()
			invoke(action);
			expect(notifier.tracking).toHaveBeenCalledWith('pause-click', state)
			expect(next).toBeCalledWith(action);
		});

		test('REQUEST_PAUSE with willNotify=false does not trigger tracking notification', () => {
			const { invoke, notifier, next } = create();
			const action = actions.requestPause({ willNotify: false });
			invoke(action);
			expect(notifier.pause).not.toHaveBeenCalled();
			expect(next).toBeCalledWith(action);
		});

		test(`WILL_CLOSE action triggers tracking notification`, () => {
			const { invoke, notifier, next } = create(state);
			const action = actions.willClose()
			invoke(action);
			expect(notifier.tracking).toHaveBeenCalledWith('close-click', state)
			expect(next).toBeCalledWith(action);
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
});