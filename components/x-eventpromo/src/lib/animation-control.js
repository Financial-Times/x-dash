module.exports = () => {
	const aniCntr = document.querySelector('.js-event-promo__control');
	const aniEls = document.querySelectorAll('.js-event-promo--animate');

	if (!aniEls || !aniCntr) {
		return;
	}

	aniCntr.addEventListener('click', () => {
		aniEls.forEach((item) => {
			item.classList.toggle('paused');
		});

		aniCntr.classList.toggle('event-promo__control--paused');
	});

	return true;
};
