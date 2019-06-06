import subject from '../swipe-down-to-minimise';

describe('Swipe Down to Minimise', () => {

	const HALF_OF_EXPANDED_PLAYER_HEIGHT = 360 / 2;
	let expandedPlayer;
	let event;

	const playerActions = {
		onMinimise: jest.fn()
	};

	beforeEach(() => {
		playerActions.onMinimise.mockClear();
		expandedPlayer = { style: { transform: undefined }};
		event = {
			target: {
				closest: () => {
					return expandedPlayer;
				}
			},
			isFinal: false
		};
	});

	[10, 50, 100].forEach(deltaY => {
		test(`set expanded player posY by how much swipe down (${deltaY}px)`, () => {
			event.deltaY = deltaY;
			subject(event, playerActions);

			expect(expandedPlayer.style.transform).toBe(`translate3d(0, ${deltaY}px, 0)`);
			expect(playerActions.onMinimise).not.toHaveBeenCalled();
		});
	});

	describe('Swipe finished', () => {

		beforeEach(() => {
			event.isFinal = true;
		});

		describe('with more than half of expanded player height', () => {
			test('change into minimised player', () => {
				event.deltaY = HALF_OF_EXPANDED_PLAYER_HEIGHT;
				subject(event, playerActions);

				expect(playerActions.onMinimise).toHaveBeenCalled();
				expect(expandedPlayer.style.transform).toBe('translate3d(0, 0px, 0)');
			});
		});

		describe('with less than half of expanded player height', () => {
			test('set expanded player posY to default(0)', () => {
				event.deltaY = HALF_OF_EXPANDED_PLAYER_HEIGHT - 1;
				subject(event, playerActions);

				expect(playerActions.onMinimise).not.toHaveBeenCalled();
				expect(expandedPlayer.style.transform).toBe('translate3d(0, 0px, 0)');
			});
		});

	});
	
});
