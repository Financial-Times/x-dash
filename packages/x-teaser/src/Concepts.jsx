const h = require('@financial-times/x-engine');

module.exports = ({ conceptPrefix, concept, conceptSuffix }) => (
	<div className="o-teaser__meta">
		{conceptPrefix ? (
			<span className="o-teaser__tag-prefix">{conceptPrefix}</span>
		) : null}
		{concept ? (
			<a className="o-teaser__tag" href={concept.url} data-trackable="teaser-concept">
				{concept.prefLabel}
			</a>
		) : null}
		{conceptSuffix ? (
			<span className="o-teaser__promoted-prefix">{conceptSuffix}</span>
		) : null}
	</div>
);
