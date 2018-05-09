import h, {Component} from '@financial-times/x-engine';
import mapValues from 'lodash-es/mapValues';

class Interaction extends Component {
	constructor(props, ...args) {
		super(props, ...args);
		this.state = props.initialProps;
		this.actions = mapValues(
			props.actions,
			func => (...args) => this.setState(state => func(state, ...args))
		);
	}

	render() {
		const {actions, render} = this.props;
		return render(this.state, this.actions);
	}
}

export { Interaction };
