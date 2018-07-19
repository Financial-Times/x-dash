import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';

const delay = ms => new Promise(r => setTimeout(r, ms));

const withIncrementActions = withActions(({timeout}) => ({
	async increment() {
		await delay(timeout);

		return ({count}) => ({
			count: count + 1
		});
	},
}));

const BaseIncrement = ({count, actions: {increment}, isLoading}) => <div>
	{count}
	<button onClick={increment} disabled={isLoading}>
		{isLoading
			? 'Loading...'
			: 'Increment'
		}
	</button>
</div>;

const Increment = withIncrementActions(BaseIncrement);

export { Increment };
