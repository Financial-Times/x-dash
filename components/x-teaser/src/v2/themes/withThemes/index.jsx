import { h } from '@financial-times/x-engine';
import c from 'classnames';

// Adds theming support to the WrappedComponent
// Customizable via a `theme` prop (which essentially adds appropriate `className`)
export const withThemes = (WrappedComponent, styles) => {
	return ({ theme = 'default', className, ...props }) => (
		<WrappedComponent className={c(className, styles[`theme-${theme}`])} {...props} />
	);
}

