import { h } from '@financial-times/x-engine';
import styles from './TopicSearch.scss';
import classNames from 'classnames';

import SuggestionList from './SuggestionList';
import NoSuggestions from './NoSuggestions';

// transform like this => topic1, topic2 and topic3
const arrayToSentence = followedSuggestions => {
	const topicsLength = followedSuggestions.length;

	return followedSuggestions.map((topic, index) => (
		<span key={ topic.id }>
			{topicsLength > 1 && index === topicsLength - 1 && ' and '}
			<b>{topic.prefLabel}</b>
			{index < topicsLength - 2 && ', '}
		</span>
	));
};


export default ({ followedSuggestions, searchTerm, csrfToken, followedTopicIds, unfollowedSuggestions }) => {
	const hasFollowedSuggestions = followedSuggestions.length > 0;
	const hasUnfollowedSuggestions = unfollowedSuggestions.length > 0;

	return (
		<div className={ classNames(styles['result-container']) }>
			{hasUnfollowedSuggestions &&
				<SuggestionList
					suggestions={ unfollowedSuggestions }
					searchTerm={ searchTerm }
					csrfToken={ csrfToken }
					followedTopicIds={ followedTopicIds }
				/>}

			{!hasUnfollowedSuggestions && hasFollowedSuggestions &&
				<div className={ classNames(styles["all-followed"]) } aria-live="polite">
					You already follow { arrayToSentence(followedSuggestions) }
				</div>}

			{!hasUnfollowedSuggestions && !hasFollowedSuggestions &&
				<NoSuggestions searchTerm={ searchTerm }/>}
		</div>
	);
};
