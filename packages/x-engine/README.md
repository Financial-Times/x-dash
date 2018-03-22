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

## Adding a new engine

Each engine is a function that will resolve the target runtime dependency and return a DOM builder or factory function. For example, to provide React's `createElement` method the React engine is implemented like this:

```js
const { createElement } = require('react');
module.exports = createElement;
```

## FAQ

### What about Hyperscript?

Hyperscript currently only supports passing a tag name (a string) as the first argument. This limitation means you cannot currently reference components inside other components.
