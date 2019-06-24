import { h } from '@financial-times/x-engine';
import classNameMap from './classnames-helper';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import { ClickableContainer } from './ClickableContainer'
import { PlaybackRate } from './PlaybackRate';
import { Close, PlayPause, Forward, Rewind } from './Buttons';
import { Timeline } from './Timeline';
import { TimeRemaining } from './TimeRemaining';
import { Marquee } from './Marquee';
import { Image } from './Image';

const Title = ({ text }) => <Marquee className={classNameMap('audio-player__info__title')} text={text} />
const SeriesName = ({ text }) => <Marquee className={classNameMap('audio-player__info__series-name')} text={text} />

export const ExpandedPlayer = ({
	loading,
	error,
	playing,
	onPlayClick,
	onPauseClick,
	onMinimise,
	onPlaybackRateClick,
	updateCurrentTime,
	title,
	seriesName,
	imageDataSet,
	currentTime,
	duration,
	setExpandedPlayerRef,
	playbackRate,
	seeking,
}) => (
	<div className={classNameMap('audio-player', 'audio-player--expanded')} ref={setExpandedPlayerRef}>
		<button onClick={() => onMinimise()} className={classNameMap('audio-player__minimise-button')} aria-label='minimize player'/>

		<Rewind currentTime={currentTime} updateCurrentTime={updateCurrentTime} />
		<Forward currentTime={currentTime} updateCurrentTime={updateCurrentTime} duration={duration} />
		<PlaybackRate rate={playbackRate} onClick={newRate => onPlaybackRateClick({ playbackRate: newRate })} />
		<Image imageDataSet={imageDataSet} />
		<Title text={title} />
		<SeriesName text={seriesName} />
		<Timeline
			currentTime={currentTime}
			duration={duration}
			updateCurrentTime={updateCurrentTime}
			loading={loading}
			seeking={seeking}
			error={error}
		/>
		<PlayPause onPlayClick={onPlayClick} onPauseClick={onPauseClick} playing={playing} />
	</div>
);


export const MinimisedPlayer = ({
	loading,
	error,
	playing,
	onPlayClick,
	onPauseClick,
	title,
	seriesName,
	currentTime,
	duration,
	onExpand,
	onCloseClick,
	options
}) => (
	<ClickableContainer
		className={classNameMap('audio-player', 'audio-player--minimised')}
		onClick={options.canExpand ? onExpand : () => {}}>
		<Close onClick={onCloseClick} />
		<Marquee text={`${seriesName}: ${title}`} className={classNameMap('audio-player__info__series-name')} />
		{error ? <ErrorMessage /> : (
			loading ? <Loading /> : <TimeRemaining currentTime={currentTime} duration={duration} />
		)}
		<PlayPause onPlayClick={onPlayClick} onPauseClick={onPauseClick} playing={playing} />
	</ClickableContainer>
);
