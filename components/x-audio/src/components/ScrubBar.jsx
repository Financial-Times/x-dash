import { h } from '@financial-times/x-engine';
import classNameMap from './classnames-helper';
import Slider from './rc-slider';

export const ScrubBar = ({
	onChange,
	onStartScrub,
	onFinishScrub,
	playheadPosition,
	duration
}) => (
	<div
		className={classNameMap('audio-player__control-timeline')}>
		<Slider
			value={playheadPosition}
			onBeforeChange={onStartScrub}
			onChange={onChange}
			onAfterChange={onFinishScrub}
			trackStyle={{
				backgroundColor: 'red'
			}}
			railStyle={{
				backgroundColor: 'yellow',
				// '--buffered-width': `${playheadPosition + 10}%`
			}}
			max={parseInt(duration, 10)}
		/>
	</div>
)
