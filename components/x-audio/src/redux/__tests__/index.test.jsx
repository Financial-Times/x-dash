import { h } from '@financial-times/x-engine';
import { shallow } from '@financial-times/x-test-utils/enzyme';
import connectPlayer from '../';
import { actions } from '../player-logic';
import { NotifiersProxy } from '../middleware/notifier';
import createStore from '../store';

jest.mock('../store', () => jest.fn());
jest.mock('../middleware/notifier');

const PlayerComponent = (props) => (<div {...props}/>);
const playerProps = {
	url: 'https://ft.com/audio.mp3',
	playing: false,
	trackingContext: { contentId: 'abc-123' },
	notifiers: {
		ended: jest.fn()
	}
};
let reduxState;

describe('Connected player', () => {

	beforeEach(() => {
		NotifiersProxy.mockClear();
		reduxState = {};
	});

	test('loads media when the player is initially rendered', () => {
		const { store } = initialisePlayer(playerProps);
		const { url, trackingContext, playing: autoplay } = playerProps;
		expect(store.dispatch).toHaveBeenCalledWith(actions.loadMedia({ url, trackingContext, autoplay }));
	});

	test('reloads media when the url prop changes', () => {
		const { store, player } = initialisePlayer(playerProps);
		const url = 'https://ft.com/audio-2.mp3';
		player.setProps({ url });
		const { trackingContext } = playerProps;
		expect(store.dispatch).toHaveBeenCalledWith(actions.loadMedia({ url, trackingContext, autoplay: true }));
	});

	test('starts playback when the playing prop changes', () => {
		const { store, player } = initialisePlayer(playerProps);
		player.setProps({ playing: true });
		expect(store.dispatch).toHaveBeenCalledWith(actions.requestPlay({ willNotify: false }));
	});

	test('pauses playback when the playing prop changes', () => {
		const { store, player } = initialisePlayer({...playerProps, playing: true });
		player.setProps({ playing: false });
		expect(store.dispatch).toHaveBeenCalledWith(actions.requestPause({ willNotify: false }));
	});

	test('expands player when expanded prop becomes true', () => {
		const { store, player } = initialisePlayer({...playerProps, expanded: false });
		player.setProps({ expanded: true });
		expect(store.dispatch).toHaveBeenCalledWith(actions.expand({ willNotify: false }));
	});

	test('minimise player when expanded prop becomes false', () => {
		const { store, player } = initialisePlayer(playerProps);
		player.setProps({ expanded: true });
		player.setProps({ expanded: false });
		expect(store.dispatch).toHaveBeenCalledWith(actions.expand({ willNotify: false }));
	});

	test('sets up notifiers when the player is initiallly rendered', () => {
		initialisePlayer(playerProps);
		const [ notifierProxy ] = NotifiersProxy.mock.instances;
		expect(notifierProxy.set).toHaveBeenCalledWith(playerProps.notifiers);
	});

	test('replaces notifiers when they change', () => {
		const { player } = initialisePlayer(playerProps);
		const notifiers = { playing: jest.fn() };
		player.setProps({ notifiers });
		const [ notifierProxy ] = NotifiersProxy.mock.instances;
		expect(notifierProxy.set).toHaveBeenCalledWith(notifiers);
	});

	test('avoids rendering when next redux state equals current state (shallow)', () => {
		const { player } = initialisePlayer(playerProps);
		const playerInstance = player.instance();

		jest.spyOn(player, 'setState');

		reduxState = { someProperty: true };
		playerInstance.storeUpdated();

		reduxState = { someProperty: true };
		playerInstance.storeUpdated();

		expect(player.setState).toHaveBeenCalledTimes(1);
	});
});

function initialisePlayer (props) {
	const store = setupStore();
	const ConnectedPlayer = connectPlayer(PlayerComponent);
	const player = shallow(<ConnectedPlayer {...props} />);

	// We're using a mocked store so state changes aren't actually made
	// In order to mimick a particular initial state, we can hack it in
	// by calling setState directly on the connected player.
	const { playing } = props;
	player.setState({ playing });

	return { store, player };
}

function setupStore () {
	const store = {
		getState: () => reduxState,
		dispatch: jest.fn(),
		subscribe: jest.fn(),
		unsubscribe: jest.fn()
	};
	createStore.mockImplementation(() => store);
	return store;
}
