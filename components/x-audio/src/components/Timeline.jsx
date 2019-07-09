import { h, Component } from '@financial-times/x-engine';
import classNameMap from './classnames-helper';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import { ScrubBar } from './ScrubBar'
import formatTime from './format-seconds-to-hmmss';
import { TimeRemaining } from './TimeRemaining';

export class Timeline extends Component {
	constructor(props) {
		super(props);
		this.updateCurrentTime = this.updateCurrentTime.bind(this);
		this.startScrub = this.startScrub.bind(this);
		this.finishScrub = this.finishScrub.bind(this);
		this.state = {
			currentTime: 0,
			scrubbing: false
		}
	}

	componentDidMount() {
		this.updateCurrentTime(this.props.currentTime);
	}

	componentDidUpdate (prevProps) {
		if (this.state.scrubbing && prevProps.seeking && !this.props.seeking) {
			this.setState({ scrubbing: false });
			this.props.onScrub({ isScrubbing: false });
		}
	}

	updateCurrentTime(currentTime) {
		this.setState({ currentTime })
	}

	startScrub() {
		this.setState({ scrubbing: true })
		this.props.onScrub({ isScrubbing: true });
	}

	finishScrub() {
		this.props.updateCurrentTime({ currentTime: this.state.currentTime })
	}

	render() {
		const { duration, loading, error } = this.props;
		const currentTime = this.state.scrubbing ? this.state.currentTime : this.props.currentTime;
		return (
			<div className={classNameMap('audio-player__timeline')}>
				<ScrubBar
					onChange={this.updateCurrentTime}
					onStartScrub={this.startScrub}
					onFinishScrub={this.finishScrub}
					playheadPosition={currentTime}
					duration={duration}
				/>
				{ error && <ErrorMessage />}
				{!error && loading && <Loading expanded />}
				{!error && !loading && <div className={classNameMap('audio-player__info__current-time')}>{formatTime(currentTime)}</div>}
				<TimeRemaining currentTime={currentTime} duration={duration} expanded />
			</div>
		)
	}
}
