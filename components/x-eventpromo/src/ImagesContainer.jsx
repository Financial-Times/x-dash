import { h } from '@financial-times/x-engine';
import Image from './Image';

const ImagesContainer = ({eventpromoLink, image1, image2, image3}) => {

	return (
		<div className="event-promo-inarticle__blocks event-promo-inarticle__img-block">
			<span className="event-promo__control js-event-promo__control" aria-label="control animation"></span>
			<Image linkUrl={eventpromoLink} imageUrl={image1}/>
			<Image linkUrl={eventpromoLink} imageUrl={image2}/>
			<Image linkUrl={eventpromoLink} imageUrl={image3}/>

		</div>
	);
};

export default ImagesContainer;
