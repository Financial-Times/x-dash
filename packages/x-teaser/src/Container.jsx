const h = require('@financial-times/x-engine');

const dynamicModifiers = (props) => {
	const modifiers = [];

	if (props.showImage && props.image) {
		modifiers.push('has-image');
	}

	if (props.showHeadshot && props.headshot) {
		modifiers.push('has-headshot');
	}

	return modifiers;
};

module.exports = (props) => {
	const variants = [props.type, props.layout].concat(props.modifiers).concat(dynamicModifiers(props));

	const classNames = variants.map((mod) => `o-teaser--${mod}`).join(' ');

	return (
		<div className={`o-teaser ${classNames} js-teaser`} data-id={props.id}>
			{props.children}
		</div>
	);
};
