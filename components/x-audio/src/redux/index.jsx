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

	return class ConnectedPlayer extends Component {
		constructor(props) {
			super(props);
			this.unsubscribe = store.subscribe(this.storeUpdated.bind(this));
		}

		componenentDidUnmount() {
			this.unsubscribe();
		}

		storeUpdated() {
			this.setState(store.getState());
		}

		render() {
			return <Player {...playerActions} {...this.state} onClose={this.props.onClose} />;
		}
	}
}
