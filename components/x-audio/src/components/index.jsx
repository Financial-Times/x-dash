import { h } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';
import classNameMap from './classnames-helper';
import Loading from './Loading';
import {
	Close,
	PlayPause
} from './Buttons'

export const Audio = ({
	loading,
	expanded,
	playing,
	onPlayClick,
	onPauseClick,
	onCloseClick,
	title,
	seriesName
}) => (
	<div className={classNameMap('audio-player', `audio-player--${expanded ? 'expanded' : 'minimised'}`)}>
		<div className={classNameMap('audio-player__series-name')}>{seriesName}</div>
		<div className={classNameMap('audio-player__title')}>{title}</div>

		<PlayPause onPlayClick={onPlayClick} onPauseClick={onPauseClick} playing={playing} />
		{loading && <Loading expanded={expanded} />}
		{!expanded && <Close onClick={onCloseClick} />}

	</div>

);

Audio.propTypes = {
	expanded: PropTypes.bool.isRequired,
	playing: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	onPlayClick: PropTypes.func.isRequired,
	onPauseClick: PropTypes.func.isRequired,
	onCloseClick: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	seriesName: PropTypes.string.isRequired
}
