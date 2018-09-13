import { h } from '@financial-times/x-engine';
import styles from './ArticleSaveButton.css';
import classNames from 'classnames';

let cx = classNames.bind(styles);

const ArticleSaveButton = props => (
	<div className={cx(styles['article-save-button'])}>
		Article Save Button
	</div>
);

export {
	ArticleSaveButton
};
