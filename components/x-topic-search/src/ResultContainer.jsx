import { h } from '@financial-times/x-engine';
import styles from './TopicSearch.scss';
import classNames from 'classnames';

import SuggestionList from './SuggestionList';
import NoSuggestions from './NoSuggestions';

const resultContainerClassNames = [
	'n-ui-hide-core',
	styles['result-container']
].join(' ');

// transform like this => topic1, topic2 and topic3
const transformFollowingTopics = currentlyFollowingTopics => {
	const topicsLength = currentlyFollowingTopics.length;

	return currentlyFollowingTopics
		.map((topic, index) => {
			if (index + 1 === topicsLength) {
				// the last topic
				return  <span key={ index }>and <b>{ topic.name }</b></span>
			} else {
				if ((topicsLength - 2) === index) {
					// one before the last topic
					return <span key={ index }><b>{ topic.name }</b> </span>;
				} else {
					return <span key={ index }><b>{ topic.name }</b>, </span>;
				}
			}
		})
};

export default ({ result, searchTerm }) => (
	<div className={ resultContainerClassNames } data-component="topic-search">
		<ul className={ classNames(styles["suggestions"]) } aria-live="polite">

			{ result.status === 'suggestions' && <SuggestionList suggestions={ result.suggestions } searchTerm={ searchTerm }/> }

			{ result.status === 'no-suggestions' && <NoSuggestions searchTerm={ searchTerm }/> }

			{ result.status === 'all-followed' &&
				<li className={ classNames(styles["no-suggestions"]) }>You already follow { transformFollowingTopics(result.followingTopicsIncludeSearchTerm) }</li> }

		</ul>
	</div>
);
