const h = require('@financial-times/x-engine');
const rules = require('./concerns/rules');

const dynamicModifiers = (props) => {
	const modifiers = [];

	const media = rules('media', props);

	if (media) {
		modifiers.push(`has-${media}`);
	}

	const theme = rules('theme', props);

	if (theme) {
		modifiers.push(theme);
	}

	return modifiers;
};

module.exports = (props) => {
	// NOTE: Modifier props may be a string rather than a string[] so concat, don't spread.
	const variants = [props.type, props.layout].concat(props.modifiers, dynamicModifiers(props));

	const classNames = variants.map((mod) => `o-teaser--${mod}`).filter(Boolean).join(' ');

	return (
		<div className={`o-teaser ${classNames} js-teaser`} data-id={props.id}>
			{props.children}
		</div>
	);
};
