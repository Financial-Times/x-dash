import { h } from '@financial-times/x-engine';
import Details from './Details';
import ImagesContainer from './ImagesContainer';
import styles from './Eventpromo.scss';

const Eventpromo = (props) => {
	return (
		<div className={styles.eventpromo} data-event-focus="" data-focus-concept={props.id}>
			<Details {...props} />
			<ImagesContainer {...props} />
		</div>
	);
};

export { Eventpromo };
