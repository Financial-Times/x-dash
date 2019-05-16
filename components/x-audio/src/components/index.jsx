import { h } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';
import classNameMap from './classnames-helper';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import {
	Close,
	PlayPause
} from './Buttons';
import { TimeRemaining } from './TimeRemaining'
import formatTime from './format-seconds-to-hmmss';

export const Audio = ({
	loading,
	error,
	expanded,
	playing,
	onPlayClick,
	onPauseClick,
	onCloseClick,
	title,
	seriesName,
	currentTime,
	duration
}) => (
	<div className={classNameMap('audio-player', `audio-player--${expanded ? 'expanded' : 'minimised'}`)}>
		{expanded && <button className={classNameMap('audio-player__minimise-button')} title='minimize player'/>}
		{expanded && <div className={classNameMap('audio-player__control-timeline')}><input style={{width: '100%'}} type='range'/></div>}
		{expanded && <button className={classNameMap('audio-player__rewind')} title='rewind 30 seconds'/>}
		{expanded && <button className={classNameMap('audio-player__forward')} title='forward 30 seconds'/>}
		{expanded && <button className={classNameMap('audio-player__control-speed')} title='change play speed'>x1</button>}
		{expanded && !loading && <div className={classNameMap('audio-player__info__current-time')}>{formatTime(currentTime)}</div>}
		{!expanded && <Close onClick={onCloseClick} />}
		{expanded && <div className={classNameMap('audio-player__info__image')}><img alt="dummy"/></div>}
		<div className={classNameMap('audio-player__info__title')}>{title}</div>
		<div className={classNameMap('audio-player__info__series-name')}>{expanded ? seriesName : `${seriesName}:`}</div>
		{!expanded && loading || error ? null : <TimeRemaining currentTime={currentTime} duration={duration} expanded={expanded}/>}
		{!error && loading && <Loading expanded={expanded} />}
		{error && <ErrorMessage />}
		<PlayPause onPlayClick={onPlayClick} onPauseClick={onPauseClick} playing={playing}/>
	</div>

);

Audio.propTypes = {
	expanded: PropTypes.bool.isRequired,
	playing: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired,
	onPlayClick: PropTypes.func.isRequired,
	onPauseClick: PropTypes.func.isRequired,
	onCloseClick: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	seriesName: PropTypes.string.isRequired,
	currentTime: PropTypes.number.isRequired,
	duration: PropTypes.number.isRequired
}
