import { TeaserProps } from './types/Props';
import { h, Component } from '@financial-times/x-engine';

enum LiveBlogLabels {
	inprogress = 'Live',
	comingsoon = 'Coming Soon',
	closed = ''
}

enum LiveBlogModifiers {
	inprogress = 'live',
	comingsoon = 'pending',
	closed = 'closed'
}

const LiveBlogStatus: Component<TeaserProps> = ({ status }) =>
	status ? (
		<div className={`o-teaser__timestamp o-teaser__timestamp--${LiveBlogModifiers[status]}`}>
			<span className="o-teaser__timestamp-prefix">{LiveBlogLabels[status]}</span>
		</div>
	) : null;

export default LiveBlogStatus;
