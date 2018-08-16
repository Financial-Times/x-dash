import { h } from '@financial-times/x-engine';

const Footer = ({url}) => {
	return <div className="event-promo-inarticle__cta">
		<div className="event-promo-inarticle__btn-block">
			<a href={url} className="event-promo-inarticle__btn" data-trackable="event-promo">
				Register now
			</a>
		</div>
		<div className="event-promo-inarticle__brand">
			Presented by
			<span className="event-promo__visually-hidden">FT live</span>
		</div>
	</div>
};

export default Footer;
