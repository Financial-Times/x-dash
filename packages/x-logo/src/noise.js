import Poisson from 'poisson-disk-sampling'
import pointInPolygon from 'point-in-polygon'

export default (density, canvas, random) => {
	// Poisson noise produces randomly distributed points that may not be too close to each other
	// <https://en.wikipedia.org/wiki/Shot_noise>
	const noise = new Poisson([150, 150], 100 / density, 100, 30, random)

	// Remove any points that do not fit within the given canvas
	return noise
		.fill()
		.map(([x, y]) => [x - 25, y - 25])
		.filter((point) => pointInPolygon(point, canvas))
}
