// Returns an array of points for an X shaped polygon
export default ({ x, y, width, height, thickness }) => {
	const middleX = x + width / 2
	const middleY = y + height / 2

	return [
		[x, y + thickness],
		[middleX - thickness, middleY],
		[x, y + height - thickness],
		[x + thickness, y + height],
		[middleX, middleY + thickness],
		[x + width - thickness, y + height],
		[x + width, y + height - thickness],
		[middleX + thickness, middleY],
		[x + width, y + thickness],
		[x + width - thickness, y],
		[middleX, middleY - thickness],
		[x + thickness, y]
	]
}
