import { h, Component } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';
import Hammer from 'hammerjs';
import { actions, initialState } from './player-logic';
import createStore from './store';
import { NotifiersProxy } from './middleware/notifier';
import handleSwipeDown from '../components/handle-swipe-down';

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
			this.onCloseClick = this.onCloseClick.bind(this);
			this.setExpandedPlayerRef = element => {
				this.expandedPlayerRef = element;
			};
			this.hasSwipeDownListener = false;
			this.state = initialState;
			this.hammer = undefined;
		}

		componentDidMount() {
			const { playing, url, trackingContext } = this.props;
			playerActions.loadMedia({ url, trackingContext, autoplay: playing });

			if (this.expandedPlayerRef && !this.hasSwipeDownListener) {
				this.listenForSwipeDown(this.expandedPlayerRef);
			}
		}

		componentWillUnmount() {
			this.unsubscribe();

			if (this.hammer) {
				this.hammer.destroy();
			}
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

			if (this.expandedPlayerRef && !this.hasSwipeDownListener) {
				this.listenForSwipeDown(this.expandedPlayerRef);
			}
		}

		listenForSwipeDown (expandedPlayerRef) {
			this.hammer = new Hammer.Manager(expandedPlayerRef);
			this.hammer.add(new Hammer.Pan({
				direction: Hammer.DIRECTION_DOWN,
				threshold: 0
			}) );
			this.hammer.on('pan', (ev) => {
				const onSwipeEnd = playerActions.onMinimise;
				handleSwipeDown(ev, onSwipeEnd, expandedPlayerRef);
			});

			this.hasSwipeDownListener = true;
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
			const { title, seriesName, options } = this.props;
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
					options
				}}
				setExpandedPlayerRef={this.setExpandedPlayerRef}
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
			audioSubtype: PropTypes.string
		}).isRequired
	}

	return ConnectedPlayer;
}
