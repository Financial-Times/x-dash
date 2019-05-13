import { h } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';
import classNameMap from './classnames-helper';
import formatToHMMSS from './format-seconds-to-hmmss';

const formatToMinsRemaining = (targetSeconds) => {
	const minutes = Math.floor((targetSeconds / 60));
	return `${minutes} mins remaining`;
}

export const TimeRemaining = ({
	expanded,
	currentTime,
	duration
}) => {
	const remainingSeconds = duration - currentTime;
	const remainingText = expanded ? `-${formatToHMMSS(remainingSeconds)}` : formatToMinsRemaining(remainingSeconds);

	return(
		<div className={classNameMap('audio-player__info__remaining')}>
			{remainingText}
		</div>
	)
}

TimeRemaining.propTypes = {
	expanded: PropTypes.bool.isRequired,
	currentTime: PropTypes.number.isRequired,
	duration: PropTypes.number.isRequired
}
