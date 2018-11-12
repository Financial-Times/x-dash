# x-node-jsx

This module extends Node's `require()` function to enable the use of `.jsx` files at runtime. It uses [Pirates] to safely add a require hook and [Sucrase] to transform code on-the-fly.

[Pirates]: https://github.com/ariporad/pirates
[Sucrase]: https://github.com/alangpierce/sucrase


## Installation

This module is requires Node 8+ and is distributed on npm.

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

An options object may be provided to the install function when called. The options and their defaults are shown below:

```js
nodeJSX({
	production: true,
	transforms: ['imports', 'jsx']
});
```

The options will be passed to the Sucrase parser. To see more options take a look at the [Sucrase documentation].

[Sucrase documentation]: https://github.com/alangpierce/sucrase#transforms

## Usage

This package provides a single helper function able to load x-dash component packages or local compatible modules.


