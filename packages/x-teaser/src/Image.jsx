const h = require('@financial-times/x-engine');
const { ImageSizes } = require('./concerns/constants');
const imageService = require('./concerns/image-service');

module.exports = ({ url, image, imageSize }) => {
	// TODO: make image size configurable
	return image ? (
		<div className="o-teaser__image-container js-teaser-image-container">
			<a href={url} data-trackable="image-link" tab-index="-1" aria-hidden="true">
				<img
					src={imageService(image.url, ImageSizes[imageSize])}
					alt=""
					role="presentation"
				/>
			</a>
		</div>
	) : null;
};
