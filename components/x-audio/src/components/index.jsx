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
		{expanded && <button className={classNameMap('audio-player__minimise-button')} title='minimize player'/>}
		{expanded && <div className={classNameMap('audio-player__control-timeline')}><input style={{width: '100%'}} type='range'/></div>}
		{expanded && <button className={classNameMap('audio-player__rewind')} title='rewind 30 seconds'/>}
		{expanded && <button className={classNameMap('audio-player__forward')} title='forward 30 seconds'/>}
		{expanded && <button className={classNameMap('audio-player__control-speed')} title='change play speed'>x1</button>}

		{!expanded && <Close onClick={onCloseClick} />}

		<div className={classNameMap('audio-player__info')}>
			{expanded && <img className={classNameMap('audio-player__info__image')} alt="dummy"/>}
			<div className={classNameMap('audio-player__info__title')}>{title}</div>
			<div className={classNameMap('audio-player__info__series-name')}>{expanded ? seriesName : `${seriesName}:`}</div>
			{!expanded && <div className={classNameMap('audio-player__info__remaining')}>12 mins remaining</div>}
		</div>
		<PlayPause onPlayClick={onPlayClick} onPauseClick={onPauseClick} playing={playing}/>
		{loading && <Loading expanded={expanded} />}
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
