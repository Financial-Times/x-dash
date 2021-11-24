# x-interaction

This module enables you to write x-dash components that respond to events and change their own data.

## Installation

This module is supported on Node 12 and is distributed on npm.

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

### Hydrating server-rendered markup

[Hydration](https://en.wikipedia.org/wiki/Hydration_(web_development)#:~:text=In%20web%20development%2C%20hydration%20or,handlers%20to%20the%20HTML%20elements.
): a technique in which client-side JavaScript converts a static HTML web page done by server-side rendering, into a dynamic web page by attaching event handlers to the HTML elements.

When you have an `x-interaction` component rendered by the server, and you want to attach the client-side version of the component to handle the actions, rather than rendering the component manually (which might become unwieldy, especially if you have many components & instances on the page), you can have `x-interaction` manage it for you.

There are three parts to this: registering the component, serialising and hydrating.

#### Registering the component

To register the component you'll need to call `x-interaction`'s `registerComponent` function, providing the component and its name as arguments.

```jsx
import {withActions, registerComponent} from '@financial-times/x-interaction';

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

registerComponent(Greeting, 'Greeting')
```

#### Serialising

To ensure components are rendered with the same initial data on the client side, and keep track of all the instances that are rendered and their identifiers, `x-interaction` exports a `Serialiser` class. You *must* create a new instance at the start every HTTP request that responds with any number of `x-interaction` components.

This instance should be passed to every `x-interaction` component you render, as a property called `serialiser`. This will add the component's properties to the data to be sent to the client (the "hydration data").

Finally, after every `x-interaction` component is rendered, you should output the hydration data. `x-interaction` exports a `HydrationData` component, which takes a serialiser as a property and renders a `<script>` tag containing its hydration data, assigned to a global variable that can be picked up by the `x-interaction` client-side runtime. A serialiser cannot be used again after its data has been output by a `HydrationData` component.

Here's a full example of using `Serialiser` and `HydrationData` using the `Greeting` component we registered in the previous step.

```js
import express from 'express';
import { Greeting } from './Greeting'
import { Serialiser, HydrationData } from '@financial-times/x-interaction';

const app = express();

app.get('/', (req, res) => {
	const serialiser = new Serialiser();

	res.send(`
		${Greeting({ serialiser })}
		${HydrationData({ serialiser })}
	`);
});
```

#### Hydrating

When rendered on the server side, components output an extra wrapper element, with a `data-x-dash-id` attribute. This is used by the `x-interaction` runtime to identify the component in serialisation data, and attach the correct instance to it on the client side. You can pass this in as the `id` property when rendering the component; otherwise, an identifier will be randomly generated.

`x-interaction` exports a function `hydrate`. This should be called on the client side. It inspects the global serialisation data on the page, uses the identifiers to find the wrapper elements, and calls `render` from your chosen `x-engine` client-side runtime to render component instances into the wrappers.

Before calling `hydrate`, you must first `import` any `x-interaction` components that will be rendered on the page. The components register themselves with the `x-interaction` runtime when imported; you don't need to do anything with the imported component. This will also ensure the component is included in your client-side bundle. Similarly if the component that you're server side rendering is just a component that you've created through `withActions`, make sure you import that component along with its registerComponent invokation.

Because `hydrate` expects the wrappers to be present in the DOM when called, it should be called after [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded). Depending on your page structure, it might be appropriate to hydrate the component when it's scrolled into view.

A full example of client-side code for hydrating components:

```js
import { hydrate } from '@financial-times/x-interaction';
import '@financial-times/x-increment'; // bundle x-increment and register it with x-interaction

document.addEventListener('DOMContentLoaded', hydrate);
```

### Triggering actions externally

#### Client-side rendering

When using a client-side runtime, such as React, to render an `x-interaction` component, you can pass a property `actionsRef` to the component. This should be a function which will be called with a reference to the component instance's actions when the component is mounted, and `null` when it's unmounted. This is similar to React's [`ref` property](https://reactjs.org/docs/refs-and-the-dom.html) for obtaining references to DOM elements.

You can call these action references from anywhere in your app, and they'll be scoped to the component instance you obtained the reference from. This allows external events, such as from components not in x-dash, or third-party components you don't control, to trigger state changes in your component. You can also use this functionality to trigger initialisation logic on a component, for example when it is scrolled into view.

Here's an example of triggering an `x-increment` component's `increment` action from a button outside the component:

```jsx
import { h, Component } from '@financial-times/x-engine';
import { Increment } from '@financial-times/x-increment';

class ExternalActionDemo extends Component {
	render() {
		return <div>
			<button onClick={() => this.incrementActions && this.incrementActions.increment()}>
				Increment externally
			</button>

			<Increment count={1} actionsRef={actions => this.incrementActions = actions} />
		</div>;
	}
}
```

#### Server-side rendering

When your component has been rendered by [`x-interaction` client-side hydration](#hydrating-server-rendered-markup), you don't have access to the component instance, so you can't use `actionsRef`. In this scenario, `x-interaction` supports triggering actions via a [DOM Custom Event](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).

The event is called `x-interaction.trigger-action`, and should be dispatched on the wrapper element of the component instance you want to trigger an action on. The wrapper has the attribute `data-x-dash-id`, which you can use in a selector, but because the randomly-generated default `id` is unpredictable, you should render the component with a unique, static `id`. On the server side:

```js
res.send(`
	${Increment({count: 1, id: 'x-interaction-1'})}
	${getInteractionData()}
`);
```

And the client side:

```js
const wrapper = document.querySelector('[data-x-dash-id="x-interaction-1"]');
```

In the `detail` parameter of the event, include a property `action`, which is the name of the action to trigger. You can also specify a property `args`, which should be an array that will be passed to the action as its arguments:

```js
wrapper.dispatchEvent(
	new CustomEvent(
		'x-interaction.trigger-action',
		{ detail: { action: 'increment', args: [ { amount: 5 } ] } }
	)
);
```
