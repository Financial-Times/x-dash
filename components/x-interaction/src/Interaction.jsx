import h, {Component, render} from '@financial-times/x-engine';
import shortId from '@quarterto/short-id';

const mapValues = (obj, fn) => Object.keys(obj).reduce(
	(mapped, key) => Object.assign(mapped, {
		[key]: fn(obj[key], key, obj),
	}),
	{}
);

let data = [];
let registeredComponents = {};
let enableSerialisation = false;

const getComponentName = Component => Component.displayName || Component.name || 'Unknown';

const InteractionRender = ({
	actions,
	state,
	initialState,
	Component,
	id = `${getComponentName(Component)}-${shortId()}`,
	hydrating = false,
}) => {
	const props = state || initialState;

	if(enableSerialisation) {
		data.push({
			id,
			component: getComponentName(Component),
			props,
		});
	}

	const rendered = <Component
		state={props}
		actions={actions}
		isLoading={props[loading]}
	/>;

	return hydrating
		? rendered
		: <div data-x-dash-id={id}>{rendered}</div>;
};

const loading = Symbol('loading');

class InteractionClass extends Component {
	constructor(props, ...args) {
		super(props, ...args);

		this.state = props.initialState;
		this.state[loading] = false;

		this.actions = mapValues(
			props.actions,
			func => (...args) => {
				// mark as loading one microtask later. if the action is synchronous then
				// setting loading back to false will happen in the same microtask and no
				// additional render will be scheduled.
				Promise.resolve().then(() => {
					this.setState({[loading]: true});
				});

				Promise.resolve(
					func(props.initialState, ...args)
				).then(
					next => {
						this.setState(next);
						this.setState({[loading]: false});
					}
				);
			}
		);
	}

	render() {
		return <InteractionRender
			{...this.props}
			state={this.state}
			actions={this.actions}
		/>;
	}
}

// use the class version for interactive runtimes and the static version for static runtimes
export const Interaction = Component
	? InteractionClass
	: InteractionRender;

export const withInteraction = getActions => Component => {
	const enhanced = ({id, hydrating, ...initialState}) => {
		const actions = typeof getActions === 'function'
			? getActions(initialState)
			: getActions;

		return <Interaction {...{Component, initialState, actions, id, hydrating}} />;
	};

	const originalDisplayName = getComponentName(Component);
	enhanced.displayName = `withInteraction(${originalDisplayName})`;

	registeredComponents[originalDisplayName] = enhanced;

	return enhanced;
};

export const getInteractionSerialiser = () => {
	enableSerialisation = true;

	return () => {
		try {
			return `<script>window._xDashInteractionHydrationData = ${JSON.stringify(data)};</script>`;
		} finally {
			// clear data for subsequent renders
			data = [];
		}
	};
};

export const hydrate = () => {
	if(typeof window === 'undefined') {
		throw new Error('x-interaction hydrate should only be called on the client side');
	}

	if(!('_xDashInteractionHydrationData' in window)) {
		throw new Error('x-interaction hydrate was called without hydration data available. this could happen if you called hydrate before the hydration data was defined, or if you\'re not ouptutting the hydration data in your server-rendered markup.');
	}

	window._xDashInteractionHydrationData.forEach(({id, component, props}) => {
		const element = document.querySelector(`[data-x-dash-id="${id}"]`);
		const Component = registeredComponents[component];

		while(element.firstChild) {
			element.removeChild(element.firstChild);
		}

		render(
			<Component {...props} id={id} hydrating />,
			element
		);
	});
};
