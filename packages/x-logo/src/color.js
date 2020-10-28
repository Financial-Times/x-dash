import { hsluvToHex } from 'hsluv'

export default (shift, random) => {
	// Start a hue rotation (0-360 degrees) from a random position
	const hue = random() * 360

	// Make a starting HSL color
	const hues = [hue, hue + shift, hue - shift, hue + shift * 2]

	// Return a function to generate a color for a given coordinate
	return ([x, y]) => {
		const [tl, tr, bl, br] = hues
		const th = tl + (tr - tl) * (x / 100)
		const bh = bl + (br - bl) * (x / 100)
		const hue = th + (bh - th) * (y / 100)

		// <http://www.hsluv.org/>
		return hsluvToHex([hue, 85 + 10 * random(), 45 + 10 * random()])
	}
}
