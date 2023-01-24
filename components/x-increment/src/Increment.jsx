import { h } from '@financial-times/x-engine'
import { withActions } from '@financial-times/x-interaction'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

const withIncrementActions = withActions(({ timeout }) => ({
	async increment({ amount = 1 } = {}) {
		await delay(timeout)

		return ({ count }) => ({
			count: count + amount
		})
	}
}))

const BaseIncrement = ({ count, customSlot, actions: { increment }, isLoading }) => (
	<div>
		<span>{count}</span>
		<button onClick={() => increment()} disabled={isLoading}>
			{customSlot}
			{isLoading ? 'Loading...' : 'Increment'}
		</button>
	</div>
)

const Increment = withIncrementActions(BaseIncrement)

export { Increment }
