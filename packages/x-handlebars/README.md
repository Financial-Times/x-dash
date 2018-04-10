# x-handlebars

This module provides Handlebars helper functions to render x- components.

## Installation

This module is compatible with Node 6+ and is distributed on npm.

```sh
$ npm install -S @financial-times/x-handlebars
```

To use the helper functions in your application views you must register them with Handlebars using the `registerHelper` method:

```js
const helpers = require('@financial-times/x-handlebars');
const handlebars = require('handlebars');

handlebars.registerHelper(helpers);
```

If you are building an Express app with [n-ui][n-ui] you can register the helpers on application startup:

```js
const express = require('@financial-times/n-ui');

const app = express({
	helpers: require('@financial-times/x-handlebars')
});
```

[n-ui]: https://github.com/Financial-Times/n-ui/

## Usage

Helper functions will be registered for each of the `x-` components available. For example, to render a [teaser component][teaser] you use the `x-teaser` helper:

```hbs
{{{x-teaser data=this}}}
```

The `data` argument passes the current context to helper, which will pass it along to the component. Any other options declared will be merged into `data`, providing an easy means to provide any overrides in-situ.

[teaser]: https://github.com/Financial-Times/x-dash/tree/master/packages/x-teaser
