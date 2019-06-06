import { h } from '@financial-times/x-engine';
import classNameMap from './classnames-helper';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import { TimeRemaining } from './TimeRemaining'
import formatTime from './format-seconds-to-hmmss';
import { ClickableContainer } from './ClickableContainer'
import {
	Close,
	PlayPause
} from './Buttons';


const Title = ({ text }) => <div className={classNameMap('audio-player__info__title')}>{text}</div>
const SeriesName = ({ text }) => <div className={classNameMap('audio-player__info__series-name')}>{text}</div>

export const ExpandedPlayer = ({
	loading,
	error,
	playing,
	onPlayClick,
	onPauseClick,
	onMinimise,
	title,
	seriesName,
	currentTime,
	duration,
	setExpandedPlayerRef,
}) => (
	<div className={classNameMap('audio-player', 'audio-player--expanded')} ref={setExpandedPlayerRef}>
		<button onClick={() => onMinimise()} className={classNameMap('audio-player__minimise-button')} aria-label='minimize player'/>
		<div className={classNameMap('audio-player__control-timeline')}><input style={{width: '100%'}} type='range'/></div>
		<button className={classNameMap('audio-player__rewind')} aria-label='rewind 30 seconds'/>
		<button className={classNameMap('audio-player__forward')} aria-label='forward 30 seconds'/>
		<button className={classNameMap('audio-player__control-speed')} aria-label='change play speed'>x1</button>
		{!loading && <div className={classNameMap('audio-player__info__current-time')}>{formatTime(currentTime)}</div>}
		<div className={classNameMap('audio-player__info__image')}><img alt="dummy"/></div>
		<Title text={title} />
		<SeriesName text={seriesName} />
		<TimeRemaining currentTime={currentTime} duration={duration} expanded />
		{!error && loading && <Loading expanded />}
		{error && <ErrorMessage />}
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
		<Title text={title} />
		<SeriesName text={`${seriesName}:`} />
		{error ? <ErrorMessage /> : (
			loading ? <Loading /> : <TimeRemaining currentTime={currentTime} duration={duration} />
		)}
		<PlayPause onPlayClick={onPlayClick} onPauseClick={onPauseClick} playing={playing} />
	</ClickableContainer>
);
