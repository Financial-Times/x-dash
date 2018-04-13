const h = require('@financial-times/x-engine');

const renderLink = ({ id, url, type, title }, i) => (
	<li key={`related-${i}`} class={`o-teaser__related-item o-teaser__related-item--${type}`} data-content-id={id}>
		<a data-trackable="related" href={url}>{title}</a>
	</li>
);

module.exports = ({ relatedLinks = [] }) => (
	relatedLinks && relatedLinks.length ? (
		<ul class="o-teaser__related">
			{relatedLinks.map(renderLink)}
		</ul>
	) : null
);
