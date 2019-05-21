import middleware, { Notifier } from '../../middleware/notifications';
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

describe('Notification middleware', () => {
	
	test('just calls next for unknown actions', () => {
		const { invoke, next } = create();
		const action = { type: 'OTHER_PLAYER_ACTION' }
		invoke(action);
		expect(next).toBeCalledWith(action);
	});

	[
		[ actions.play(), 'play' ],
		[ actions.pause(), 'pause' ],
		[ actions.ended(), 'ended' ],
		[ actions.requestPlay(), 'tracking', { action: 'play' } ],
		[ actions.requestPause(), 'tracking', { action: 'pause' } ],
	].forEach(([ action, notifyFn, payload ]) => {
		test(`${action.type} action triggers ${notifyFn} notification`, () => {
			const { invoke, notifier, next } = create();
			invoke(action);
			payload ? expect(notifier[notifyFn]).toHaveBeenCalledWith(payload)
					: expect(notifier[notifyFn]).toHaveBeenCalled();
			expect(next).toBeCalledWith(action);
		});
	});

	test('external PLAY actions not trigger play notification', () => {
		const { invoke, notifier, next } = create({ isPlayExternal: true });
		const action = actions.play();
		invoke(action);
		expect(notifier.play).not.toHaveBeenCalled();
		expect(next).toBeCalledWith(action);
	});
	test('external PAUSE actions not trigger pause notification', () => {
		const { invoke, notifier, next } = create({ isPauseExternal: true });
		const action = actions.pause();
		invoke(action);
		expect(notifier.pause).not.toHaveBeenCalled();
		expect(next).toBeCalledWith(action);
	});
});

describe('Notifier', () => {
	test('Notifier calls play', () => {
		const play = jest.fn()
		const notifier = new Notifier()
		notifier.setNotifiers({ play });
		notifier.play();
		expect(play).toHaveBeenCalled();
	});
	test('Notifier calls pause', () => {
		const pause = jest.fn()
		const notifier = new Notifier()
		notifier.setNotifiers({ pause });
		notifier.pause();
		expect(pause).toHaveBeenCalled();
	});
	test('Notifier calls tracking', () => {
		const tracking = jest.fn()
		const notifier = new Notifier()
		notifier.setNotifiers({ tracking });
		notifier.tracking('payload');
		expect(tracking).toHaveBeenCalledWith('payload');
	});
});