export default function sameLabel(context = {}, label) {
	return label && context && context.parentLabel && label === context.parentLabel
}
