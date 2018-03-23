# x-engine

A consolidation library to render `x-dash` JSX components with any compatible engine.

## Installation

```sh
$ npm install @financial-times/x-engine
```

Available engines:

- [React](https://reactjs.org/)
- [Preact](https://preactjs.com/)
- [vhtml](https://github.com/developit/vhtml)

**NOTE: you must still install the runtime you wish to use**

## Configuration

You can specify your runtime engine configuration from within `package.json`, like so:

```json
{
  "x-dash": {
    "engine": {
      "server": "vhtml",
      "browser": "preact"
    }
  }
}
```

In Node.js you will then be able to include and render components with your runtime of choice, for example to render a component with `vhtml` you can so like this:

```js
const { Teaser } = require('@financial-times/x-teaser');
const html = Teaser({});
```

TODO: Make a plugin for this build time bit... For the client-side you will need to add some configuration to your Webpack config. To configure Preact you would do so like this:

```js
const { DefinePlugin } = require('webpack');

module.exports = {
	resolve: {
		alias: {
			'@financial-times/x-engine': '@financial-times/x-engine/src/client'
		}
	},
	plugins: [
		new DefinePlugin({
			'ENGINE_RUNTIME': '"preact"',
			'ENGINE_RESOLVE': 'runtime.h'
		})
	]
};
```

## FAQ

### What about Hyperscript?

Hyperscript currently only supports passing a tag name (a string) as the first argument. This limitation means you cannot currently reference components inside other components.
