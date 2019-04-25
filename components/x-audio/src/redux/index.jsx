import { h, Component } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';
import { actions } from './player-logic';
import createStore from './store';

function wrapWithDispatch ({ dispatch }, actionsMap) {
	return Object.keys(actionsMap).reduce((acc, actionName) => ({
		...acc,
		[actionName]: (...args) => dispatch(actionsMap[actionName](...args))
	}), {})
}

export default function connectPlayer (Player, notifier) {
	const store = createStore(notifier);

	const playerActions = wrapWithDispatch(store, {
		onPlay: actions.requestPlay,
		onPause: actions.requestPause
	});

	class ConnectedPlayer extends Component {
		constructor(props) {
			super(props);
			this.unsubscribe = store.subscribe(this.storeUpdated.bind(this));
		}

		componentDidMount() {
			const { playing, url } = this.props;
			if (playing) 	{
				playerActions.onPlay({ url, isInternal: false });
			}
		}

		componentDidUpdate(prevProps, prevState) {
			this.respondToPropChanges(prevProps);
			this.notifyConsumers(prevState);
		}

		componenentDidUnmount() {
			this.unsubscribe();
		}

		storeUpdated() {
			this.setState(store.getState());
		}

		respondToPropChanges(prevProps) {
			const { playing, url } = this.props;

			if (this.state.lastActionInternal) {
				return
			}

			if (prevProps.url !== url) {
				playerActions.onPlay({ url, isInternal: false });
			} else if (!prevProps.playing && playing) {
				playerActions.onPlay({ isInternal: false });
			} else if (prevProps.playing && !playing) {
				playerActions.onPause({ isInternal: false });
			}
		}

		notifyConsumers(prevState) {
			console.log('lastaction', this.state.lastActionInternal, prevState);
			if (!this.state.lastActionInternal) {
				return
			}

			if (!prevState.playing && this.state.playing) {
				this.props.notifiers.play();
			} else if (prevState.playing && !this.state.playing) {
				this.props.notifiers.pause();
			}
		}

		render() {
			const { title, seriesName, onClose } = this.props;
			const { playing } = this.state;
			return <Player
				{...playerActions}
				{...{ playing, title, seriesName, onClose }}
			/>;
		}
	}

	ConnectedPlayer.defaultProps = {
		notifiers: {
			pause: () => {},
			play: () => {}
		},
		onClose: () => {}
	}
	ConnectedPlayer.propTypes = {
		notifiers: PropTypes.shape({
			play: PropTypes.func,
			pause: PropTypes.func
		}),
		onClose: PropTypes.func
	}

	return ConnectedPlayer;
}
