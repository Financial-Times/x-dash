import { h } from '@financial-times/x-engine';
import Details from './Details';
import ImagesContainer from './ImagesContainer';

const Eventpromo = (props) => {
	return (
		<div className="event-promo-inarticle event-promo-animation " data-event-focus="" data-focus-concept={props.id}>
			<Details {...props} />
			<ImagesContainer {...props} />
		</div>
	);
};

export { Eventpromo };
