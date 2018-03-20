import { SFC } from 'react';
import { TeaserProps } from './types/Props';
import { h } from '@financial-times/x-engine';

const Standfirst: SFC<TeaserProps> = ({ standfirst }) => (
	<p className="o-teaser__standfirst">{standfirst}</p>
);

export default Standfirst;
