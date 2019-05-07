//format seconds to hh:mm:ss or mm:ss(when less than an hour)
export default (targetSeconds) => {
  let hours   = Math.floor(targetSeconds / 3600);
  let minutes = Math.floor((targetSeconds - (hours * 3600)) / 60);
  let seconds = targetSeconds - (hours * 3600) - (minutes * 60);

  const displayHour = hours < 10 ? `0${hours}` : hours;
  const displayMin = minutes < 10 ? `0${minutes}` : minutes;
  const displaySec = seconds < 10 ? `0${seconds}` : seconds;

  if (hours > 0) {
    return `${displayHour}:${displayMin}:${displaySec}`;
  } else {
    return `${displayMin}:${displaySec}`;
  }
}
