/* eslint-disable react/prop-types */
import { h } from '@financial-times/x-engine';

const Track = (props) => {
	const { className, included, vertical, offset, length, style } = props;

	const positonStyle = vertical ? {
		bottom: `${offset}%`,
		height: `${length}%`,
	} : {
		left: `${offset}%`,
		width: `${length}%`,
	};

	const elStyle = {
		...style,
		...positonStyle,
	};
	return included ? <div className={className} style={elStyle} /> : null;
};

export default Track;
