function setPositionY (target, posY) {
	target.style.transform = `translate3d(0, ${posY}px, 0)`;
}

export default (event, onSwipeEnd) => {

	const expandedPlayer = event.target.closest("#audio-player-expanded");
	const DISPLAY_EXPANDED_THRESHOLD = expandedPlayer.offsetHeight / 2;
	const posY = event.deltaY;

	setPositionY(expandedPlayer, posY);

	// SWIPE ENDED
	if (event.isFinal) {
		if (posY >= DISPLAY_EXPANDED_THRESHOLD) {
			onSwipeEnd();
		}

		setPositionY(expandedPlayer, 0);
	}

}
