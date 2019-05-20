import { Tracking as OAudioTracking } from '@financial-times/o-audio';

export default class Tracking {
	constructor(audio) {
		this.audio = audio;
		this.oAudioTracking = null;
	}

	start(context) {
		if (this.oAudioTracking) {
			this.finish();
		}
		this.oAudioTracking = new OAudioTracking(this.audio, context);
	}

	finish() {
		this.oAudioTracking.dispatchListenedEvent();
		this.oAudioTracking.destroy();
	}
}
