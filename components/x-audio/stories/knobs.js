/*eslint-disable no-console */
module.exports = (data, { boolean, text, number }) => ({
	playing: boolean('Playing', data.playing),
	loading: boolean('Loading', data.loading),
	expanded: boolean('Expanded', data.expanded),
	title: text('Title', data.title),
	seriesName: text('Series name', data.seriesName),
	currentTime: number('Current time', data.currentTime),
	duration: number('Duration', data.duration),
	onPlayClick: () => console.log('Pressed play'),
	onPauseClick: () => console.log('Pressed pause'),
	onCloseClick: () => console.log('Pressed pause')
});
/*eslint-enable no-console */
