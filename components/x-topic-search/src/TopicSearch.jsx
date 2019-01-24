import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';
import styles from './TopicSearch.scss';
import classNames from 'classnames';
import getSuggestions from './lib/get-suggestions.js';
import debounce from 'debounce-promise';

import ResultContainer from './ResultContainer';

const debounceGetSuggestions = debounce(getSuggestions, 150);

let resultExists = false;

const topicSearchActions = withActions(({ minSearchLength = 2, maxSuggestions = 5, apiUrl, followedTopicIds = [] }) => ({
	async checkInput(event) {
		const searchTerm = event.target.value && event.target.value.trim();

		if (searchTerm.length >= minSearchLength) {
			return debounceGetSuggestions(searchTerm, maxSuggestions, apiUrl, followedTopicIds)
				.then(result => {
					resultExists = true;
					return { showResult: true, result, searchTerm };
				})
				.catch(() => {
					resultExists = false;
					return { showResult: false };
				});
		} else {
			resultExists = false;
			return Promise.resolve({ showResult: false });
		}
	},

	topicFollowed (subjectId) {
		if (!followedTopicIds.includes(subjectId)) {
			followedTopicIds.push(subjectId);
		}

		return { followedTopicIds };
	},

	topicUnfollowed (subjectId) {
		const targetIdIndex = followedTopicIds.indexOf(subjectId);

		if (targetIdIndex > -1) {
			followedTopicIds.splice(targetIdIndex, 1);
		}

		return { followedTopicIds };
	},

	selectInput (event) {
		event.target.select();
		return { showResult: resultExists };
	},

	hideResult() {
		return { showResult: false };
	}
}));

const TopicSearch = topicSearchActions(({ searchTerm, showResult, result, actions, isLoading, csrfToken, followedTopicIds }) => (
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
			<ResultContainer
				result={ result }
				searchTerm={ searchTerm }
				csrfToken={ csrfToken }
				followedTopicIds={ followedTopicIds }/> }

	</div>
));

export { TopicSearch };
