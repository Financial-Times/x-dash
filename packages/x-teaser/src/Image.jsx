const h = require('@financial-times/x-engine');
const { ImageSizes } = require('./concerns/constants');
const imageService = require('./concerns/image-service');

module.exports = ({ url, image, imageSize }) => {
	return image ? (
		<div className="o-teaser__image-container js-teaser-image-container">
			<div className="o-teaser__image-placeholder" style={{ paddingBottom: `${image.aspectRatio * 100}%` }}>
				<a href={url} data-trackable="image-link" tab-index="-1" aria-hidden="true">
					<img className="o-teaser__image" src={imageService(image.url, ImageSizes[imageSize])} alt="" />
				</a>
			</div>
		</div>
	) : null;
};
