import { h } from '@financial-times/x-engine';
import styles from './GiftArticle.css';

const titleClassNames = [
	styles.title,
	styles.bold
].join(' ');

export default ({ title }) => (
	<div className={ titleClassNames }>{ title }</div>
);
