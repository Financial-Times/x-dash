# Create a component

To create a new component, you can start by running the `blueprint` script and providing the component name. This script will initialise a skeleton component with the required files including a readme, package manifest and basic source files.

You can run the blueprint script from the repository root like this:

```sh
npm run blueprint -- denshiba
```

_Please note: You do not need to prefix the component name with `x-`._

When the blueprint script runs it will initialise a new component with the following file structure:

```sh
├ src/
│  └ Denshiba.jsx
├ stories/
│  ├ story.js
│  └ index.js
├ .npmignore
├ package.json
├ readme.md
└ rollup.md
```


## JavaScript

You may use all syntax up to and including the ECMAScript 2018 specification and any features that may be polyfilled by the Polyfill Service in your component source code. This includes `async/await` but does not include any features at proposal, draft, or candidate stages (if you are unsure what this means check out the [TC39 Process document]).

If you are unsure about what you can or cannot use please check the [Can I Use] website or the [ECMAScript compatibility table].

All source code for your components should be authored as [ES Modules] using the `import` and `export` statements so that x-dash can generate and distribute optimised bundles.

[Babel] is used to transpile component source code and [Rollup] to generate the bundles to be consumed by applications. Currently 3 separate bundles are generated to suit different use-cases:

1. ES2015 CommonJS (for Node.js environments)
2. ES2015 ESM (for modern browser environments and bundlers)
3. ES5 CommonJS (for older browser environments and bundlers)

### JSX

Components are written using JSX (if you are not familiar with JSX check out [WTF is JSX] first) which provides special syntax for declaring elements and composing other components. JSX is an extension of JavaScript providing syntactic sugar to provide both a visual aid and to save writing lengthy function calls. It is implemented by the majority of JavaScript parsers and transpilers.

_Please note: Files containing JSX should use the `.jsx` extension._

### Structure

Each components is a function which accept an object containing all of the properties needed to render it and returns the elements describing what to render. These are pften called "stateless functional components".

Following this pattern means that components authored with x-dash should be compatible with a variety of static and dynamic runtimes including React, Preact, Inferno, VDO, and Hyperons amongst others.

Stateful components can still be created by using the [x-interaction] component.

[x-interaction]: /components/x-interaction


### Example

Below is an example of a `Header` component. It is a function which expects a single argument and declares some markup using JSX. It is able to render a title and an optional subtitle and uses a named export:

```jsx
export const Header = ({ title, subtitle }) => (
	<header>
		<h1>{title}</h1>
		{subtitle ? <p>{subtitle}</p> : null}
	</header>
);
```

[TC39 Process document]: https://tc39.github.io/process-document/
[ES Modules]: https://ponyfoo.com/articles/es6-modules-in-depth
[WTF is JSX]:https://jasonformat.com/wtf-is-jsx/
[Polyfill Service]: https://polyfill.io/
[Can I Use]: https://caniuse.com/
[ECMAScript compatibility table]: https://kangax.github.io/compat-table/es6/
[Babel]: https://babeljs.io/
[Rollup]: https://rollupjs.org/


## CSS and Origami

Components which provide markup and logic for existing Origami components do not need to provide any styles and should provide instructions for [installing the Origami package].

For components which are not a part of Origami x-dash includes the tools to author and bundle styles alongside the JavaScript package. Styles are written using [Sass] and it is strongly encouraged to follow the [Origami SCSS syntax standard]. A step-by-step guide to [styling x-dash components] is available.

To help with CSS bundle optimisation and avoid naming conflicts x-dash also allows the use of [CSS Modules]. This is an entirely optional feature and it is hoped that by beginning to adopt CSS Modules it may become possible in future to access other exciting tools and optimisations.


[installing the Origami package]: https://origami.ft.com/docs/developer-guide/modules/building-modules/#4-set-up-a-package-manifest-to-load-origami-modules
[Sass]: https://sass-lang.com/
[Origami SCSS syntax standard]: https://origami.ft.com/docs/syntax/scss/
[CSS Modules]: https://github.com/css-modules/css-modules
[styling x-dash components]: /docs/components/styling


## Dependencies

Modules should have as few dependencies as possible and when using external dependencies you should carefully consider the file size and future supportability of them. Where possible try to use dependencies which are already in common use to avoid the need for applications to bundle multiple dependencies which provide similar functionality.

_Please note: External dependencies will not be bundled with your source code._

## Storybook integration

TODO

## Testing

Tests are run for the whole project from the top level of the repository using the command `make test`. The test runner is [Jest] and [Enzyme] has been made available via the x-test-utils package for writing assertions against interactive components.

Snapshot tests will automatically created for each story that is configured for your component. These will fail should the output of your component for that story change. If this change is intentional then you may update the current snapshots by running the `make update-snapshots` command.

In addition and you are encouraged to write unit tests for interactive or complex components. A step-by-step guide to [testing x-dash components] is available.

[Jest]: https://jestjs.io/
[Enzyme]: http://airbnb.io/enzyme/
[testing x-dash components]: /docs/components/testing


## Publishing

All x-dash components and packages will be published on the [npm registry] under the `@financial-times` organisation. Components in the `master` or current `development` branches of x-dash will all be published concurrently with the same version number. Experimental components may be published with an unstable version number using a [prerelease tag].

[npm registry]: https://www.npmjs.com/
[prerelease tag]: https://github.com/Financial-Times/x-dash/blob/master/release-guidelines.md
