import { h, render } from '@financial-times/x-engine';
import { connectPlayer, store } from './redux'
import { Player } from './components/Player';

/**
 * factory function to hook player component up to redux
 * `Provider` + `connect` redfunctions passed in depending on the react implementation
 *  being used
 */
export default function createAudio ({ Provider, connect }) {
	const ConnectedPlayer = connectPlayer(Player, connect);
	return () => (
		<Provider store={store}>
			<ConnectedPlayer />
		</Provider>
	)
}

/**
 * vanilla react component, to be used with storybook
 */
export { Player as Audio }
