import { h } from '@financial-times/x-engine'
import { FollowButton } from '@financial-times/x-follow-button'

const defaultFollowButtonRender = (concept, csrfToken, followedTopicIds) => (
	<FollowButton
		conceptId={concept.id}
		conceptName={concept.prefLabel}
		csrfToken={csrfToken}
		isFollowed={followedTopicIds.includes(concept.id)}
	/>
)

export default ({ suggestions, renderFollowButton, searchTerm, csrfToken, followedTopicIds = [] }) => {
	renderFollowButton =
		typeof renderFollowButton === 'function' ? renderFollowButton : defaultFollowButtonRender

	return (
		<ul className="x-topic-search-suggestions" aria-live="polite">
			{suggestions.map((suggestion) => (
				<li
					className="x-topic-search-suggestions__suggestion"
					key={suggestion.id}
					data-trackable="myft-topic"
					data-concept-id={suggestion.id}
					data-trackable-meta={'{"search-term":"' + searchTerm + '"}'}
				>
					<a
						data-trackable="topic-link"
						className="x-topic-search-suggestions__suggestion-name"
						href={suggestion.url || `/stream/${suggestion.id}`}
					>
						{suggestion.prefLabel}
					</a>

					{renderFollowButton(suggestion, csrfToken, followedTopicIds)}
				</li>
			))}
		</ul>
	)
}
