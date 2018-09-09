import { h } from '@financial-times/x-engine';
import styles from './Image.scss';

const Image = ({ fadeIndex, imageUrl, linkUrl, isPaused }) => {
	const baseSrc = `https://www.ft.com/__origami/service/image/v2/images/raw/${imageUrl}?source=next&amp;fit=cover&amp;compression=best&amp;`;
	const imgSrc = `${baseSrc}width=340 340w,${baseSrc}width=400 740w`;

	let classNames = `${styles.img} ${styles['fade-'+fadeIndex]}`;
	if (isPaused) {
		classNames = classNames+' '+styles['paused'];
	}
	return (
		<a href={linkUrl}
						data-trackable="event-promo"
						aria-hidden="true"
						tabIndex="-1"
		>
			<img
				className={classNames}
				srcSet={imgSrc} alt=""
				role="presentation"
				sizes="(max-width: 46.24em) 100vw, 45vw"
			/>
		</a>
	);
};

export default Image;
