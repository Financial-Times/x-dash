# Styling components


## Origami components

Components which provide markup and logic for existing Origami components do not need to provide any styles and should instead provide instructions for [installing the Origami package] in their readme. These components should expect the required class names to be made available globally by the consuming application.

To include Origami styles in a component's Storybook demos use the `dependencies` option in your component's [Storybook configuration].

[installing the Origami package]: https://origami.ft.com/docs/developer-guide/modules/building-modules/#4-set-up-a-package-manifest-to-load-origami-modules
[Storybook configuration]: /docs/components/stories


## Component-specific styles

For components which are not a part of Origami, x-dash provides the tools to author and bundle styles alongside the JavaScript package. Styles can be written using [Sass] and it is strongly encouraged to follow the [Origami SCSS syntax standard] which in short means:

- _Always_ import Origami dependencies in silent mode and integrate via mixins
- Never modify selectors from another component's namespace
- Do not use ID selectors, `:not()`, and avoid `%extends`
- Use ARIA role attribute selectors where appropriate

CSS files should be stored in `src` directory, adjacent to the component that will use them and follow the same naming convention. For example, if you have a button component then you may have two files; `Button.jsx` and `Button.css`.

If your component's styles might be useful outside of the FT.com ecosystem, you should speak to the [Origami team] about creating an Origami component.

[Sass]: https://sass-lang.com/
[Origami SCSS syntax standard]: https://origami.ft.com/docs/syntax/scss/
[Origami team]: http://origami.ft.com/


### CSS Modules

A [CSS Module] is a self-contained CSS file that can be used with ECMAScript `import`. When a component is built, its CSS Modules are bundled into a single `.css` file, and their class names are obfuscated, so styles from a component cannot interfere with any other part of a page they're included into. The `default` export of a CSS Module is an object containing its class names as keys, and their obfuscated versions as values. This allows you to reference the class names as authored from within your component but output the obfuscated names when the component is used.


### Example

The following CSS defines class names which are short and generic but there is no risk of them interfering with anything else on the page because they'll be obfuscated. Class names should be written in camelCase so they may be more easily referenced in JavaScript.

```css
/* Button.css */
.button {
	background: steelblue;
	color: white;
	border-radius: 0.25em;
	padding: 0.5rem 1rem;
}

.large {
	font-size: 1.5rem;
}

.danger {
	background: firebrick;
}
```

When this CSS file is imported its selectors can be referenced using the object it exports:

```jsx
// Button.jsx
import { h } from '@financial-times/x-engine';
import styles from './Button.css';

const Button = ({ large, danger }) => {
	const classNames = [
		styles.button,
		large ? styles.large : '',
		danger ? styles.danger : ''
	];

	return <button className={classNames.join(' ')}>Click me!</button>;
};
```

_Please note: referencing classes and toggling them based on properties can become unwieldy so the [classnames] or [classcat] packages can help avoid some of the formatting hassle._

[CSS Module]: https://github.com/css-modules/css-modules
[classnames]: https://npmjs.org/package/classnames
[classcat]: https://github.com/jorgebucaran/classcat


### Manifest

To instruct the x-dash tools where to output styles and provide a hint to consumers where to import styles from, add a `style` property to the component's package manifest. This is the path to the bundled CSS output.
