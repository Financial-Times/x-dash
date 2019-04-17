module.exports = (data, { boolean }) => ({
	playing: boolean('Playing', data.playing),
	loading: boolean('Loading', data.loading),
	expanded: boolean('Expanded', data.expanded),
	title: boolean('Title', data.title),
	seriesName: boolean('Series name', data.seriesName),
	onPlay: () => console.log('Pressed play'),
	onPause: () => console.log('Pressed pause'),
	onClose: () => console.log('Pressed pause')
});
