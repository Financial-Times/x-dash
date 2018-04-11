const h = require('@financial-times/x-engine');

module.exports = ({ conceptPrefix, concept, altConcept, useAltConcept, conceptSuffix }) => {
	const displayConcept = useAltConcept && altConcept ? altConcept : concept;
	const displayUrl = displayConcept.relativeUrl || displayConcept.url;

	return (
		<div className="o-teaser__meta-concept">
			{conceptPrefix ? <span className="o-teaser__tag-prefix">{conceptPrefix}</span> : null}
			{displayConcept ? (
				<a className="o-teaser__tag" href={displayUrl} data-trackable="teaser-concept">
					{` ${displayConcept.prefLabel} `}
				</a>
			) : null}
			{conceptSuffix ? <span className="o-teaser__tag-suffix">{conceptSuffix}</span> : null}
		</div>
	);
};
