import {
	REQUEST_PLAY,
	REQUEST_PAUSE,
	PLAY,
	PAUSE,
	ENDED,
	WILL_CLOSE,
	EXPAND,
	MINIMISE,
	SET_PLAYBACK_RATE,
} from '../player-logic';

export class NotifiersProxy {

	getFunc(name) {
		return this.notifiers[name] || (() => {});
	}

	set(notifiers) {
		this.notifiers = notifiers;
	}

	get tracking() {
		return this.getFunc('tracking');
	}
	get play() {
		return this.getFunc('play');
	}
	get pause() {
		return this.getFunc('pause');
	}
	get ended() {
		return this.getFunc('ended');
	}
	get expand() {
		return this.getFunc('expand');
	}
	get minimise() {
		return this.getFunc('minimise');
	}
}



const notificationsMiddleware = notifiers => store => {

	const track = actionName => {
		const { loading, error } = store.getState()
		notifiers.tracking(actionName, { loading, error });
	}

	return next => action => {
		switch(action.type) {
			case REQUEST_PLAY:
				if (action.willNotify) {
					track('play-click');
				}
				break;

			case REQUEST_PAUSE:
				if (action.willNotify) {
					track('pause-click');
				}
				break;

			case WILL_CLOSE:
				track('close-click');
				break;

			case PLAY:
				if (store.getState().willPlayNotify) {
					notifiers.play();
				}
				break;

			case PAUSE:
				if (store.getState().willPauseNotify) {
					notifiers.pause();
				}
				break;

			case ENDED:
				notifiers.ended();
				break;

			case EXPAND:
				if (action.willNotify) {
					notifiers.expand();
					track('expand');
				}
				break;

			case MINIMISE:
				if (action.willNotify) {
					notifiers.minimise();
					track('minimise');
				}
				break;

			case SET_PLAYBACK_RATE:
				track('playback-rate-click');
				break;
		}
		next(action);
	}
}

export default notificationsMiddleware;
