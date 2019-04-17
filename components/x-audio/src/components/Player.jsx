import { h } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';
import { MinimisedPlayer } from './MinimisedPlayer';
import { ExpandedPlayer } from './ExpandedPlayer';

export const Player = ({
	expanded,
	...props
}) => (
	expanded ? <ExpandedPlayer {...props} /> : <MinimisedPlayer {...props} />
);

Player.propTypes = {
	expanded: PropTypes.bool.isRequired,
	playing: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	onPlay: PropTypes.func.isRequired,
	onPause: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	seriesName: PropTypes.string.isRequired
}
