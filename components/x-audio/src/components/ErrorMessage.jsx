import { h } from '@financial-times/x-engine';
import classNameMap from './classnames-helper';

export default () => {
	return (
		<div role="status" aria-live="assertive" className={classNameMap('audio-player__status')}>
			Cannot play episode, please try again
		</div>
	);
};
