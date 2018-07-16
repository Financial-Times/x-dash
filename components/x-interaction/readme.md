# x-interaction

`x-interaction` allows you to write x-dash components that respond to events and change their own data.

## Installation

This module is compatible with Node 6+ and is distributed on npm.

```bash
npm install --save @financial-times/x-interaction
```

`x-interaction` is intended to be used internally in `x-dash` components, instead of as a dependency of your application.

## Writing interactive components

The main interface of `x-interaction` is the function `withActions`, which can be used to wrap ordinary (i.e. _stateless_) x-dash components.

### Actions

An action is a function that's passed to a component, intended to be used in an event handler. Each action returns a _state update_, which can be either an object to be merged into the properties of the component, or a function that's called with the _current_ properties and should return an object to be merged in:

```jsx
import {withActions} from '@financial-times/x-interaction';

const greetingActions = withActions({
	actionOne() {
		return {greeting: "world"};
	},

	actionTwo() {
		return ({greeting}) => ({
			greeting: greeting.toUpperCase(),
		});
	},
});

const Greeting = greetingActions(({greeting, actions}) => <div>
	hello {greeting}
	<button onClick={actions.actionOne}>"world"</button>
	<button onClick={actions.actionTwo}>uppercase</button>
</div>);
```

Clicking the first button will set the greeting to `"world"`, and clicking the second button sets the greeting to whatever it was previously, in uppercase. Returning a function from your action is the only way to have the updated state depend on the previous state.

### Asynchronous actions

If an action returns a Promise (e.g. if it's an `async` function), `x-interaction` will wait for the promise and use the value it resolves to as the state update, and set the property `isLoading` to `true` while the promise is in-flight:

```jsx
import {withActions} from '@financial-times/x-interaction';

const greetingActions = withActions({
	async updateGreeting() {
		const repsonse = await fetch('/greeting');
		const {greeting} = await response.json();
		return {greeting};
	},
});

const Greeting = greetingActions(({greeting, actions, isLoading}) => <div>
	hello {greeting}
	<button onClick={actions.updateGreeting} disabled={isLoading}>
		{isLoading ? 'loading greeting...' : 'update greeting'}
	</button>
</div>);
```

### Properties in actions

If you need access to the properties of the component _before_ returning the state update, for example if your component needs to send parameters to an endpoint, you can pass a function to `withActions` in place of the actions object. Your function will be called with the _initial_ properties of the component, and should return an actions object:


```jsx
import {withActions} from '@financial-times/x-interaction';

const greetingActions = withActions(({lang}) => ({
	async updateGreeting() {
		const repsonse = await fetch(`/greeting?lang=${lang}`);
		const {greeting} = await response.json();
		return {greeting};
	},
}));

const Greeting = greetingActions(({greeting, actions, isLoading}) => <div>
	hello {greeting}
	<button onClick={actions.updateGreeting} disabled={isLoading}>
		{isLoading ? 'loading greeting...' : 'update greeting'}
	</button>
</div>);
```

_These properties will not change when the state updates_, so they should not be used to have state that depends on previous state; use a state update function for this.

### Wrapped and unwrapped components

Because the actions are separate from the components, the base component can usually be used as a static component without the wrapper. This is useful in case a consumer of the component needs to provide its own actions. It's recommended to export the wrapped component, the base component, and the actions as separate named exports. The naming convention for these is `ComponentName`, `BaseComponentName` and `componentNameActions`, for example:

```js
import {withActions} from '@financial-times/x-interaction';

export const greetingActions = withActions({});

export const BaseGreeting = ({greeting, actions}) => <div>
	hello {greeting}
</div>;

export const Greeting = greetingActions(BaseGreeting);
```
