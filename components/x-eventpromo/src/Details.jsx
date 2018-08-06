import { h } from '@financial-times/x-engine';
import Footer from './Footer';
import Link from './Link';
import Meta from './Meta';

const Details = ({eventpromoLink, eventpromoTitle, ...props}) => {

	return (
		<div className="event-promo-inarticle__blocks">
			<div className="event-promo__details">
				<Link url={eventpromoLink} attrs={{ 'className': 'event-promo__title', 'data-trackable': 'event-promo'}}>
					{eventpromoTitle}
				</Link>

				<Meta {...props} />
				<Footer url={eventpromoLink} />

			</div>
		</div>
	);
};

export default Details;
