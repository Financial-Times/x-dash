import { h } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';
import classNameMap from './classnames-helper';
import formatToHHMMSS from './format-seconds-to-hhmmss';

const formatToMinsRemaining = (targetSeconds) => {
  const minutes = Math.floor((targetSeconds / 60))
  return `${minutes} mins remaining`;
}

export const TimeRemaining = ({
  expanded,
	currentTime,
  duration
}) => {
  const remainingSeconds = duration - currentTime;
  
  return(
    <div className={classNameMap('audio-player__info__remaining')}>
      {expanded ? `-${formatToHHMMSS(remainingSeconds)}` : formatToMinsRemaining(remainingSeconds)}
    </div>
  )
}

TimeRemaining.propTypes = {
	currentTime: PropTypes.number.isRequired,
	duration: PropTypes.number.isRequired
}
