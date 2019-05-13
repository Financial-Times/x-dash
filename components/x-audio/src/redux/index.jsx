import { h, Component } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';
import { actions, initialState } from './player-logic';
import createStore from './store';

function wrapWithDispatch ({ dispatch }, actionsMap) {
	return Object.keys(actionsMap).reduce((acc, actionName) => ({
		...acc,
		[actionName]: (...args) => dispatch(actionsMap[actionName](...args))
	}), {});
}

export default function connectPlayer (Player) {
	const store = createStore();

	const playerActions = wrapWithDispatch(store, {
		onPlayClick: actions.requestPlay,
		onPauseClick: actions.requestPause
	});

	class ConnectedPlayer extends Component {
		constructor(props) {
			super(props);
			this.unsubscribe = store.subscribe(this.storeUpdated.bind(this));
			this.state = initialState;
		}

		componentDidMount() {
			const { playing, url } = this.props;

			if (playing) 	{
				playerActions.onPlayClick({ url });
			}
		}

		componentWillUnmount() {
			playerActions.onPauseClick();
			this.unsubscribe();
		}

		storeUpdated() {
			const nextState = store.getState();

			if (this.lastState !== nextState) {
				this.setState(nextState);
				this.lastState = nextState;
			}
		}

		componentDidUpdate(prevProps, prevState) {
			const { url } = this.props;

			if (prevProps.url !== url) {
				playerActions.onPlayClick({ url });
				return;
			}

			if (this.stateAndPropsNeedSync()) {
				this.updateStateFromProps(prevProps);
				this.notifyStateChanges(prevState);
			}
		}

		stateAndPropsNeedSync() {
			return this.state.playing !== this.props.playing;
		}

		updateStateFromProps(prevProps) {
			if (!prevProps.playing && this.props.playing) {
				playerActions.onPlayClick();
			} else if (prevProps.playing && !this.props.playing) {
				playerActions.onPauseClick();
			}
		}

		notifyStateChanges(prevState) {
			if (!prevState.playing && this.state.playing) {
				this.props.notifiers.play();
			} else if (prevState.playing && !this.state.playing) {
				this.props.notifiers.pause();
			}
		}

		render() {
			const { title, seriesName, onCloseClick, duration, expanded } = this.props;
			const { playing, currentTime, loading } = this.state;
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
					loading
				}}
			/>;
		}
	}

	ConnectedPlayer.defaultProps = {
		notifiers: {
			pause: () => {},
			play: () => {}
		},
		onCloseClick: () => {}
	}
	ConnectedPlayer.propTypes = {
		notifiers: PropTypes.shape({
			play: PropTypes.func,
			pause: PropTypes.func
		}),
		onCloseClick: PropTypes.func
	}

	return ConnectedPlayer;
}
