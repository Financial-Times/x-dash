import { SFC } from 'react';
import { TeaserProps } from './types/Props';

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

// JSX factory function
declare const h: any;

const LiveBlogStatus: SFC<TeaserProps> = ({ status }) =>
	status ? (
		<div className={`o-teaser__timestamp o-teaser__timestamp--${LiveBlogModifiers[status]}`}>
			<span className="o-teaser__timestamp-prefix">{LiveBlogLabels[status]}</span>
		</div>
	) : null;

export default LiveBlogStatus;
