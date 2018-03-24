# x-engine

A consolidation library to render `x-dash` JSX components with any compatible engine.

## Installation

```sh
$ npm install @financial-times/x-engine
```

Available engines:

*   [React](https://reactjs.org/)
*   [Preact](https://preactjs.com/)
*   [vhtml](https://github.com/developit/vhtml)

**NOTE: you must still install the runtime you wish to use**

## Configuration

You can specify your runtime engine configuration from within `package.json`, like so:

```json
{
	"x-dash": {
		"engine": {
			"server": "vhtml",
			"browser": {
				"runtime": "preact",
				"factory": "h"
			}
		}
	}
}
```

Engine configuration accepts two properties, `server` and `runtime`, the former will be used to render components on the server with Node.js and the latter by Webpack at build time.

With the configuration in place you will now be able to include and render components with your runtime of choice, for example to render a component with `vhtml` you can so like this:

```js
const { Teaser } = require('@financial-times/x-teaser');
const html = Teaser({});
```

To use components on the client-side you will need to add the Engine plugin to your Webpack configuration file:

```js
const xEngine = require('@financial-times/x-engine/src/webpack');

module.exports = {
	plugins: [
		xEngine();
	]
};
```

## FAQ

### What about Hyperscript?

Hyperscript currently only supports passing a tag name (a string) as the first argument. This limitation means you cannot currently reference components inside other components.
