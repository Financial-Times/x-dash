// Stringifies a list points
// <https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/points>
export const pointsToString = (points) => points.map((point) => point.map((x) => Math.round(x)).join()).join()
