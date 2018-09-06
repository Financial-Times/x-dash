import { h } from '@financial-times/x-engine';
import styles from './Footer.scss';

const Footer = ({url}) => {
	return <div className={styles['cta-container']}>
		<div className={styles['btn-block']}>
			<a href={url} className={styles['btn']} data-trackable="event-promo">
				Register now
			</a>
		</div>
		<div className={styles['brand']}>
			Presented by
			<span className={styles['visually-hidden']}>FT live</span>
		</div>
	</div>
};

export default Footer;
