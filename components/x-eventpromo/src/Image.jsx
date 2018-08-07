import { h } from '@financial-times/x-engine';
import Link from './Link';

const Image = ({linkUrl, imageUrl}) => {

	const baseSrc = `https://www.ft.com/__origami/service/image/v2/images/raw/${imageUrl}?source=next&amp;fit=cover&amp;compression=best&amp;`;
	const imgSrc = `${baseSrc}width=340 340w,${baseSrc}width=400 740w`;

	return (
		<Link url={linkUrl} attrs={{
			'className': 'js-event-promo--animate',
			'data-trackable': 'event-promo',
			'aria-hidden': true,
			'tabindex': -1
		}}>
			<img className="js-event-promo--animate event-promo-inarticle__img fade-0" srcSet={imgSrc} alt="" data-n-image-lazy-load-js="" role="presentation" sizes="(max-width: 46.24em) 100vw, 45vw" />
		</Link>
	);
};

export default Image;
