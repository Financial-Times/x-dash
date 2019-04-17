import { h } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types'

export const PlayPause = ({
	onPlayClick,
	onPauseClick,
	playing
}) => (
	playing ? (
		<button onClick={onPauseClick}>Pause</button>
	) : (
		<button onClick={onPlayClick}>Play</button>
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
	<button onClick={onClick}>Close</button>
)

Close.propTypes = {
	onClick: PropTypes.func.isRequired
}