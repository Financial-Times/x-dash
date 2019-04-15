import { actions } from './player-logic';

export default function connectPlayer(Player, connect) {
	const mapStateToProps = s => s;
	const mapDispatchToProps = {
		onPlay: actions.requestPlay,
		onPause: actions.requestPause
	};

	return connect(mapStateToProps, mapDispatchToProps)(Player);
}
