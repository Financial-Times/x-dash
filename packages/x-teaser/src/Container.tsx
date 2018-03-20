import { TeaserProps } from './types/Props';
import { h, Component } from '@financial-times/x-engine';

const Container: Component<TeaserProps> = ({ id, modifiers = [], children = [] }) => {
	const classNames = modifiers.map((modifier) => `o-teaser--${modifier}`);

	return (
		<div className={`o-teaser ${classNames.join(' ')} js-teaser`} data-id={id}>
			{children}
		</div>
	);
};

export default Container;
