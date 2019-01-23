import { h } from '@financial-times/x-engine';
import styles from './TopicSearch.scss';
import classNames from 'classnames';

// transform like this => topic1, topic2 and topic3
const arrayToSentence = followedSuggestions => {
	const topicsLength = followedSuggestions.length;

	if (topicsLength === 1) {
		return <b>{ followedSuggestions[0].prefLabel }</b>;
	} else {
		return followedSuggestions
		.map((topic, index) => {
			if (index + 1 === topicsLength) {
				// the last topic
				return  <span key={ index }>and <b>{ topic.prefLabel }</b></span>
			} else {
				if ((topicsLength - 2) === index) {
					// one before the last topic
					return <span key={ index }><b>{ topic.prefLabel }</b> </span>;
				} else {
					return <span key={ index }><b>{ topic.prefLabel }</b>, </span>;
				}
			}
		})
	}

};

export default ({ followedSuggestions }) => (
	<div className={ classNames(styles["all-followed"]) } aria-live="polite">
		You already follow { arrayToSentence(followedSuggestions) }
	</div>
);
