import { h } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types'

export const Player = ({
	loading,
	playing,
	onPlay,
	onPause
}) => (
	<div>
		{playing
			? <button onClick={onPause}>Pause</button>
			: <button onClick={onPlay}>Play!</button>
		}
		{loading && <div>Loading</div>}
	</div>
);


Player.propTypes = {
	playing: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	onPlay: PropTypes.func.isRequired,
	onPause: PropTypes.func.isRequired
}
