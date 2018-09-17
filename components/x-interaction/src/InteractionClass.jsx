import { h, Component } from '@financial-times/x-engine';
import { InteractionRender } from './InteractionRender';
import { loading } from './concerns/symbols';
import mapValues from './concerns/map-values';

export class InteractionClass extends Component {
	constructor(props, ...args) {
		super(props, ...args);

		this.state = {
			state: props.initialState,
			[loading]: false,
		};

		this.actions = mapValues(props.actions, (func) => (...args) => {
			// mark as loading one microtask later. if the action is synchronous then
			// setting loading back to false will happen in the same microtask and no
			// additional render will be scheduled.
			Promise.resolve().then(() => {
				this.setState({ [loading]: true });
			});

			return Promise.resolve(func(...args)).then((next) => {
				const updater = typeof next === 'function'
					? ({state}) => ({state: next(state)})
					: {state: next};

				return new Promise(resolve =>
					this.setState(updater, () => (
						this.setState({ [loading]: false }, resolve)
					))
				);
			});
		});
	}

	render() {
		return <InteractionRender {...this.props} {...this.state} actions={this.actions} />;
	}
}
