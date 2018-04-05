# x-engine

A consolidation library to render `x-` components with any compatible runtime.

## Installation

```sh
$ npm install -S @financial-times/x-engine
```

You'll also need to install your chosen runtime and any related dependencies. Some compatible runtimes are:

- [Hyperapp](https://github.com/hyperapp/hyperapp)<sup>\*</sup>
- [Inferno](https://infernojs.org/)
- [Nerv](https://github.com/NervJS/nerv)
- [Preact](https://preactjs.com/)
- [Rax](https://alibaba.github.io/rax/)
- [React](https://reactjs.org/)
- [VHTML](https://github.com/developit/vhtml)<sup>†</sup>

\* Usage of Hyperapp depends on a small modification to higher-order components to accept `children` as a second argument rather than receiving them appended to `props`.

† The current release of the VHTML module has compatibility issues and is therefore not viable for production use without modification.

## Configuration

To start you must specify your runtime configuration within `package.json`. This instructs `x-engine` which modules to load for both the server and for the browser environments.

You only need to specify the environments you need and you may specify different runtimes depending on your needs.

```json
{
	"x-dash": {
		"engine": {
			"server": "vhtml",
			"browser": {
				"runtime": "react",
				"factory": "createElement"
			}
		}
	}
}
```

If your chosen runtime module returns a factory function<sup>\*</sup> you only need to specify the module name but if the module exposes multiple methods then you must specify the appropriate method to use.

With the configuration in place you will now be able to include and render `x-` components.

\* A JSX factory function is a variadic function (one which supports a variable number of arguments) with the signature `fn(element, properties, ...children)`, examples include `React.createElement` and `Preact.h`. See the [FAQ section](#faq) for more information.

## Rendering

### Server-side

If your chosen runtime factory returns a string (e.g. the `vhtml` package) then you can pass properties to the component and immediately use the returned value:

```js
const { Teaser } = require('@financial-times/x-teaser');

app.get('/teaser', (request, response) => {
	const properties = { … };
	response.send(Teaser(properties));
});
```

But if your factory method returns a node (this will be the case if you're using `react/preact/inferno/rax/nerv`) then you'll need to load their specific methods to convert the node into a string or stream:

```js
const { Teaser } = require('@financial-times/x-teaser');
const { renderToString } = require('react/server');

app.get('/teaser', (request, response) => {
	const properties = { … };
	const nodes = Teaser(properties);
	response.send(renderToString(nodes));
});
```

### Client-side

To use components on the client-side you will first need to add the `x-engine` plugin to your Webpack configuration file. Under the hood this uses [`DefinePlugin`](https://webpack.js.org/plugins/define-plugin/) to wire up your chosen runtime.

```js
// webpack.config.js
const xEngine = require('@financial-times/x-engine/src/webpack');

module.exports = {
	plugins: [
		xEngine();
	]
};
```

You can then install and use `x-` components in your client-side code:

```jsx
import React from 'react';
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

## FAQ

### This sounds complicated… is it a magic black box?

There is no magic. The source code for the server-side integration is less than 60 lines of unexciting code. The Webpack plugin for client-side usage is even smaller.

### What is a "factory function"?

A factory function is a variadic function with the signature `fn(element, properties, ...children)`, examples include `React.createElement` and `Preact.h`. It may return the framework's representation of a HTML node or a formatted string depending on the runtime you're using.

### Which runtime should I use?

Whichever one you want! React, Preact, Rax, and Nerv are all largely compatible with one another. If you don't want the overhead of a framework, or are rendering static HTML, then it's worth investigating the tiny VHTML module.

### Which is the fastest runtime to use?

You can see the full results of our benchmarking in the [benchmarks package][b]. The fastest server-side runtime is currently Hyperapp but components would need to be aware of its small differences.

[b]: https://github.com/Financial-Times/x-dash/blob/master/private/ssr-benchmark/RESULTS.md

### What about Hyperscript?

Hyperscript currently only supports passing a tag name (a string) as the first argument. This limitation means you cannot currently reference components inside other components.
