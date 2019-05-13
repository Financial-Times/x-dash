import {
	THEME_HIGHLIGHT,
	THEME_EXTRA,
	THEME_DEFAULT,
	THEME_OPINION,
} from '../../../concerns/constants';

export default ({ indicators: { isOpinion, isEditorsChoice } = {}, theme, parentTheme }) => {
	let resolvedTheme;

	// Order matters here
	if (theme === 'extra-article') {
		resolvedTheme = THEME_EXTRA;
	} else if (theme === 'highlight') {
		resolvedTheme = THEME_HIGHLIGHT;
	} else if (isOpinion) {
		resolvedTheme = THEME_OPINION;
	} else if (isEditorsChoice) {
		resolvedTheme = THEME_HIGHLIGHT;
	} else if (parentTheme === 'extra-article') {
		resolvedTheme = THEME_EXTRA;
	} else {
		resolvedTheme = THEME_DEFAULT;
	}

	return resolvedTheme;
};
