import { SFC } from 'react';
import { TeaserProps } from './types/Props';
import { h } from '@financial-times/x-engine';

const Container: SFC<TeaserProps> = ({ id, modifiers = [], children = [] }) => {
	const classNames = modifiers.map((modifier) => `o-teaser--${modifier}`);

	return (
		<div className={`o-teaser ${classNames.join(' ')} js-teaser`} data-id={id}>
			{children}
		</div>
	);
};

export default Container;
