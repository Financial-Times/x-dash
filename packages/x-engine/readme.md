# x-engine

This module is a consolidation library to render `x-dash` components with any compatible runtime.

## Installation

This module is supported on Node 12 and is distributed on npm.

```bash
npm install -S @financial-times/x-engine
```

You'll also need to install your chosen runtime and any related dependencies. Some compatible runtimes are:

- [Hyperapp](https://github.com/hyperapp/hyperapp)<sup>\*</sup>
- [Hyperons](https://github.com/i-like-robots/hyperons)
- [Inferno](https://infernojs.org/)
- [Nerv](https://github.com/NervJS/nerv)
- [Preact](https://preactjs.com/)
- [Rax](https://alibaba.github.io/rax/)
- [React](https://reactjs.org/)
- [VDO](https://github.com/DylanPiercey/vdo)

\* Usage of Hyperapp depends on a small modification to higher-order components to accept `children` as a second argument rather than receiving them appended to `props`.

## Configuration

To start you must specify your runtime configuration within `package.json`. This instructs `x-engine` which modules to load for your environment. You may specify different runtimes for server and browser rendering depending on your needs.

This module includes several presets for popular tools and frameworks including React, Preact, and Hyperons. For example to use Hyperons on the server and Preact in the browser you may use the name of their preset:

```json
{
	"x-dash": {
		"engine": {
			"server": "hyperons",
			"browser": "preact"
		}
	}
}
```

But if your chosen tool does not have a preset then the configuration for it can be provided with the expanded configuration format. The example below shows how to load the VDO module and use its `createElement` factory function<sup>\*</sup>:

```json
{
	"x-dash": {
		"engine": {
			"server": {
				"runtime": "vdo",
				"factory": "createElement"
			}
		}
	}
}
```

\* A JSX factory function is a variadic function<sup>†</sup> with the signature `fn(element, properties, ...children)`, examples include `React.createElement` and `Preact.h`. See the [FAQ section](#faq) for more information.

† Variadic means that the function accepts a variable number of arguments. The `...` before the last arguments name is a rest parameter, meaning it will collect "the rest" of the arguments.

## Rendering

### Server-side

If your chosen runtime factory returns a string then you can pass properties to the component and immediately use the returned value:

```js
const { Teaser } = require('@financial-times/x-teaser');

app.get('/teaser', (request, response) => {
	const properties = { … };
	response.send(Teaser(properties));
});
```

But if your factory method returns a framework-specific intermediary code then you'll need to load the specified render method to render the node into a string or stream:

```js
const { render } = require('@financial-times/x-engine');
const { Teaser } = require('@financial-times/x-teaser');

app.get('/teaser', (request, response) => {
	const properties = { … };
	const nodes = Teaser(properties);
	response.send(render(nodes));
});
```

### Client-side

To use components on the client-side you will first need to add the `x-engine` plugin to your Webpack configuration file. Under the hood this uses [`DefinePlugin`](https://webpack.js.org/plugins/define-plugin/) to wire up your chosen runtime.

```js
// webpack.config.js
const xEngine = require('@financial-times/x-engine/src/webpack');

module.exports = {
	plugins: [
		xEngine()
	]
};
```

You can then install and use `x-` components in your client-side code:

```jsx
import { h } from '@financial-times/x-engine';
import { Teaser } from '@financial-times/x-teaser';

export default const TeaserList = (props) => (
	<ul class="TeaserList">
		{props.items.map((item) => (
			<li className="TeaserList-Item">
				<Teaser {...item} layout="small" showImage={true} />
			</li>
		))}
	</ul>
);
```

#### Client-side through n-ui
In order to configure n-ui to compile x-dash based `.jsx` files you will also need to add the following to `n-ui-build.config.js`.

```js
// n-ui-build.config.js
const xEngine = require('@financial-times/x-engine/src/webpack');

module.exports = {
	plugins: [
		xEngine()
	],
	pragma: 'h'
};
```

You will also need to import the factory function from `x-engine` in each `.jsx` file.

```javascript
import { h } from '@financial-times/x-engine'
```

## FAQ

### This sounds complicated… is it a magic black box?

There is no magic. The source code for the server-side integration is less than 60 lines of unexciting code. The Webpack plugin for client-side usage is even smaller.

### What is a "factory function"?

A factory function is a variadic function with the signature `fn(element, properties, ...children)`, examples include `React.createElement` and `Preact.h`. It may return the framework's representation of a HTML node or a formatted string depending on the runtime you're using.

### Which runtime should I use?

Whichever one you want! React, Preact, Rax, and Nerv are all largely compatible with one another. If you don't want the overhead of a framework, or are rendering static HTML, then it's worth investigating the Hyperons or VDO modules.

### What about Hyperscript?

Hyperscript currently only supports passing a tag name (a string) as the first argument. This limitation means you cannot currently reference components inside other components.
