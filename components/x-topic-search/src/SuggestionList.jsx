import { h } from '@financial-times/x-engine';
import { FollowButton } from '@financial-times/x-follow-button';
import styles from './TopicSearch.scss';
import classNames from 'classnames';

export default ({ suggestions, searchTerm, csrfToken }) => {

	const listResults = suggestions.map((suggestion, index) => (

			<li className={ classNames(styles["suggestion"]) }
				key={ index }
				data-trackable="myft-topic"
				data-concept-id={ suggestion.id }
				data-trackable-meta={ '{"search-term":"' + searchTerm + '"}' }>

				<a data-trackable="topic-link" className={ classNames(styles["suggestion__name"]) } href={ suggestion.url }>
					{ suggestion.prefLabel }
				</a>

				<FollowButton conceptId={ suggestion.id } conceptName={ suggestion.prefLabel } csrfToken={ csrfToken }/>

			</li>

	))

	return (
		<ul className={ classNames(styles["suggestions"]) } aria-live="polite">
			{ listResults }
		</ul>);
};
