import { SFC } from 'react';
import { TeaserProps } from './types';
import TimeStamp from './TimeStamp';
import RelativeTime from './RelativeTime';
import LiveBlogStatus from './LiveBlogStatus';

const DateTimeStatus: SFC<TeaserProps> = (props) => {
	if (props.status) {
		return <LiveBlogStatus {...props} />;
	}

	if (props.useRelativeTime) {
		return <RelativeTime {...props} />;
	}

	return <TimeStamp {...props} />;
};

export default DateTimeStatus;
