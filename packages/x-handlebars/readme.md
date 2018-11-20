# x-handlebars

This module provides Handlebars helper functions to render `x-dash` component packages or local compatible modules within existing Handlebars templates.

## Installation

This module is compatible with Node 6+ and is distributed on npm.

```bash
npm install -S @financial-times/x-handlebars
```

To use the `x-handlebars` helper in your application views you must first register it with Handlebars. To do this you can use the `registerHelper` method, providing a helper name as the first argument (we recommend `x`) and calling the `xHandlebars` function:

```js
const xHandlebars = require('@financial-times/x-handlebars');
const handlebars = require('handlebars');

handlebars.registerHelper('x', xHandlebars());
```

If you are building an Express app using [n-ui][n-ui] you can register the helper functions on application startup. Please note that if you are already registering helpers then you may need to merge your existing configuration:

```js
const xHandlebars = require('@financial-times/x-handlebars');
const express = require('@financial-times/n-ui');

const app = express({
	helpers: {
		x: xHandlebars()
	}
});
```

An options object may be provided to the `xHandlebars` function when called. The options and their defaults are shown below:

```js
xHandlebars({
	baseDirectory: process.cwd()
});
```

This module will install the [x-engine][x-engine] module as a dependency to perform the rendering of `x-` components. Please refer to the x-engine documentation to setup your application with `x-engine`.

[n-ui]: https://github.com/Financial-Times/n-ui/
[x-engine]: https://github.com/Financial-Times/x-dash/tree/master/packages/x-engine

## Usage

This package provides a single helper function able to load x-dash component packages or local compatible modules.

Installed packages will be loaded from the `@financial-times` scope and are specified using the `package` argument.

Local modules are resolved relative to the configured base directory and are specified using the `local` argument.

If a module has multiple named exports then the specific property to use may be specified with the `component` argument.

For example, to render a teaser component from the [x-teaser package][teaser]:

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

The included component will inherit the current Handlebars context. Any extra arguments will be merged into the context, providing an easy means to provide overrides in-situ:

```handlebars
<div class="teaser-container">
	{{{x package="x-teaser" component="Teaser" showStatus=false}}}
</div>
```

[teaser]: /components/x-teaser/readme.md
