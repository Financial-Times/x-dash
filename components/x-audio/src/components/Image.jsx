import { h } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';
import classNameMap from './classnames-helper';

function mapResolutions (resolutions = []) {
	const result = resolutions.map(resolution => {
		if (!resolution.url || !resolution.resolution) {
			return;
		}
		return `${resolution.url} ${resolution.resolution}`;
	});

	return result.join(',');
}

export const Image = ({
	imageDataSet
}) => (
	<div className={classNameMap('audio-player__info__image')}>
		<img
			src={imageDataSet.url}
			srcSet={mapResolutions(imageDataSet.resolutions)}
			alt=''
		/>
	</div>
);

Image.propTypes = {
	imageDataSet: PropTypes.shape({
		url: PropTypes.string.isRequired,
		resolutions: PropTypes.array
	})
}
