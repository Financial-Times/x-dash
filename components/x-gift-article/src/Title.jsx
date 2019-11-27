import { h } from '@financial-times/x-engine';
import styles from './GiftArticle.scss';

const titleClassNames = [
	styles.title
].join(' ');

export default ({ title }) => (
	<div className={ titleClassNames } id="gift-article-title">{ title }</div>
);
