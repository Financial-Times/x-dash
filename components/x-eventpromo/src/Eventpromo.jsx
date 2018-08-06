import { h } from '@financial-times/x-engine';
import Details from './Details';
import ImagesContainer from './ImagesContainer';
// import 'http://127.0.0.1:5005/public/main.css'
// import './Eventpromo.css'

const Eventpromo = (props) => {
	return (
		<div className="event-promo-inarticle event-promo-animation " data-event-focus="" data-focus-concept={props.eventpromoId}>
			<Details {...props} />
			<ImagesContainer {...props} />
		</div>
	);
};

export { Eventpromo };
