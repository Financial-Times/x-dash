export const PLAYBACK_RATES = [1, 1.5, 0.5];

export const getNextPlaybackRate = currentRate => {
	const currentRateIndex = PLAYBACK_RATES.findIndex(value => value === currentRate);
	const nextRateIndex = currentRateIndex < PLAYBACK_RATES.length - 1 ? currentRateIndex + 1 : 0;

	return PLAYBACK_RATES[nextRateIndex];
}
