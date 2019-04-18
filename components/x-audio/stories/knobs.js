module.exports = (data, { boolean }) => ({
	playing: boolean('Playing', data.playing),
	loading: boolean('Loading', data.loading),
	onPlay: () => {
		// console.log('Pressed play')
	},
	onPause: () => {
		// console.log('Pressed pause')
	}
});
