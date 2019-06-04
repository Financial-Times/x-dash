import { h } from '@financial-times/x-engine';
import classNameMap from './classnames-helper';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
export const ScrubBar = ({
	onChange,
	value
}) => (
	<div
		className={classNameMap('audio-player__control-timeline')}>
	<Slider
		value={value}
		onChange={onChange}
		onAfterChange={() => console.log(value)}
		trackStyle={{
			backgroundColor: 'red'
		}}
		railStyle={{
			backgroundColor: 'yellow',
			'--buffered-width': `${value + 10}%`
		}}
	/>
			{/* <input
				style={{width: '100%'}}
				type='range'
				value={value}
				onChange={e => onChange(e.target.value)}
				onBlur={console.log('MOUSEUP')}
			/> */}
	</div>
)