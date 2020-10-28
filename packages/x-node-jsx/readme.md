# x-node-jsx

This module extends Node's `require()` function to enable the use of `.jsx` files at runtime. It uses [Pirates] to safely add a require hook and [Sucrase] to transform code on-the-fly.

[Pirates]: https://github.com/ariporad/pirates
[Sucrase]: https://github.com/alangpierce/sucrase


## Installation

This module is supported on Node 12 and is distributed on npm.

```bash
npm install -S @financial-times/x-node-jsx
```

To add the require hook you only need to import the register module. You can do this programmatically in your application code:

```js
require('@financial-times/x-node-jsx/register');
```

Or use the `--require` or `-r` flag when invoking Node:

```bash
node --require "@financial-times/x-node-jsx/register"
```

You can also add the require hook manually. This will return a function which can be used to later remove the hook:

```js
const addHook = require('@financial-times/x-node-jsx');

const removeHook = addHook();

// Some time later...
removeHook();
```

An options object may also be provided, the options and their defaults are shown below:

```js
const addHook = require('@financial-times/x-node-jsx');

addHook({
	production: true,
	transforms: ['imports', 'jsx']
});
```

These options will be passed to the Sucrase module. To see more options take a look at the [Sucrase documentation].

After the hook has been added `.jsx` files can be imported and will be transformed on-the-fly:

```js
// Add the hook
require('@financial-times/x-node-jsx/register');

// Transparently require .jsx files
const App = require('./components/App.jsx');
```

[Sucrase documentation]: https://github.com/alangpierce/sucrase#transforms


