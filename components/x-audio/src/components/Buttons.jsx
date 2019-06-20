import { h } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';
import classNameMap from './classnames-helper';

const SKIP_SECONDS_AMOUNT = 30;

export const PlayPause = ({
	onPlayClick,
	onPauseClick,
	playing
}) => (
	<button
		className={classNameMap('audio-player__play-pause', `audio-player__play-pause--${playing ? 'pause' : 'play'}`)}
		aria-label={playing ? 'pause' : 'play'}
		onClick={playing ? () => onPauseClick() : () => onPlayClick()}/>
)

PlayPause.propTypes = {
	onPlayClick: PropTypes.func.isRequired,
	onPauseClick: PropTypes.func.isRequired,
	playing: PropTypes.bool.isRequired
}

export const Close = ({
	onClick
}) => (
	<button aria-label='Close this player.' className={classNameMap('audio-player__close')} onClick={onClick}/>
)

Close.propTypes = {
	onClick: PropTypes.func.isRequired
}

export const Forward = ({
	currentTime,
	updateCurrentTime,
	duration
}) => (
	<button
		className={classNameMap('audio-player__forward')}
		aria-label={`forward ${SKIP_SECONDS_AMOUNT} seconds`}
		onClick={() => {
			const forwardedTime = currentTime + SKIP_SECONDS_AMOUNT;
			const newCurrentTime = duration > forwardedTime ? forwardedTime : duration;
			updateCurrentTime({ currentTime: newCurrentTime });
		}}/>
)

Forward.propTypes = {
	currentTime: PropTypes.number.isRequired,
	updateCurrentTime: PropTypes.func.isRequired,
	duration: PropTypes.number.isRequired
}

export const Rewind = ({
	currentTime,
	updateCurrentTime
}) => (
	<button
		className={classNameMap('audio-player__rewind')}
		aria-label={`rewind ${SKIP_SECONDS_AMOUNT} seconds`}
		onClick={() => {
			const rewindedTime = currentTime - SKIP_SECONDS_AMOUNT;
			const newCurrentTime = rewindedTime > 0 ? rewindedTime : 0;
			updateCurrentTime({ currentTime: newCurrentTime });
		}}/>
)

Rewind.propTypes = {
	currentTime: PropTypes.number.isRequired,
	updateCurrentTime: PropTypes.func.isRequired
}
