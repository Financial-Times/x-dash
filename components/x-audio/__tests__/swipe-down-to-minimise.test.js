import subject from '../src/components/handle-swipe-down';

describe('Swipe Down to Minimise', () => {

	const EXPANDED_PLAYER_HEIGHT = 360;
	const HALF_OF_EXPANDED_PLAYER_HEIGHT = EXPANDED_PLAYER_HEIGHT / 2;
	let expandedPlayer;
	let event;

	const onSwipeEnd = jest.fn();

	beforeEach(() => {
		onSwipeEnd.mockClear();
		expandedPlayer = {
			style: {
				transform: undefined
			},
			offsetHeight: EXPANDED_PLAYER_HEIGHT
		};
		event = { isFinal: false };
	});

	[10, 50, 100].forEach(deltaY => {
		test(`set expanded player posY by how much swipe down (${deltaY}px)`, () => {
			event.deltaY = deltaY;
			subject(event, onSwipeEnd, expandedPlayer);

			expect(expandedPlayer.style.transform).toBe(`translate3d(0, ${deltaY}px, 0)`);
			expect(onSwipeEnd).not.toHaveBeenCalled();
		});
	});

	describe('Swipe finished', () => {

		beforeEach(() => {
			event.isFinal = true;
		});

		describe('with more than half of expanded player height', () => {
			test('call onSwipeEnd function', () => {
				event.deltaY = HALF_OF_EXPANDED_PLAYER_HEIGHT;
				subject(event, onSwipeEnd, expandedPlayer);

				expect(onSwipeEnd).toHaveBeenCalled();
				expect(expandedPlayer.style.transform).toBe('translate3d(0, 0px, 0)');
			});
		});

		describe('with less than half of expanded player height', () => {
			test('set expanded player posY to default(0)', () => {
				event.deltaY = HALF_OF_EXPANDED_PLAYER_HEIGHT - 1;
				subject(event, onSwipeEnd, expandedPlayer);

				expect(onSwipeEnd).not.toHaveBeenCalled();
				expect(expandedPlayer.style.transform).toBe('translate3d(0, 0px, 0)');
			});
		});

	});

});
