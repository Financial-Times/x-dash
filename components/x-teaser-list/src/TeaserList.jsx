import { h } from '@financial-times/x-engine';
import { ArticleSaveButton } from '@financial-times/x-article-save-button';
import classNames from 'classnames';
import styles from './TeaserList.scss';

const TeaserList = (props) => (
	<div className={classNames(styles.root)}>
		<h1>Welcome to x-teaser-list</h1>
		<p>{props.message}</p>

		<ArticleSaveButton
			id="article-save-button-static-id"
			contentId="0000-0000-0000-0000"
			contentTitle="UK crime agency steps up assault on Russian dirty money"
			csrfToken="dummy-token"
			saved={false}
			trackableId="trackable-id"
		/>
	</div>
);

export { TeaserList };
