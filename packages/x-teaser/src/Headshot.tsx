import { SFC } from 'react';
import { TeaserProps } from './types';
import { ImageSizes } from './concerns/constants';
import imageService from './concerns/image-service';

// JSX factory function
declare const h: any;

const Headshot: SFC<TeaserProps> = ({ headshot }) =>
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
