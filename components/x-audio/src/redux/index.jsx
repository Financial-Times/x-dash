import { h, Component } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';
import { actions, initialState } from './player-logic';
import createStore from './store';
import { NotifiersProxy } from './middleware/notifier';

function wrapWithDispatch ({ dispatch }, actionsMap) {
	return Object.keys(actionsMap).reduce((acc, actionName) => ({
		...acc,
		[actionName]: (...args) => dispatch(actionsMap[actionName](...args))
	}), {});
}

export default function connectPlayer (Player) {
	const notifiersProxy = new NotifiersProxy();
	const store = createStore(notifiersProxy);

	const playerActions = wrapWithDispatch(store, {
		onPlayClick: actions.requestPlay,
		onPauseClick: actions.requestPause,
		loadMedia: actions.loadMedia,
		willClose: actions.willClose,
		onExpand: actions.expand,
		onMinimise: actions.minimise,
		onPlaybackRateClick: actions.setPlaybackRate,
		updateCurrentTime: actions.requestUpdateCurrentTime,
		onScrub: actions.updateScrubbing
	});

	class ConnectedPlayer extends Component {
		constructor(props) {
			super(props);
			notifiersProxy.set(props.notifiers);
			this.unsubscribe = store.subscribe(this.storeUpdated.bind(this));
			this.onCloseClick = this.onCloseClick.bind(this);
			this.state = initialState;
		}

		componentDidMount() {
			const { playing, url, trackingContext } = this.props;
			playerActions.loadMedia({ url, trackingContext, autoplay: playing });
		}

		componentWillUnmount() {
			this.unsubscribe();
		}

		storeUpdated() {
			const nextState = store.getState();

			if (this.lastState !== nextState) {
				this.setState(nextState);
				this.lastState = nextState;
			}
		}

		componentDidUpdate(prevProps) {
			const { url, trackingContext, notifiers, expanded } = this.props;
			if (prevProps.url !== url) {
				playerActions.loadMedia({ url, trackingContext, autoplay: true });
				return;
			}

			if (prevProps.notifiers !== notifiers) {
				notifiersProxy.set(notifiers);
			}

			if (this.playingStateAndPropsNeedSync()) {
				this.updatePlayingStateFromProps(prevProps);
			}

			if (this.state.expanded !== expanded) {
				if (!prevProps.expanded && expanded) {
					playerActions.onExpand({ willNotify: false });
				} else if (prevProps.expanded && !expanded) {
					playerActions.onMinimise({ willNotify: false });
				}
			}
		}

		playingStateAndPropsNeedSync() {
			return this.state.playing !== this.props.playing;
		}

		updatePlayingStateFromProps(prevProps) {
			if (!prevProps.playing && this.props.playing) {
				playerActions.onPlayClick({ willNotify: false });
			} else if (prevProps.playing && !this.props.playing) {
				playerActions.onPauseClick({ willNotify: false });
			}
		}

		onCloseClick() {
			playerActions.willClose();
			this.props.onCloseClick();
		}

		render() {
			const { onCloseClick } = this;
			const { title, seriesName, options, imageDataSet } = this.props;
			const { playing, currentTime, loading, duration, error, expanded, seeking, playbackRate, scrubbing } = this.state;
			return <Player
				{...playerActions}
				{...{
					playing,
					title,
					seriesName,
					imageDataSet,
					onCloseClick,
					duration,
					currentTime,
					playbackRate,
					expanded,
					loading,
					error,
					options,
					seeking,
					scrubbing
				}}
			/>;
		}
	}

	ConnectedPlayer.defaultProps = {
		notifiers: {
			pause: () => {},
			play: () => {},
			ended: () => {}
		},
		onCloseClick: () => {},
	}
	ConnectedPlayer.propTypes = {
		notifiers: PropTypes.shape({
			play: PropTypes.func,
			pause: PropTypes.func,
			tracking: PropTypes.func,
			expand: PropTypes.func,
			minimise: PropTypes.func
		}),
		onCloseClick: PropTypes.func,
		trackingContext: PropTypes.shape({
			contentId: PropTypes.string,
			playerType: PropTypes.string,
			audioSubtype: PropTypes.string,
			root_id: PropTypes.string,
			rootContentId: PropTypes.string
		}).isRequired
	}

	return ConnectedPlayer;
}
