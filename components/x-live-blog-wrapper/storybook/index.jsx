import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { LiveBlogWrapper } from '../src/LiveBlogWrapper';

const defaultProps = {
	message: 'Test'
};

const toggleMessage = () => text('Message', defaultProps.message);

storiesOf('x-live-blog-wrapper', module)
	.addDecorator(withKnobs)
	.addParameters({
		knobs: {
			escapeHTML: false
		}
	})
	.add('Content Body', () => {
		const knobs = {
			message: toggleMessage(),
		};

		return <LiveBlogWrapper {...defaultProps} {...knobs} />;
	});
