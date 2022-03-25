import { h } from '@financial-times/x-engine'

export default ({ searchTerm }) => (
	<div className="x-topic-search-no-suggestions" aria-live="polite">
		<h2 className="x-topic-search-no-suggestions__title">
			No topics matching <b>{searchTerm}</b>
		</h2>

		<p>Suggestions:</p>

		<ul className="x-topic-search-no-suggestions__message">
			<li>Make sure that all words are spelled correctly.</li>
			<li>Try different keywords.</li>
			<li>Try more general keywords.</li>
			<li>Try fewer keywords.</li>
		</ul>
	</div>
)
