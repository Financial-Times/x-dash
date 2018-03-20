import { TeaserProps } from './types/Props';
import { h, Component } from '@financial-times/x-engine';
import { ImageSizes } from './concerns/constants';
import imageService from './concerns/image-service';

const Headshot: Component<TeaserProps> = ({ headshot }) =>
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

export default Headshot;
