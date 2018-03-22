const h = require('@financial-times/x-engine');

module.exports = ({ conceptPrefix, concept, alternativeConcept, useAlternativeConcept, conceptSuffix }) => {
	const displayConcept = useAlternativeConcept && alternativeConcept ? alternativeConcept : concept;

	return (
		<div className="o-teaser__meta">
			{conceptPrefix ? <span className="o-teaser__tag-prefix">{conceptPrefix}</span> : null}
			{displayConcept ? (
				<a className="o-teaser__tag" href={displayConcept.url} data-trackable="teaser-concept">
					{displayConcept.prefLabel}
				</a>
			) : null}
			{conceptSuffix ? <span className="o-teaser__promoted-prefix">{conceptSuffix}</span> : null}
		</div>
	);
};
