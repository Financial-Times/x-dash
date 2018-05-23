import h from '@financial-times/x-engine';
import { withInteraction } from '@financial-times/x-interaction';

const delay = ms => new Promise(r => setTimeout(r, ms));

const withIncrementActions = withInteraction({
	increment({timeout}) {
		return delay(timeout).then(() => ({
			count: count => count + 1
		}));
	},
});

const BaseIncrement = ({state: {count}, actions: {increment}, isLoading}) => <div>
	{count}
	<button onClick={increment} disabled={isLoading}>
		{isLoading
			? 'Loading...'
			: 'Increment'
		}
	</button>
</div>;

const Increment = withIncrementActions(BaseIncrement)

export { Increment };
