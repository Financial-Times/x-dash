import { h } from '@financial-times/x-engine';
import cc from "classcat";
import styles from './styles.scss'

import * as PropTypes from 'prop-types'
import {
	Close,
	PlayPause
} from './Buttons'

export const MinimisedPlayer = ({
	playing,
	onPlay,
	onPause,
	onClose,
	title,
	seriesName
}) => (
	<div className={cc(styles['audio-player'], styles['audio-player--minimised'])}>
		<PlayPause onPlayClick={onPlay} onPauseClick={onPause} playing={playing} />
		<div>{seriesName}</div>
		<div>{title}</div>
		<Close onClick={onClose} />
	</div>
)

MinimisedPlayer.propTypes = {
	playing: PropTypes.bool.isRequired,
	onPlay: PropTypes.func.isRequired,
	onPause: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	seriesName: PropTypes.string.isRequired
}