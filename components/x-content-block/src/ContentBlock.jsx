import { h } from '@financial-times/x-engine';
import styles from './ContentBlock.scss';

const ContentBlock = (props) => (
	<div className='x-content-block'>
		<h1 className={styles.heading}>{props.title}</h1>
		{props.isBreakingNews && <span>Breaking News!!!</span>}
		<p dangerouslySetInnerHTML={{__html: props.content}} />
	</div>
);

export { ContentBlock };
