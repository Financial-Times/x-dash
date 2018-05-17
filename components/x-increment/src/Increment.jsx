import h from '@financial-times/x-engine';
import { withInteraction } from '@financial-times/x-interaction';

const withIncrementActions = withInteraction({
	increment({count}) {
		return {
			count: count + 1
		};
	},
});

const BaseIncrement = ({state: {count}, actions: {increment}, rootProps}) => <div {...rootProps}>
	{count}
	<button onClick={increment}>Increment</button>
</div>;

const Increment = withIncrementActions(BaseIncrement)

export { Increment };
