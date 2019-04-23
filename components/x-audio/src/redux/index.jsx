import { h, Component } from '@financial-times/x-engine';
import { actions } from './player-logic';
import createStore from './store';

function wrapWithDispatch ({ dispatch }, actionsMap) {
	return Object.keys(actionsMap).reduce((acc, actionName) => ({
		...acc,
		[actionName]: (...args) => dispatch(actionsMap[actionName](...args))
	}), {})
}

export default function connectPlayer (Player) {
	const store = createStore();

	const playerActions = wrapWithDispatch(store, {
		onPlay: actions.requestPlay,
		onPause: actions.requestPause
	});

	return class ConnectedPlayer extends Component {
		constructor(props) {
			super(props);
			this.unsubscribe = store.subscribe(this.storeUpdated.bind(this));
		}

		componentDidMount() {
			playerActions.onPlay(this.props.src);
		}

		componentWillUnmount() {
			this.unsubscribe();
		}

		componentDidUpdate(prevProps) {
			if (prevProps.src !== this.props.src || (prevProps.playing === false && this.props.playing === true)) {
				playerActions.onPlay(this.props.src);
			}
		}

		storeUpdated() {
			this.setState(store.getState());
		}

		render() {
			const { title, seriesName } = this.props;
			return <Player {...playerActions} {...this.state} onClose={this.props.onClose} {...{title, seriesName}} />;
		}
	}
}
