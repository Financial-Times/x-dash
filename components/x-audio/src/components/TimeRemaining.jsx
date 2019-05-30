import { h } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';
import classNameMap from './classnames-helper';
import formatToHMMSS from './format-seconds-to-hmmss';

const formatToMinsRemaining = (targetSeconds) => {
	const minutes = Math.round((targetSeconds / 60));
	return `${ minutes > 1 ? minutes : 1 } min remaining`;
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

TimeRemaining.defaultProps = {
	expanded: false
}

TimeRemaining.propTypes = {
	expanded: PropTypes.bool,
	currentTime: PropTypes.number.isRequired,
	duration: PropTypes.number.isRequired
}
