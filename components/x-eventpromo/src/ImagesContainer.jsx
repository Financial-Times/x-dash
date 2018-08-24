import { h } from '@financial-times/x-engine';
import Image from './Image';
import styles from './ImagesContainer.css';

const ImagesContainer = ({ images, link }) => {

	return (
		<div className="event-promo-inarticle__blocks event-promo-inarticle__img-block">
			<button className={`${styles['pause-button']} event-promo__control js-event-promo__control" aria-label="control animation`}></button>
			{images.map((image, index) =>
				<Image key={index} linkUrl={link} imageUrl={image} fadeIndex={index}/>
			)}
		</div>
	);
};

export default ImagesContainer;
