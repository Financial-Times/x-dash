import { h } from '@financial-times/x-engine';
import styles from './Meta.scss';

const Meta = ({ location, dates }) => {
	return (
		<div className={styles.meta}>
			<p>{location}</p>
			<p>{dates}</p>
		</div>
	);
};

export default Meta;
