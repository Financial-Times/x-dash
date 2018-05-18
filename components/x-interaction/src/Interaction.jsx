import h, {Component, render} from '@financial-times/x-engine';
import shortId from '@quarterto/short-id';
import paramCase from 'param-case';

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
	id = `${paramCase(getComponentName(Component))}-${shortId()}`,
	hydrating = false,
}) => {
	if(enableSerialisation) {
		data.push({
			id,
			component: getComponentName(Component),
			props: state || initialState,
		});
	}

	const rendered = <Component
		state={state || initialState}
		actions={actions}
	/>;

	return hydrating
		? rendered
		: <div data-x-dash-id={id}>{rendered}</div>;
};

class InteractionClass extends Component {
	constructor(props, ...args) {
		super(props, ...args);

		this.state = props.initialState;
		this.actions = mapValues(
			props.actions,
			func => (...args) => {
				this.setState(
					state => func(state, ...args)
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

export const withInteraction = actions => Component => {
	const enhanced = ({id, hydrating, ...initialState}) => <Interaction {...{Component, initialState, actions, id, hydrating}} />;

	const originalDisplayName = getComponentName(Component);
	enhanced.displayName = `withInteraction(${originalDisplayName})`;

	registeredComponents[originalDisplayName] = enhanced;

	return enhanced;
};

export const getInteractionSerialiser = () => {
	enableSerialisation = true;

	return () => {
		try {
			return `<script>
				_xDashInteractionHydrate(${JSON.stringify(data)})
			</script>`;
		} finally {
			// clear data for subsequent renders
			data = [];
		}
	};
};

export const registerComponents = (...components) => components.forEach(
	component => registeredComponents[component.originalDisplayName] = component
);

global._xDashInteractionHydrate = hydrationData => {
	hydrationData.forEach(({id, component, props}) => {
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
