import { getNextPlaybackRate, PLAYBACK_RATES } from '../playback-rates';

describe('playback-rates', () => {
	test('defaults to the first rate', () => {
		const nextPlaybackRate = getNextPlaybackRate();
		expect(nextPlaybackRate).toMatchSnapshot();
	});

	test('gets the next rate', () => {
		PLAYBACK_RATES.forEach(rate => {
			const nextPlaybackRate = getNextPlaybackRate(rate);
			expect(nextPlaybackRate).toMatchSnapshot();
		});
	});

	test('loops back to the first rate when at the end', () => {
		const nextPlaybackRate = getNextPlaybackRate(PLAYBACK_RATES[PLAYBACK_RATES.length - 1]);
		expect(nextPlaybackRate).toMatchSnapshot();
	});
});
