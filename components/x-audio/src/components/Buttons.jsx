import { h } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';
import classNameMap from './classnames-helper';

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
	<button aria-label='Close this player.' className={classNameMap('audio-player__close')} onClick={() => onClick()}/>
)

Close.propTypes = {
	onClick: PropTypes.func.isRequired
}
