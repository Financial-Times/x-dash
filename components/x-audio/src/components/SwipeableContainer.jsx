import { h, Component } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';
import Hammer from 'hammerjs';
import handleSwipeDown from '../components/handle-swipe-down';

export class SwipeableContainer extends Component {
	constructor(props) {
		super(props);
		this.hammer = undefined;
		this.setSwipeableElementRef = element => {
			this.swipeableElementRef = element;
		};
	}

	componentDidMount() {
		if (this.swipeableElementRef) {
			this.listenForSwipeDown(this.swipeableElementRef);
		}
	}

	componentWillUnmount() {
		if (this.hammer) {
			this.hammer.destroy();
		}
	}

	componentDidUpdate() {
		if (this.swipeableElementRef) {
			this.listenForSwipeDown(this.swipeableElementRef);
		}
	}

	listenForSwipeDown (swipeableElementRef) {

		if (swipeableElementRef === this.currentSwipeableElementRef) {
			// don't set hammer up for the same element more than once
			return;
		}

		this.hammer = new Hammer.Manager(swipeableElementRef);
		this.hammer.add(new Hammer.Pan({
			direction: Hammer.DIRECTION_DOWN,
			threshold: 0
		}) );

		this.hammer.on('pan', (ev) => {
			if (this.props.swipeEnabled) {
				handleSwipeDown(ev, this.props.onSwipeEnd, swipeableElementRef);
			}
		});

		this.currentSwipeableElementRef = swipeableElementRef;
	}

	render() {
		return (
			<div ref={this.setSwipeableElementRef} className={this.props.className}>
				{this.props.children}
			</div>
		)
	}
}
SwipeableContainer.defaultProps = {
	onSwipeEnd: () => {},
	swipeEnabled: true
}

SwipeableContainer.propTypes = {
	onSwipeEnd: PropTypes.func,
	swipeEnabled: PropTypes.bool
}
