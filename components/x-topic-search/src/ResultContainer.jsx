import { h } from '@financial-times/x-engine';
import styles from './TopicSearch.scss';
import classNames from 'classnames';

import SuggestionList from './SuggestionList';
import NoSuggestions from './NoSuggestions';

// transform like this => topic1, topic2 and topic3
const arrayToSentence = followedSuggestions => {
	const topicsLength = followedSuggestions.length;

	if (topicsLength === 1) {
		return <b>{ followedSuggestions[0].prefLabel }</b>;
	} else {
		return followedSuggestions
			.map((topic, index) => {
				if (index === topicsLength - 1) {
					// the last topic
					return  <span key={ topic.id }>and <b>{ topic.prefLabel }</b></span>
				} else if (index === topicsLength - 2) {
					// one before the last topic
					return <span key={ topic.id }><b>{ topic.prefLabel }</b> </span>;
				} else {
					return <span key={ topic.id }><b>{ topic.prefLabel }</b>, </span>;
				}
			})
	}

};


export default ({ result, searchTerm, csrfToken, followedTopicIds }) => {

	const hasFollowedSuggestions = result.followedSuggestions.length > 0;
	const hasUnfollowedSuggestions = result.unfollowedSuggestions.length > 0;

	return (
		<div className={ classNames(styles['result-container']) } data-component="topic-search">

			{ hasUnfollowedSuggestions &&
				<SuggestionList
				suggestions={ result.unfollowedSuggestions }
				searchTerm={ searchTerm }
				csrfToken={ csrfToken }
				followedTopicIds={ followedTopicIds }/> }

			{ !hasUnfollowedSuggestions && hasFollowedSuggestions &&
				<div className={ classNames(styles["all-followed"]) } aria-live="polite">
				You already follow { arrayToSentence(result.followedSuggestions) }
				</div> }

			{ !hasUnfollowedSuggestions && !hasFollowedSuggestions &&
				<NoSuggestions searchTerm={ searchTerm }/> }

		</div>
	);
};
