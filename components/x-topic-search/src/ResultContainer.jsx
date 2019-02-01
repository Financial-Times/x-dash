import { h } from '@financial-times/x-engine';
import styles from './TopicSearch.scss';
import classNames from 'classnames';

import SuggestionList from './SuggestionList';
import NoSuggestions from './NoSuggestions';
import SuggestionsAsSentence from './SuggestionsAsSentence';

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
					You already follow <SuggestionsAsSentence suggestions={followedSuggestions} />
				</div>}

			{!hasUnfollowedSuggestions && !hasFollowedSuggestions &&
				<NoSuggestions searchTerm={ searchTerm }/>}
		</div>
	);
};
