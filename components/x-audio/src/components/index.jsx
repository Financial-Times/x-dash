import { h } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';
import cn from './classnames-helper';
import {
	Close,
	PlayPause
} from './Buttons'

export const Audio = ({
	expanded,
	playing,
	onPlay,
	onPause,
	onClose,
	title,
	seriesName
}) => (
	<div className={cn('audio-player', `audio-player--${expanded ? 'expanded' : 'minimised'}`)}>
		<div className={cn('audio-player__series-name')}>{seriesName}</div>
		<div className={cn('audio-player__title')}>{title}</div>
		<PlayPause onPlayClick={onPlay} onPauseClick={onPause} playing={playing} />
		{!expanded && <Close onClick={onClose} />}
	</div>
);

Audio.propTypes = {
	expanded: PropTypes.bool.isRequired,
	playing: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	onPlay: PropTypes.func.isRequired,
	onPause: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	seriesName: PropTypes.string.isRequired
}
