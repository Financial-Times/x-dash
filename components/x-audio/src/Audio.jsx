import { h } from '@financial-times/x-engine';
import { Audio } from './components';
import connectPlayer from './redux';

export default () => {
	const ConnectedPlayer = connectPlayer(Audio);
	return (props) => <ConnectedPlayer {...props} />;
}

/**
 * vanilla react component, to be used with storybook
 */
export {
	Audio
 }
