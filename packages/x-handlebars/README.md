# x-handlebars

This module provides Handlebars helper functions to render `x-` components.

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

Helper functions will be registered for each of the `x-` components available. For example, to render a [teaser component][teaser] you use the `x-teaser` helper, passing in the current context (`this` or `.`) as the first option:

```hbs
<div class="teaser-container">
	{{{x-teaser this}}}
</div>
```

_Note_, that you should use the triple mustache syntax, `{{{`, to ensure the HTML returned by the helper is not escaped.

Other options will be merged into the context, providing an easy means to provide overrides in-situ:

```hbs
<div class="teaser-container">
	{{{x-teaser this partial="Small" showStatus=false}}}
</div>
```

[teaser]: /components/x-teaser/readme.md
