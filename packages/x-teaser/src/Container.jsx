const h = require('@financial-times/x-engine');

module.exports = ({ id, modifiers = [], children = [] }) => {
	const classNames = modifiers.map((modifier) => `o-teaser--${modifier}`);

	return (
		<div className={`o-teaser ${classNames.join(' ')} js-teaser`} data-id={id}>
			{children}
		</div>
	);
};
