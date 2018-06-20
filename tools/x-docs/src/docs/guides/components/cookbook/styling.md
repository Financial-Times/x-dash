# Styling

## Origami components

Some x-dash components, such as [x-teaser](/components/x-teaser/readme.md), are built to be compatible with styles provided by Origami components, by using their classnames. These styles ase expected to be provided by the application that's consuming the x-dash component, for example by including the CSS from the [Origami Build Service](https://www.ft.com/__origami/service/build/v2/). To include these styles in a component's demos in the documentation and component explorer, use the `dependencies` object in your component's [`stories/index.js`](/tools/x-docs/guides/components/setup.md#indexjs).

## Component-specific styles

Some components may require styling not provided by existing Origami components. If your component's styles might be useful outside of the FT.com ecosystem, you may want to speak to the [Origami team](http://origami.ft.com/) about creating its styles as an Origami component.

If your component will only be used within FT.com, you can include its styles as CSS Modules within the component.

### CSS Modules

A CSS Module is a self-contained CSS file that can be used with ECMAScript `import`. When a component is bundled, its CSS Modules are bundled into a single `.css` file, and their classes are obfuscated into effectively-random strings, so styles from a component cannot interfere with any other part of a page they're included into. The `default` export of a CSS Module is an object containing its classes as keys, and their obfuscated versions as values. This allows you to reference the classes from your component by their readable names, and output the obfuscated names when the component is used.

Keep your CSS files in your `src` directory, adjacent to the component that will use them, with the same naming convention as your `.jsx` files. For example, if you have a `Button` component in `Button.jsx`, its styles should be in the same directory, in a file called `Button.css`.

```css
/* Button.css */

.button {
	background: steelblue;
	color: white;
	border-radius: 0.25em;
	padding: 0.5em 1em;
}

.large {
	font-size: 1.6em;
}

.danger {
	background: firebrick;
}
```

Although these classes are short and generic, there is no risk of them interfering with anything else on the page, because they'll be obfuscated into strings like `.Button_button__vS7Mv`.

When you `import` this CSS file, you can reference its styles using the object it exports:

```jsx
// Button.jsx

import { h } from '@financial-times/x-engine';
import buttonStyles from './Button.css';

export const Button = ({large, danger}) => <button
	className={
		`${buttonStyles.button} ${large ? buttonStyles.large : ''}  ${danger ? buttonStyles.danger : ''}`
	}
>Click me!</button>;
```

Because referencing classes and toggling them based on properties can become unwieldy, we recommend using the [`classnames`](https://npmjs.org/package/classnames) npm package. With it, the previous example becomes:

```jsx
// Button.jsx

import { h } from '@financial-times/x-engine';
import buttonStyles from './Button.css';
import classNames from 'classnames';

export const Button = ({large, danger}) => <button
	className={classNames(
		buttonStyles.button,
		{
			[buttonStyles.large]: large,
			[buttonStyles.danger]: danger,
		}
	)}
>Click me!</button>;
```

### `style`

To inform the x-dash tooling where to output your styles, as well as as a hint to consumers of your component, include a `style` key in your `package.json`, which is a filename to output your bundled CSS to. This should be alongside your bundled Javascript files, which by default are placed in the `dist` folder.

### Sass and other preprocessors

While preprocessors are supported, we encourage you to consider the caveats of using them:

- x-dash components and styles are intended to be small and self-contained; features such as mixins can cause duplication of style output.
- Component styles are compiled and bundled to a single CSS file at publiication, so:
	- Applications consuming your component have no access to the original, un-preprocessed files
	- A component can only refrerence its styles by the obfuscated classnames; this prevents you from writing your styles as mixins, as the class names must be available at bundle-time

If you want to use a preprocessor, you need to install it as a `devDependency` of your component. The supported preprocessor modules are:

- `node-sass`
- `less`
- `stylus`

Files with `.scss`, `.less` and `.styl` extensions will be automatically compiled.
