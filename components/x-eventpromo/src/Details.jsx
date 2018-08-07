import { h } from '@financial-times/x-engine';
import Footer from './Footer';
import Link from './Link';
import Meta from './Meta';

const Details = ({link, title, ...props}) => {

	return (
		<div className="event-promo-inarticle__blocks">
			<div className="event-promo__details">
				<Link url={link} attrs={{ 'className': 'event-promo__title', 'data-trackable': 'event-promo'}}>
					{title}
				</Link>

				<Meta {...props} />
				<Footer url={link} />

			</div>
		</div>
	);
};

export default Details;
