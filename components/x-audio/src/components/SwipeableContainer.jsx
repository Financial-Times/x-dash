import { h, Component } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';
import Hammer from 'hammerjs';
import handleSwipeDown from '../components/handle-swipe-down';

export class SwipeableContainer extends Component {
	constructor(props) {
		super(props);
		this.hammer = undefined;
		this.setExpandedPlayerRef = element => {
			this.expandedPlayerRef = element;
		};
	}

	componentDidMount() {
		if (this.expandedPlayerRef) {
			this.listenForSwipeDown(this.expandedPlayerRef);
		}
	}

	componentWillUnmount() {
		if (this.hammer) {
			this.hammer.destroy();
		}
	}

	componentDidUpdate() {
		if (this.expandedPlayerRef && this.expandedPlayerRef !== this.expandedPlayerListensSwipe) {
			this.listenForSwipeDown(this.expandedPlayerRef);
		}
	}

	listenForSwipeDown (expandedPlayerRef) {
		this.hammer = new Hammer.Manager(expandedPlayerRef);
		this.hammer.add(new Hammer.Pan({
			direction: Hammer.DIRECTION_DOWN,
			threshold: 0
		}) );

		this.hammer.on('pan', (ev) => {
			if (this.props.swipeEnabled) {
				handleSwipeDown(ev, this.props.onSwipeEnd, expandedPlayerRef);
			}
		});

		this.expandedPlayerListensSwipe = expandedPlayerRef;
	}

	render() {
		return (
			<div ref={this.setExpandedPlayerRef} className={this.props.className}>
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
