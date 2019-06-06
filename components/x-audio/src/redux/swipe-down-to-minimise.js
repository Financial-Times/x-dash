const EXPANDED_PLAYER_HEIGHT = 360;
const DISPLAY_EXPANDED_THRESHOLD = EXPANDED_PLAYER_HEIGHT / 2;

function setPositionY (target, posY) {
	target.style.transform = `translate3d(0, ${posY}px, 0)`;
}

export default (event, playerActions) => {

	const expandedPlayer = event.target.closest("#audio-player-expanded");
	const posY = event.deltaY;

	setPositionY(expandedPlayer, posY);

	// SWIPE ENDED
	if (event.isFinal) {
		if (posY >= DISPLAY_EXPANDED_THRESHOLD) {
			playerActions.onMinimise();
		}

		setPositionY(expandedPlayer, 0);
	}

}
