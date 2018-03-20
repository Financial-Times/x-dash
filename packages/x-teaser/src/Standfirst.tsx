import { TeaserProps } from './types/Props';
import { h, Component } from '@financial-times/x-engine';

const Standfirst: Component<TeaserProps> = ({ standfirst }) => (
	<p className="o-teaser__standfirst">{standfirst}</p>
);

export default Standfirst;
