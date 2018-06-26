import { h, Component } from '@financial-times/x-engine';
import { InteractionRender } from './InteractionRender';
import { loading } from './concerns/symbols';
import mapValues from './concerns/map-values';

export class InteractionClass extends Component {
	constructor(props, ...args) {
		super(props, ...args);

		this.state = {
			[loading]: false,
		};

		this.actions = mapValues(props.actions, (func) => (...args) => {
			// mark as loading one microtask later. if the action is synchronous then
			// setting loading back to false will happen in the same microtask and no
			// additional render will be scheduled.
			Promise.resolve().then(() => {
				this.setState({ [loading]: true });
			});

			Promise.resolve(func(...args)).then((next) => {
				if(typeof next === 'function') {
					this.setState(
						state => next(Object.assign(
							{},
							this.props.initialState,
							state,
						))
					);
				} else {
					this.setState(next);
				}

				this.setState({ [loading]: false });
			});
		});
	}

	render() {
		return <InteractionRender {...this.props} state={this.state} actions={this.actions} />;
	}
}
