const h = require('@financial-times/x-engine');

const dynamicModifiers = (props) => {
	const modifiers = [];

	// TODO: make this into rules based system
	if (props.showImage && props.image) {
		modifiers.push('has-image');
	}

	if (props.showHeadshot && props.headshot && props.indicators.isColumn) {
		modifiers.push('has-headshot');
	}

	if (props.indicators.isOpinion) {
		modifiers.push('opinion');
	}

	if (props.indicators.isEditorsChoice) {
		modifiers.push('highlight');
	}

	return modifiers;
};

module.exports = (props) => {
	// NOTE: Modifier props may be a string rather than a string[]
	const variants = [props.type, props.layout].concat(props.modifiers).concat(dynamicModifiers(props));

	const classNames = variants.map((mod) => `o-teaser--${mod}`).join(' ');

	return (
		<div className={`o-teaser ${classNames} js-teaser`} data-id={props.id}>
			{props.children}
		</div>
	);
};
