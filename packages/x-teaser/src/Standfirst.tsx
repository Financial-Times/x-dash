import { SFC } from 'react';
import { TeaserProps } from './types';

// JSX factory function
declare const h: any;

const Standfirst: SFC<TeaserProps> = ({ standfirst }) => (
	<p className="o-teaser__standfirst">{standfirst}</p>
);

export default Standfirst;
