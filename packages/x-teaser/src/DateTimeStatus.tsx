import { TeaserProps } from './types/Props';
import { h, Component } from '@financial-times/x-engine';
import TimeStamp from './TimeStamp';
import RelativeTime from './RelativeTime';
import LiveBlogStatus from './LiveBlogStatus';

const DateTimeStatus: Component<TeaserProps> = (props) => {
	if (props.status) {
		return <LiveBlogStatus {...props} />;
	}

	if (props.useRelativeTime) {
		return <RelativeTime {...props} />;
	}

	return <TimeStamp {...props} />;
};

export default DateTimeStatus;
