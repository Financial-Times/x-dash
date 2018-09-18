import { h, Component } from '@financial-times/x-engine';
import { InteractionRender } from './InteractionRender';
import mapValues from './concerns/map-values';

export class InteractionClass extends Component {
	constructor(props, ...args) {
		super(props, ...args);

		this.state = {
			state: {},
			inFlight: 0,
		};

		this.actions = mapValues(props.actions, (func) => (...args) => {
			// mark as loading one microtask later. if the action is synchronous then
			// setting loading back to false will happen in the same microtask and no
			// additional render will be scheduled.
			Promise.resolve().then(() => {
				this.setState(({ inFlight }) => ({ inFlight: inFlight + 1 }));
			});

			return Promise.resolve(func(...args)).then((next) => {
				const updater = typeof next === 'function'
					? ({state}) => ({state: next(Object.assign(
						{},
						props.initialState,
						state
					))})
					: {state: next};

				return new Promise(resolve =>
					this.setState(updater, () => (
						this.setState(({ inFlight }) => ({ inFlight: inFlight - 1 }), resolve)
					))
				);
			});
		});
	}

	componentDidMount() {
		if(this.props.actionsRef) {
			this.props.actionsRef(this.actions);
		}
	}

	componentWillUnount() {
		if(this.props.actionsRef) {
			this.props.actionsRef(null);
		}
	}

	render() {
		return <InteractionRender {...this.props} {...this.state} actions={this.actions} />;
	}
}
