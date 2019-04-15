import { h, Component } from '@financial-times/x-engine';
import { actions, store } from './redux'
import { Player } from './components/Player';

class ConnectedPlayer extends Component {
	constructor() {
		super();
		store.subscribe(this.storeUpdated.bind(this));
	}

	storeUpdated() {
		this.setState(store.getState());
	}

	render() {
		const playerActions = {
			onPlay: () => store.dispatch(actions.requestPlay()),
			onPause: () => store.dispatch(actions.requestPause())
		};

		return <Player {...playerActions} {...this.state} />;
	}
}

const playerInit = () => <ConnectedPlayer/>;

console.log({ playerInit });

/**
 * vanilla react component, to be used with storybook
 */
export { playerInit as Audio }
