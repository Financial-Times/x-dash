import { h } from '@financial-times/x-engine';
import classNameMap from './classnames-helper';

export default ({expanded}) => {
	const foregroundColor = (expanded) ? 'dark' : 'light';
	return (
		<div role="status" aria-live="polite" className={classNameMap('audio-player__status',  `audio-player__status--${expanded ? 'expanded' : 'minimised'}`)}>
			<div className={`o-loading o-loading--${foregroundColor} o-loading--mini ${classNameMap('audio-player__loader')}`}></div>
			Loading
		</div>
	);
};
