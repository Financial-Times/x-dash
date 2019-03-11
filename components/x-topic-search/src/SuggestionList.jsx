import { h } from '@financial-times/x-engine';
import { FollowButton } from '@financial-times/x-follow-button';
import styles from './TopicSearch.scss';
import classNames from 'classnames';

const defaultFollowButtonRender = (concept, csrfToken, followedTopicIds) => (
	<FollowButton
		conceptId={concept.id}
		conceptName={concept.prefLabel}
		csrfToken={csrfToken}
		isFollowed={followedTopicIds.includes(concept.id)}
	/>
);

export default ({ suggestions, renderFollowButton, searchTerm, csrfToken, followedTopicIds = [] }) => {
	renderFollowButton = typeof renderFollowButton === 'function' ? renderFollowButton : defaultFollowButtonRender;

	return (
		<ul className={classNames(styles["suggestions"])} aria-live="polite">

			{suggestions.map(suggestion => (
				<li className={classNames(styles["suggestion"])}
					key={suggestion.id}
					data-trackable="myft-topic"
					data-concept-id={suggestion.id}
					data-trackable-meta={'{"search-term":"' + searchTerm + '"}'}>

					<a data-trackable="topic-link"
						className={classNames(styles["suggestion__name"])}
						href={suggestion.url || `/stream/${suggestion.id}`}>
						{suggestion.prefLabel}
					</a>

					{renderFollowButton(suggestion, csrfToken, followedTopicIds)}
				</li>
			))}

		</ul>
	);
};
