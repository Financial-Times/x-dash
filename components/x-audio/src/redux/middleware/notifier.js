import {
	REQUEST_PLAY,
	REQUEST_PAUSE,
	PLAY,
	PAUSE,
	ENDED
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
	return next => action => {
		switch(action.type) {
			case REQUEST_PLAY:
				if (action.isInternal) {
					const { loading } = store.getState()
					notifiers.tracking('play', { loading });
				}
				break;

			case REQUEST_PAUSE:
				if (action.isInternal) {
					const { loading } = store.getState()
					notifiers.tracking('pause', { loading });
				}
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
