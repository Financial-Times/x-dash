import { h } from '@financial-times/x-engine';
import { Player } from './components/Player';
import connectPlayer from './redux';

export default () => {
	const ConnectedPlayer = connectPlayer(Player);
	return () => <ConnectedPlayer />;
}

/**
 * vanilla react component, to be used with storybook
 */
export {
	Player as Audio
 }
