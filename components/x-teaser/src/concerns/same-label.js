export default function sameLabel(context = {}, label) {
	return Boolean(label && label === context?.parentLabel)
}
