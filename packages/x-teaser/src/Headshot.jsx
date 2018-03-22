const h = require('@financial-times/x-engine');
const { ImageSizes } = require('./concerns/constants');
const imageService = require('./concerns/image-service');

module.exports = ({ headshot }) =>
	headshot ? (
		<img
			className="o-teaser__headshot"
			width={ImageSizes.Headshot}
			height={ImageSizes.Headshot}
			alt=""
			aria-hidden="true"
			src={imageService(headshot, ImageSizes.Headshot)}
		/>
	) : null;
