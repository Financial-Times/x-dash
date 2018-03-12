import { SFC } from 'react';
import { TeaserProps } from './types';

const Standfirst: SFC<TeaserProps> = ({ standfirst }) => (
	<p className="o-teaser__standfirst">{standfirst}</p>
);

export default Standfirst;
