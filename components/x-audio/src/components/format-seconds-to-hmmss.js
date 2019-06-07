//format seconds to h:mm:ss or mm:ss(when less than an hour)
export default (targetSeconds) => {
	const roundedTargetSec =  Math.round(targetSeconds);
	let hours   = Math.floor(roundedTargetSec / 3600);
	let minutes = Math.floor((roundedTargetSec - (hours * 3600)) / 60);
	let seconds = roundedTargetSec - (hours * 3600) - (minutes * 60);

	const displayMin = minutes < 10 ? `0${minutes}` : minutes;
	const displaySec = seconds < 10 ? `0${seconds}` : seconds;

	if (hours > 0) {
		return `${hours}:${displayMin}:${displaySec}`;
	} else {
		return `${displayMin}:${displaySec}`;
	}
}
