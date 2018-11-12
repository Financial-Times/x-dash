# x-node-jsx

This module extends Node's `require()` function to enable the use of `.jsx` files at runtime. It uses [Pirates] to safely add a require hook and [Sucrase] to transform code on-the-fly.

[Pirates]: https://github.com/ariporad/pirates
[Sucrase]: https://github.com/alangpierce/sucrase


## Installation

This module is compatible with Node 8+ and is distributed on npm.

```bash
npm install -S @financial-times/x-node-jsx
```

To install the `require` hook you must include and call the `x-node-jsx` module:

```js
require('@financial-times/x-node-jsx')();
```

The `x-node-jsx` install function will return a new function which can be used to later remove the `.jsx` file hook:

```js
const installHook = require('@financial-times/x-node-jsx');

const removeHook = installHook();

removeHook();
```

## Usage

This package provides a single helper function to. An options object may be provided to the function when called. The options and their defaults are shown below:

```js
installHook({
	production: true,
	transforms: ['imports', 'jsx']
});
```

The options will be passed to the Sucrase parser. To see more options take a look at the [Sucrase documentation].

When installed `.jsx` files can be included and will be transformed on-the-fly:

```js
// Install the hook
require('@financial-times/x-node-jsx')();

// Transparently require .jsx files
const App = require('./components/App.jsx');
```

[Sucrase documentation]: https://github.com/alangpierce/sucrase#transforms


