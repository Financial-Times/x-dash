import { h } from '@financial-times/x-engine';
import styles from './TopicSearch.scss';
import classNames from 'classnames';

export default ({ suggestions, searchTerm }) => {
	 // TODO use x-follow-button
	const listResults = suggestions.map((suggestion, index) => (
		<li className={ classNames(styles["suggestion"]) }
			key={ index }
			data-trackable="myft-topic"
			data-concept-id={ suggestion.conceptId }
			data-trackable-meta={ '{"search-term":"' + searchTerm + '"}' }>

			<a data-trackable="topic-link" className={ classNames(styles["suggestion__name"]) } href={ suggestion.url }>{ suggestion.prefLabel }</a>

			<button>add to myFT</button>

		</li>
	))

	return listResults;
};
