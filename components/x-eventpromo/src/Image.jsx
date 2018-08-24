import { h } from '@financial-times/x-engine';
import styles from './Image.css';

const Image = ({ fadeIndex, imageUrl, linkUrl }) => {
	const baseSrc = `https://www.ft.com/__origami/service/image/v2/images/raw/${imageUrl}?source=next&amp;fit=cover&amp;compression=best&amp;`;
	const imgSrc = `${baseSrc}width=340 340w,${baseSrc}width=400 740w`;

	return (
		<a href={linkUrl}
						className="js-event-promo--animate"
						data-trackable="event-promo"
						aria-hidden="true"
						tabIndex="-1"
		>
			<img
				className={`js-event-promo--animate event-promo-inarticle__img ${styles['fade-'+fadeIndex]}`}
				srcSet={imgSrc} alt=""
				data-n-image-lazy-load-js=""
				role="presentation"
				sizes="(max-width: 46.24em) 100vw, 45vw"
			/>
		</a>
	);
};

export default Image;
