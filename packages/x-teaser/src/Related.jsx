const h = require('@financial-times/x-engine');

const renderItem = ({ id, url, type, title }) => (
	<li class={`o-teaser__related-item o-teaser__related-item--${type}`} data-content-id={id}>
		<a data-trackable="related" href={url}>{title}</a>
	</li>
);

module.exports = ({ related = [] }) => (
	related && related.length ? (
		<ul class="o-teaser__related">
			{related.map(renderItem)}
		</ul>
	) : null
);
