import { h } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types'

export const Player = ({
	loading,
	playing,
	onPlay,
	onPause,
	onClose,
	title,
	seriesName
}) => (
	<div style={{width: '100%', height: '50px', backgroundColor: 'white' }}>
		<div>{seriesName}</div>
		<div>{title}</div>
		{playing
			? <button onClick={onPause}>Pause</button>
			: <button onClick={onPlay}>Play!</button>
		}
		{loading && <div>Loading</div>}
		<button onClick={onClose}>Close</button>
	</div>
);

Player.propTypes = {
	playing: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	onPlay: PropTypes.func.isRequired,
	onPause: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	seriesName: PropTypes.string.isRequired
}
