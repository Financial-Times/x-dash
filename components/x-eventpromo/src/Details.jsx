import { h } from '@financial-times/x-engine';
import Footer from './Footer';
import Meta from './Meta';
import styles from './Details.scss';

const Details = ({ link, title, ...props }) => {
	return (
		<div className={styles.block} aria-labelledby="details-header">
			<div id="details-header" hidden>
				Event details and information
			</div>
			<div className={styles.details}>
				<a href={link} className={styles.title} data-trackable="event-promo">
					{title}
				</a>

				<Meta {...props} />
				<Footer url={link} />
			</div>
		</div>
	);
};

export default Details;
