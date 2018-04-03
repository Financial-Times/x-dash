const h = require('@financial-times/x-engine');
const { ImageSizes } = require('./concerns/constants');
const imageService = require('./concerns/image-service');

const TINT = '054593,d6d5d3';

module.exports = ({ headshot, headshotTint }) => {
	const options = [`tint=${TINT || headshotTint}`, 'dpr=2'].join('&');

	return headshot ? (
		<img
			className="o-teaser__headshot"
			width={ImageSizes.Headshot}
			height={ImageSizes.Headshot}
			alt=""
			aria-hidden="true"
			src={imageService(headshot.url, ImageSizes.Headshot, options)}
		/>
	) : null;
};
