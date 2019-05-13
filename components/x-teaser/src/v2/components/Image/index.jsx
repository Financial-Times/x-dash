/* eslint-disable jsx-a11y/alt-text */

import { h } from '@financial-times/x-engine';
import c from 'classnames';

// Transparent PNG with 16:9 dimensions
const placeholderSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAABaCAQAAACVz5XZAAAAhklEQVR42u3QMQ0AAAwDoNW/6Yno1QQkkKMSBQIFChSIQIECBSJQoECBCBQoUCACBQoUiECBAgUiUKBAgQgUKFAgAgUKFIhAgQIFIlCgQIECEShQoEAEChQoEIECBQpEoECBAhEoUKBABAoUKBCBAgUKRKBAgQIRKFCgQAQKFChQoAKBApc9gMUAW29OZusAAAAASUVORK5CYII=';

const Image = ({ src, isLazyLoaded, lazyLoadClassName, className }) => {
	const fullClassName = c(className, lazyLoadClassName);
	const actualSrc = src || placeholderSrc;
	const commonProps = {
		className: fullClassName,
		alt: 'Article image',
	};

	return isLazyLoaded ? (
		<img data-src={actualSrc} {...commonProps} />
	) : (
		<img src={actualSrc} {...commonProps} />
	)
}

export default Image;
