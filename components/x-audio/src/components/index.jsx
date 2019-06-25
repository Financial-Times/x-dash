import { h } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';
import { ExpandedPlayer, MinimisedPlayer } from './Players'

export const Audio = ({
	expanded,
	...props
}) => (
	expanded ? <ExpandedPlayer {...props} /> : <MinimisedPlayer {...props} />
);

Audio.propTypes = {
	expanded: PropTypes.bool.isRequired,
	playing: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired,
	onPlayClick: PropTypes.func.isRequired,
	onPauseClick: PropTypes.func.isRequired,
	onCloseClick: PropTypes.func.isRequired,
	onExpand: PropTypes.func.isRequired,
	onMinimise: PropTypes.func.isRequired,
	setExpandedPlayerRef: PropTypes.func.isRequired,
	onPlaybackRateClick: PropTypes.func.isRequired,
	updateCurrentTime: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	seriesName: PropTypes.string.isRequired,
	currentTime: PropTypes.number.isRequired,
	duration: PropTypes.number.isRequired,
	seeking: PropTypes.bool.isRequired,
	options: PropTypes.shape({
		canExpand: PropTypes.bool
	}),
	imageDataSet: PropTypes.shape({
		url: PropTypes.string.isRequired,
		resolutions: PropTypes.array
	})
};

Audio.defaultProps = {
	options: {
		canExpand: false
	}
}
