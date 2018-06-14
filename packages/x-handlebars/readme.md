# x-handlebars

This module provides Handlebars helper functions to render `x-` components.

## Installation

This module is compatible with Node 6+ and is distributed on npm.

```bash
npm install -S @financial-times/x-handlebars
```

To use the helper functions in your application views you must register them with Handlebars using the `registerHelper` method:

```js
const helpers = require('@financial-times/x-handlebars');
const handlebars = require('handlebars');

handlebars.registerHelper(helpers);
```

If you are building an Express app using [n-ui][n-ui] you can register the helpers on application startup:

```js
const express = require('@financial-times/n-ui');

const app = express({
	helpers: require('@financial-times/x-handlebars')
});
```

This module will install the [x-engine][x-engine] and [Hyperons][hyperons] modules as a peer dependencies to perform the rendering of `x-` components. Please refer to the x-engine documentation to setup the module with Hyperons.

[n-ui]: https://github.com/Financial-Times/n-ui/
[x-engine]: https://github.com/Financial-Times/x-dash/tree/master/packages/x-engine
[hyperons]: https://github.com/i-like-robots/hyperons

## Usage

A single helper function will be registered to load x-dash component packages or local modules.

Installed packages will be loaded from the `@financial-times` scope and are specified using the `package` option.

Local modules are resolved relative to the project root and are specified using the `local` option.

If a module has multiple named exports then the specific component to use may be specified using the `component` option.

For example, to render a teaser component from the [x-teaser paackage][teaser]:

```handlebars
<div class="teaser-container">
	{{{x package="x-teaser" component="Teaser"}}}
</div>
```

Or to load a local module with a default export:

```handlebars
<div class="promo-box-container">
	{{{x local="components/promo"}}}
</div>
```

_Note_, that you should use the triple mustache syntax, `{{{`, to ensure the HTML returned by the helper is not escaped.

Other options will be merged into the context, providing an easy means to provide overrides in-situ:

```handlebars
<div class="teaser-container">
	{{{x package="x-teaser" component="Teaser" preset="Small" showStatus=false}}}
</div>
```

[teaser]: /components/x-teaser/readme.md
