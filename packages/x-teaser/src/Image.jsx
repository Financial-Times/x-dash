const h = require('@financial-times/x-engine');
const { ImageSizes } = require('./concerns/constants');
const imageService = require('./concerns/image-service');

/**
 * Aspect Ratio
 * @param {{ width: Number, height: Number }} width
 * @returns {String|null}
 */
const aspectRatio = ({ width, height }) => {
	if (typeof width === 'number' && typeof height === 'number') {
		const ratio = 100 / width * height;
		return ratio.toFixed(4) + '%';
	}

	return null;
};

module.exports = ({ url, image, imageSize, title }) => {
	return image ? (
		<div className="o-teaser__image-container js-teaser-image-container">
			<div className="o-teaser__image-placeholder" style={{ paddingBottom: aspectRatio(image) }}>
				<a href={url} data-trackable="image-link" tab-index="-1" aria-hidden="true" title={title}>
					<img className="o-teaser__image" src={imageService(image.url, ImageSizes[imageSize])} alt="" />
				</a>
			</div>
		</div>
	) : null;
};
