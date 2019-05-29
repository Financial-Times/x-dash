import { h, Component } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';
import { actions, initialState } from './player-logic';
import createStore from './store';
import { NotifiersProxy } from './middleware/notifier'

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
	});

	class ConnectedPlayer extends Component {
		constructor(props) {
			super(props);
			notifiersProxy.set(props.notifiers);
			this.unsubscribe = store.subscribe(this.storeUpdated.bind(this));
			this.state = initialState;
		}

		componentDidMount() {
			const { playing, url, trackingContext } = this.props;
			playerActions.loadMedia({ url, trackingContext, autoplay: playing });
		}

		componentWillUnmount() {
			playerActions.willClose();
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
			const { url, trackingContext, notifiers } = this.props;
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

		render() {
			const { title, seriesName, onCloseClick, showPersistentPlayerWIP } = this.props;
			const { playing, currentTime, loading, duration, error, expanded } = this.state;
			return <Player
				{...playerActions}
				{...{
					playing,
					title,
					seriesName,
					onCloseClick,
					duration,
					currentTime,
					expanded,
					loading,
					error,
					showPersistentPlayerWIP
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
			pause: PropTypes.func
		}),
		onCloseClick: PropTypes.func,
		trackingContext: PropTypes.shape({
			contentId: PropTypes.string,
			playerType: PropTypes.string,
			audioSubtype: PropTypes.string
		}).isRequired
	}

	return ConnectedPlayer;
}
