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

		this.createActions(props);
	}

	createActions(props) {
		this.actions = mapValues(props.actions, (func) => async (...args) => {
			// mark as loading one microtask later. if the action is synchronous then
			// setting loading back to false will happen in the same microtask and no
			// additional render will be scheduled.
			Promise.resolve().then(() => {
				this.setState(({ inFlight }) => ({ inFlight: inFlight + 1 }));
			});

			const stateUpdate = await Promise.resolve(func(...args));

			const nextState = typeof stateUpdate === 'function'
				? Object.assign(
					this.state.state,
					await Promise.resolve(stateUpdate(Object.assign(
						{},
						props.initialState,
						this.state.state
					)))
				)
				: Object.assign(this.state.state, stateUpdate);

			return new Promise(resolve =>
				this.setState({state: nextState}, () => (
					this.setState(({ inFlight }) => ({ inFlight: inFlight - 1 }), resolve)
				))
			);
		});
	}

	componentWillReceiveProps(props) {
		this.createActions(props);
	}

	componentDidMount() {
		if(this.props.actionsRef) {
			this.props.actionsRef(this.actions);
		}
	}

	componentWillUnmount() {
		if(this.props.actionsRef) {
			this.props.actionsRef(null);
		}
	}

	render() {
		return <InteractionRender {...this.props} {...this.state} actions={this.actions} />;
	}
}
