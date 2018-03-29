const h = require('@financial-times/x-engine');

const Concept = require('./Concept');
const Promoted = require('./Promoted');

module.exports = (props) => {
	const showPromoted = props.promotedPrefix && props.promotedSuffix;

	return (
		<div className="o-teaser__meta">
			{showPromoted ? <Promoted {...props} /> : <Concept {...props} />}
		</div>
	);
};
