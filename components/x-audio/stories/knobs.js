/*eslint-disable no-console */

const getKnobs = (incPrivate) => (data, { boolean, text, number, object }) => {

	const knobs = {
		title: text('Title', data.title),
		seriesName: text('Series name', data.seriesName),
		playing: boolean('Playing', data.playing),
		expanded: boolean('Expanded', data.expanded),
		url: text('Audio url', data.url),
		trackingContext: object('Tracking Context', data.trackingContext),
		onCloseClick: () => console.log('Pressed close'),
		notifiers: object('Notifiers', data.notifiers),
		options: object('Options', data.options),
	}

	if (!incPrivate) {
		return knobs;
	}

	return { ...knobs,
		duration: number('Duration', data.duration),
		currentTime: number('Current time', data.currentTime),
		loading: boolean('Loading', data.loading),
		error: boolean('Error', data.error),
		onPlayClick: () => console.log('Pressed play'),
		onPauseClick: () => console.log('Pressed pause'),
	};
};

exports.all = getKnobs(true);
exports.publicKnobs = getKnobs(false);

/*eslint-enable no-console */
