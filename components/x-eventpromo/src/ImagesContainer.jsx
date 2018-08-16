import { h } from '@financial-times/x-engine';
import Image from './Image';

const ImagesContainer = ({link, images}) => {

	return (
		<div className="event-promo-inarticle__blocks event-promo-inarticle__img-block">
			<span className="event-promo__control js-event-promo__control" aria-label="control animation"></span>
			{images.map((image) =>
				<Image linkUrl={link} imageUrl={image}/>
			)}
		</div>
	);
};

export default ImagesContainer;
