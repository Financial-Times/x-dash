import OAudioTracking from '@financial-times/o-audio/dist/js/tracking';

export default class Tracking {
	constructor(audio) {
		this.audio = audio;
		this.oAudioTracking = null;
		this.context = null;
	}

	setContext(context) {
		this.context = context;
	}

	firePlayerOpenDuration(duration) {
		const event = new CustomEvent('oTracking.event', {
			detail: Object.assign({
				category: 'audio',
				action: 'close',
				open_duration: duration,
			}, this.trackingProperties),
			bubbles: true,
		});
		document.body.dispatchEvent(event);
	}

	start() {
		if (this.oAudioTracking) {
			this.finish()
		}
		this.oAudioTracking = new OAudioTracking(this.audio, this.context);
	}

	finish() {
		this.oAudioTracking.dispatchListenedEvent();
		this.oAudioTracking.destroy();
	}
}
