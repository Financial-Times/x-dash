import { h, Component } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';

export class Marquee extends Component {
	constructor(props) {
		super(props);
		this.state = {
			positionOffset: 0,
			overflowWidth: 0
		};
	}

	componentDidMount() {
		this.measureText();
		this.start();
	}

	componentDidUpdate() {
		this.measureText();
		this.start();
	}

	componentWillUnmount() {
		cancelAnimationFrame(this.marqueeRaf);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.text.length != nextProps.text.length) {
			cancelAnimationFrame(this.marqueeRaf);
			this.setState({ positionOffset: 0 });
		}
	}

	render() {
		const { text, className } = this.props;
		const style = {
			display: 'inline-block',
			transform: `translate3d(-${Math.floor(this.state.positionOffset)}px, 0, 0)`,
			whiteSpace: 'nowrap',
			willChange: 'transform'
		};

		return (
			<div ref={ref => this.containerElement = ref} className={className} style={{ overflow: 'hidden' }}>
				<span ref={ref => this.textElement = ref} style={style} title={text}>
					{text}
				</span>
			</div>
		);
	}

	measureText() {
		const container = this.containerElement;
		const text = this.textElement;

		if (container && text) {
			const containerWidth = container.offsetWidth;
			const textWidth = text.offsetWidth;
			const overflowWidth = textWidth - containerWidth;

			if (overflowWidth !== this.state.overflowWidth) {
				this.setState({ overflowWidth });
			}
		}
	}

	start() {
		const needsToAnimate = this.state.overflowWidth > 0;

		if (!needsToAnimate) return;

		const draw = () => {
			const nextPositionOffset = this.state.positionOffset + 0.5;
			const isAtEnd = nextPositionOffset > this.state.overflowWidth;

			if (isAtEnd) {
				this.pauseForLeadOut()
					.then(() => this.setState({ positionOffset: 0 }))
					.then(() => this.pauseForLeadIn())
					.then(() => this.requestAnimationFrame(draw));
			} else {
				this.setState({ positionOffset: nextPositionOffset });
				this.requestAnimationFrame(draw);
			}
		};

		const waitForLeadIn = this.state.positionOffset === 0;

		if (waitForLeadIn) {
			this.pauseForLeadIn().then(() => this.requestAnimationFrame(draw));
		} else {
			this.requestAnimationFrame(draw);
		}
	}

	pauseForLeadIn() {
		const { leadInDuration } = this.props;

		return new Promise(resolve => {
			setTimeout(resolve, leadInDuration);
		});
	}

	pauseForLeadOut() {
		const { leadOutDuration } = this.props;
		return new Promise(resolve => {
			setTimeout(resolve, leadOutDuration);
		});
	}

	requestAnimationFrame(fn) {
		cancelAnimationFrame(this.marqueeRaf);
		this.marqueeRaf = requestAnimationFrame(fn);
	}
}

Marquee.defaultProps = {
	text: '',
	leadInDuration: 3000,
	leadOutDuration: 3000
};

Marquee.propTypes = {
	text: PropTypes.string,
	leadInDuration: PropTypes.number,
	leadOutDuration: PropTypes.number,
	className: PropTypes.string
};
