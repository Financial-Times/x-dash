/**
 * Rules are collections of exclusive properties. They are declared in a ruleset
 * and in order of precedence. Each value returned by a rule will evaluated as a
 * boolean and the name of the matching rule returned.
 */
const rulesets = {
	media: [
		function video(props) {
			return props.showVideo && props.video && props.video.url;
		},
		function headshot(props) {
			return props.showHeadshot && props.headshot && props.indicators.isColumn;
		},
		function image(props) {
			return props.showImage && props.image && props.image.url;
		}
	],
	theme: [
		function theme(props) {
			return props.theme;
		},
		function highlight(props) {
			return props.indicators.isEditorsChoice;
		},
		function opinion(props) {
			return props.indicators.isOpinion;
		}
	]
};

/**
 * Rules
 * @param {String} rule
 * @param {Props} props
 * @returns {String|null}
 */
module.exports = (rule, props) => {
	if (rulesets.hasOwnProperty(rule)) {
		const index = rulesets[rule].findIndex((rule) => Boolean(rule(props)));
		return index !== -1 ? rulesets[rule][index].name : null;
	} else {
		throw Error(`No ruleset available named ${rule}`);
	}
};
