import h, {Component} from '@financial-times/x-engine';

const mapValues = (obj, fn) => Object.keys(obj).reduce(
	(mapped, key) => Object.assign(mapped, {
		[key]: fn(obj[key], key, obj),
	}),
	{}
);

let id = 0;

const InteractionRender = ({actions, state, initialProps, render}) => render(
	state || initialProps,
	actions,
	{
		'data-x-dash-id': id++,
		'data-x-dash-props': JSON.stringify(initialProps),
	}
);

class InteractionClass extends Component {
	constructor(props, ...args) {
		super(props, ...args);

		this.state = props.initialProps;
		this.actions = mapValues(
			props.actions,
			func => (...args) => this.setState(
				state => func(state, ...args)
			)
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
const Interaction = Component
	? InteractionClass
	: InteractionRender;

export { Interaction };
