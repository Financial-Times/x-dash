import {
	REQUEST_PLAY,
	REQUEST_PAUSE,
	PLAY,
	PAUSE,
	ENDED,
	WILL_CLOSE
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
}



const notificationsMiddleware = notifiers => store => {

	const track = actionName => {
		const { loading, error } = store.getState()
		notifiers.tracking(actionName, { loading, error });
	}

	return next => action => {
		switch(action.type) {
			case REQUEST_PLAY:
				if (action.isInternal) {
					track('play-click');
				}
				break;

			case REQUEST_PAUSE:
				if (action.isInternal) {
					track('pause-click');
				}
				break;

			case WILL_CLOSE:
				track('close-click');
				break;

			case PLAY:
				if (store.getState().isPlayInternal) {
					notifiers.play();
				}
				break;

			case PAUSE:
				if (store.getState().isPauseInternal) {
					notifiers.pause();
				}
				break;

			case ENDED:
				notifiers.ended();
				break;
		}
		next(action);
	}
}

export default notificationsMiddleware;
