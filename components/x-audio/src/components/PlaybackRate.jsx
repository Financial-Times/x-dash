import { h } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';
import classNameMap from './classnames-helper';

import { getNextPlaybackRate } from './playback-rates';

export const PlaybackRate = ({
	onClick,
	rate
}) => (
	<button
		aria-label={`Change playback speed to ${getNextPlaybackRate(rate)} times`}
		className={classNameMap('audio-player__control-speed')}
		onClick={() => onClick(getNextPlaybackRate(rate))}>
		{rate}x
	</button>
)

PlaybackRate.propTypes = {
	onClick: PropTypes.func.isRequired,
	rate: PropTypes.number.isRequired
};

PlaybackRate.defaultProps = {
	onClick: () => {},
	rate: 1
};
