import { h, Component } from '@financial-times/x-engine';
import { actions } from './player-logic';
import createStore from './store';

function wrapWithDispatch ({ dispatch }, actionsMap) {
	return Object.keys(actionsMap).reduce((acc, actionName) => ({
		...acc,
		[actionName]: () => dispatch(actionsMap[actionName]())
	}), {})
}

export default function connectPlayer (Player) {
	const store = createStore();

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
			if (this.props.playing) {
				playerActions.onPlay();
			}
		}

		componentDidUpdate(prevProps, prevState) {
			if (!prevProps.playing && this.props.playing) {
				playerActions.onPlay();
			} else if (prevProps.playing && !this.props.playing) {
				playerActions.onPause();
			}

			if (!prevState.playing && this.state.playing) {
				this.props.notifyPlay()
			} else if (prevState.playing && !this.state.playing) {
				this.props.notifyPause()
			}
		}

		componenentDidUnmount() {
			this.unsubscribe();
		}

		storeUpdated() {
			this.setState(store.getState());
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
		notifyPause: () => {},
		notifyPlay: () => {}
	}

	return ConnectedPlayer;
}
