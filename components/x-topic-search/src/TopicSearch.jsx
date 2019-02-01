import { h, Component } from '@financial-times/x-engine';
import styles from './TopicSearch.scss';
import classNames from 'classnames';
import getSuggestions from './lib/get-suggestions.js';
import debounce from 'debounce-promise';
import SuggestionList from './SuggestionList';
import NoSuggestions from './NoSuggestions';

class TopicSearch extends Component {
	constructor(props) {
		super(props);

		this.minSearchLength = props.minSearchLength || 2;
		this.maxSuggestions = props.maxSuggestions || 5;
		this.apiUrl = props.apiUrl;
		this.getSuggestions = debounce(getSuggestions, 150);
		this.outsideEvents = ['focusout', 'focusin', 'click'];
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleInputClickOrFocus = this.handleInputClickOrFocus.bind(this);
		this.handleInteractionOutside = this.handleInteractionOutside.bind(this);

		this.state = {
			followedTopicIds: props.followedTopicIds || [],
			searchTerm: '',
			showResult: false
		};
	}

	componentDidMount() {
		this.outsideEvents.forEach(action => {
			document.body.addEventListener(action, this.handleInteractionOutside);
		});
	}

	componentWillUnmount() {
		this.outsideEvents.forEach(action => {
			document.body.removeEventListener(action, this.handleInteractionOutside);
		});
	}

	handleInputChange(event) {
		const searchTerm = event.target.value.trim();

		this.setState({ searchTerm });

		if (searchTerm.length >= this.minSearchLength) {
			this.getSuggestions(searchTerm, this.maxSuggestions, this.apiUrl)
				.then(({ suggestions }) => {
					this.setState({
						suggestions,
						showResult: true
					});
				})
				.catch(() => {
					this.setState({
						showResult: false
					});
				});
		} else {
			this.setState({
				showResult: false
			});
		}
	}

	handleInteractionOutside(event) {
		if (!this.rootEl.contains(event.target)) {
			this.setState({
				showResult: false
			});
		}
	}

	handleInputClickOrFocus() {
		if (this.state.searchTerm.length >= this.minSearchLength) {
			this.setState({
				showResult: true
			});
		}
	}

	render() {
		const { csrfToken, followedTopicIds } = this.props;
		const { searchTerm, showResult, suggestions } = this.state;

		return (
			<div className={ classNames(styles['container']) } ref={el => this.rootEl = el}>
				<h2 className="o-normalise-visually-hidden">
					Search for topics, authors, companies, or other areas of interest
				</h2>

				<label className="o-normalise-visually-hidden" htmlFor="topic-search-input">Search and add topics</label>
				<div className={ classNames(styles["input-wrapper"]) }>
					<i className={ classNames(styles["search-icon"]) }/>
					<input
						type="search"
						id="topic-search-input"
						placeholder="Search and add topics"
						className={ classNames(styles["input"]) }
						data-trackable="topic-search"
						autoComplete="off"
						onInput={this.handleInputChange}
						onClick={this.handleInputClickOrFocus}
						onFocus={this.handleInputClickOrFocus}
					/>
				</div>

				{showResult && searchTerm.length >= this.minSearchLength &&
					<div className={classNames(styles['result-container'])}>
						{suggestions.length > 0 ?
							<SuggestionList
								csrfToken={csrfToken}
								followedTopicIds={followedTopicIds}
								searchTerm={searchTerm}
								suggestions={suggestions}
							/> :
							<NoSuggestions searchTerm={ searchTerm }/>}
					</div>}
			</div>
		);
	}
}

export { TopicSearch };
