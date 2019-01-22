import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';
import styles from './TopicSearch.scss';
import classNames from 'classnames';
import getSuggestions from './lib/get-suggestions.js';
import debounce from 'debounce-promise';

import SuggestionList from './SuggestionList';
import NoSuggestions from './NoSuggestions';
import AllFollowed from './AllFollowed';

const debounceGetSuggestions = debounce(getSuggestions, 150);
const getFollowedTopicIndex = (followedTopics, targetTopicId) => (
	followedTopics.findIndex(topic => topic && topic.conceptId || topic.uuid === targetTopicId)
);

let resultExist = false;

const topicSearchActions = withActions(({ minSearchLength = 2, maxSuggestions = 5, apiUrl, followedTopics = [] }) => ({
	async checkInput(event) {
		const searchTerm = event.target.value && event.target.value.trim();

		if (searchTerm.length >= minSearchLength) {
			return debounceGetSuggestions(searchTerm, maxSuggestions, apiUrl, followedTopics)
				.then(result => {
					resultExist = true;
					return { showResult: true, result, searchTerm };
				})
				.catch(() => {
					resultExist = false;
					return { showResult: false };
				});
		} else {
			resultExist = false;
			return Promise.resolve({ showResult: false });
		}
	},

	topicFollowed (subjectId) {
		const followedTopicIndex = getFollowedTopicIndex(followedTopics, subjectId);

		if (followedTopicIndex === -1) {
			followedTopics.push({ uuid: subjectId })
		}

		return { followedTopics };
	},

	topicUnfollowed (subjectId) {
		const unfollowedTopicIndex = getFollowedTopicIndex(followedTopics, subjectId);

		if (unfollowedTopicIndex > -1) {
			followedTopics.splice(unfollowedTopicIndex, 1);
		}

		return { followedTopics };
	},

	selectInput (event) {
		event.target.select();
		return { showResult: resultExist };
	},

	hideResult() {
		return { showResult: false };
	}
}));

const TopicSearch = topicSearchActions(({ searchTerm, showResult, result, actions, isLoading, csrfToken }) => (
	<div className={ classNames(styles['container']) }>
		<h2 className="o-normalise-visually-hidden">
			Search for topics, authors, companies, or other areas of interest
		</h2>

		<label className="o-normalise-visually-hidden" htmlFor="topic-search-input">
			Search and add topics
		</label>
		<div className={ classNames(styles["input-wrapper"]) }>
			<i className={ classNames(styles["search-icon"]) }/>
			<input
				type="search"
				id="topic-search-input"
				placeholder="Search and add topics"
				className={ classNames(styles["input"]) }
				data-trackable="topic-search"
				onInput={ actions.checkInput }
				onClick={ actions.selectInput }
				onFocus={ actions.selectInput }
				onBlur={ actions.hideResult }/>
		</div>

		{ showResult && !isLoading &&
			<div className={ classNames(styles['result-container']) } data-component="topic-search">

					{ result.matchingUnfollowedTopics.length > 0 &&
						<SuggestionList suggestions={ result.matchingUnfollowedTopics } searchTerm={ searchTerm } csrfToken={ csrfToken }/> }

					{ !result.matchingUnfollowedTopics.length && result.matchingFollowedTopics.length > 0 &&
						<AllFollowed matchingFollowedTopics={ result.matchingFollowedTopics }/> }

					{ !result.matchingUnfollowedTopics.length && !result.matchingFollowedTopics.length &&
						<NoSuggestions searchTerm={ searchTerm }/> }
			</div> }

	</div>
));

export { TopicSearch };
