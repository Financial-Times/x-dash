/*eslint-disable no-console */
module.exports = (data, { boolean, text }) => ({
	playing: boolean('Playing', data.playing),
	loading: boolean('Loading', data.loading),
	expanded: boolean('Expanded', data.expanded),
	title: text('Title', data.title),
	seriesName: text('Series name', data.seriesName),
	onPlay: () => console.log('Pressed play'), 
	onPause: () => console.log('Pressed pause'),
	onClose: () => console.log('Pressed pause')
});
/*eslint-enable no-console */