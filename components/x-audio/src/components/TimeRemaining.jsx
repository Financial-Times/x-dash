import { h } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';
import classNameMap from './classnames-helper';

export const TimeRemaining = ({
  expanded,
	currentTime,
  duration
}) => (
  <div className={classNameMap('audio-player__time-remaining', `audio-player__time-remaining--${expanded ? 'expanded' : 'minimised'}`)}>
    {`-${duration - currentTime}`}
  </div>
)

TimeRemaining.propTypes = {
	currentTime: PropTypes.number.isRequired,
	duration: PropTypes.number.isRequired
}