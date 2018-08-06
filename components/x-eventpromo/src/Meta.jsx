import { h } from '@financial-times/x-engine';

const Meta = ({location, dates}) => {
	return (
		<div className="event-promo__meta">
			<p>{location}</p>
			<p>{dates}</p>
		</div>
	);
};

export default Meta;
