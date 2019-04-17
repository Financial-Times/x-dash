import { h } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types'
import {
	PlayPause
} from './Buttons'

export const ExpandedPlayer = ({
	playing,
	onPlay,
	onPause,
	title,
	seriesName
}) => (
	<div>
		<div>{seriesName}</div>
		<div>{title}</div>
		<PlayPause onPlayClick={onPlay} onPauseClick={onPause} playing={playing} />
	</div>
)

ExpandedPlayer.propTypes = {
	playing: PropTypes.bool.isRequired,
	onPlay: PropTypes.func.isRequired,
	onPause: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	seriesName: PropTypes.string.isRequired
}