import h from '@financial-times/x-engine';
import { Interaction } from '@financial-times/x-interaction';

const actions = {
	increment({count}) {
		return {
			count: count + 1
		};
	},
};

const Increment = props => <Interaction initialProps={props} actions={actions} render={
	({count}, {increment}, rootProps) =>
		<div {...rootProps}>
			{count}
			<button onClick={increment}>Increment</button>
		</div>
} />;

export { Increment };
