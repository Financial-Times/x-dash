import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';
import styles from './TopicSearch.scss';
import classNames from 'classnames';
import getSuggestions from './lib/get-suggestions.js';
import debounce from 'debounce-promise';
import ResultContainer from './ResultContainer';

const containerClassNames = [
	'n-ui-hide-core',
	styles['container']
].join(' ');

const debounceGetSuggestions = debounce(getSuggestions, 150);

let resultExist = false;

const topicSearchActions = withActions(({ minSearchLength = 2, maxSuggestions = 5, apiUrl, currentlyFollowingTopics }) => ({
	async checkInput(event) {
		const searchTerm = event.target.value && event.target.value.trim();

		if (searchTerm.length >= minSearchLength) {
			return debounceGetSuggestions(searchTerm, maxSuggestions, apiUrl, currentlyFollowingTopics)
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

	selectInput (event) {
		event.target.select();
		return { showResult: resultExist };
	},

	hideResult() {
		return { showResult: false };
	}
}));

const TopicSearch = topicSearchActions((props) => (
	<div className={ containerClassNames }>
		<h2 className="o-normalise-visually-hidden">
			Search for topics, authors, companies, or other areas of interest
		</h2>

		<label className="o-normalise-visually-hidden" htmlFor="topic-search-input">
			Search and add topics
		</label>
		<div className={ classNames(styles["input-wrapper"]) }>
			<i className={ classNames(styles["search-icon"]) }></i>
			<input
				type="search"
				id="topic-search-input"
				placeholder="Search and add topics"
				className={ classNames(styles["input"]) }
				data-trackable="topic-search"
				onChange={ props.actions.checkInput }
				onClick={ props.actions.selectInput }
				onFocus={ props.actions.selectInput }
				onBlur={ props.actions.hideResult }
			/>
		</div>

		{ props.showResult && !props.isLoading && <ResultContainer {...props}/> }

	</div>
));

export { TopicSearch };
