import { h } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';
import cn from './classnames-helper';

export const PlayPause = ({
	onPlayClick,
	onPauseClick,
	playing
}) => (
	playing ? (
		<button className={cn('audio-player__play-pause')} onClick={onPauseClick}>Pause</button>
	) : (
		<button className={cn('audio-player__play-pause')} onClick={onPlayClick}>Play</button>
	)
)

PlayPause.propTypes = {
	onPlayClick: PropTypes.func.isRequired,
	onPauseClick: PropTypes.func.isRequired,
	playing: PropTypes.bool.isRequired
}

export const Close = ({
	onClick
}) => (
	<button className={cn('audio-player__close')} onClick={onClick}>Close</button>
)

Close.propTypes = {
	onClick: PropTypes.func.isRequired
}
