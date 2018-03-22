const h = require('@financial-times/x-engine');
const { ImageSizes } = require('./concerns/constants');
const imageService = require('./concerns/image-service');

module.exports = ({ url, image }) => {
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
