import { h } from '@financial-times/x-engine';
import styles from './TopicSearch.scss';
import classNames from 'classnames';

// transform like this => topic1, topic2 and topic3
const transformFollowedTopics = followedTopicsIncludeSearchTerm => {
	const topicsLength = followedTopicsIncludeSearchTerm.length;

	return followedTopicsIncludeSearchTerm
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

export default ({ followedTopicsIncludeSearchTerm }) => (
	<div className={ classNames(styles["all-followed"]) } aria-live="polite">
		You already follow { transformFollowedTopics(followedTopicsIncludeSearchTerm) }
	</div>
);
