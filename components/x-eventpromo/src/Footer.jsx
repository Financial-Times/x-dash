import { h } from '@financial-times/x-engine';
import Link from './Link';

const Footer = ({url}) => {
	return (
		<div className="event-promo-inarticle__cta">
			<div className="event-promo-inarticle__btn-block">
				<Link url={url} attrs={{
					'className': 'event-event-promo-inarticle__btn',
					'data-trackable': 'event-promo'
				}}>Register now</Link>
			</div>
			<div className="event-promo-inarticle__brand">
				<span>Presented by</span>
				<span className="event-promo__visually-hidden">FT live</span>
			</div>
		</div>
	);
};

export default Footer;
