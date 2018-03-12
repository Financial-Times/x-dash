import { SFC } from 'react';
import { TeaserProps } from './types';

const Container: SFC<TeaserProps> = ({ id, modifiers = [], children = [] }) => {
	const classNames = modifiers.map((modifier) => `o-teaser--${modifier}`);

	return (
		<div className={`o-teaser ${classNames.join(' ')} js-teaser`} data-id={id}>
			{children}
		</div>
	);
};

export default Container;
