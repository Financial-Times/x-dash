const { withActions, registerComponent } = require('@financial-times/x-interaction')
const { h } = require('@financial-times/x-engine')

export const greetingActions = withActions({
	actionOne() {
		return { greeting: 'world' }
	}
})

export const GreetingComponent = greetingActions(({ greeting, actions }) => {
	return (
		<div className="greeting-text">
			hello {greeting}
			<button className="greeting-button" onClick={actions.actionOne}>
				click to add to hello
			</button>
		</div>
	)
})

registerComponent(GreetingComponent, 'GreetingComponent')
