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

Each engine is a function that will resolve the target runtime dependency and return a function

## Inspired by

- [Consolidate.js](https://github.com/tj/consolidate.js)
