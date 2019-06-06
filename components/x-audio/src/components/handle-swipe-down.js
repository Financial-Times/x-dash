function setPositionY (target, posY) {
	target.style.transform = `translate3d(0, ${posY}px, 0)`;
}

export default (event, onSwipeEnd, expandedPlayerRef) => {

	const DISPLAY_EXPANDED_THRESHOLD = expandedPlayerRef.offsetHeight / 2;
	const posY = event.deltaY;

	setPositionY(expandedPlayerRef, posY);

	// SWIPE ENDED
	if (event.isFinal) {
		if (posY >= DISPLAY_EXPANDED_THRESHOLD) {
			onSwipeEnd();
		}

		setPositionY(expandedPlayerRef, 0);
	}

}
