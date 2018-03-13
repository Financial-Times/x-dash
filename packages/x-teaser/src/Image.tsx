import { SFC } from 'react';
import { TeaserProps } from './types';
import { ImageSizes } from './concerns/constants';
import imageService from './concerns/image-service';

// JSX factory function
declare const h: any;

const Image: SFC<TeaserProps> = ({ url, image }) => {
	if (image) {
		// TODO: make image size configurable
		const size = ImageSizes.Small;

		return (
			<div className="o-teaser__image-container js-teaser-image-container">
				<a href={url} data-trackable="image-link" tab-index="-1" aria-hidden="true">
					<img src={imageService(image.url, size)} alt="" role="presentation" />
				</a>
			</div>
		);
	}

	// Always return null if you don't want to render anything.
	return null;
};

export default Image;
