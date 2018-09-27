# Component overview


## Structure

Components should follow the structure outlined below. JavaScript and CSS source files should be stored in the `src` directory, Storybook configuration for the component in the `stories` directory and the root of the component must include an [`.npmignore`][ignore] file, the package manifest, a readme, and the Rollup configuration.

```sh
├ src/
│  ├ styles.scss
│  └ Denshiba.jsx
├ stories/
│  ├ story.js
│  └ index.js
├ .npmignore
├ package.json
├ readme.md
└ rollup.js
```

_Please note: Files containing JSX should use the `.jsx` extension._

[ignore]: https://docs.npmjs.com/misc/developers#keeping-files-out-of-your-package


## Compatibility

Components written with x-dash are intended to work across varying environments so they must at least meet the FT's browser support requirements. Components should also be able to render on both the server and in the browser which means they must avoid or carefully wrap browser-specific or server-specific code.

For specific information about compatibility see the [JavaScript] and [CSS] pages.

[JavaScript]: /docs/components/javascript
[CSS]: /docs/components/styling


## Dependencies

Components should have as few dependencies as possible and when using external dependencies you should always carefully consider the compatibility, file size, and future supportability of them. Where possible try to use dependencies which are already in common use across FT projects to avoid the need for applications to bundle multiple dependencies which provide similar functionality.

_Please note: External dependencies will not be bundled with your source code._


## Testing

Tests are run across the whole project from the top level of the repository using the command `make test`. The test runner is [Jest] and [Enzyme] has been made available via the x-test-utils package for writing assertions against interactive components.

Snapshot tests will be automatically created for each story that is configured for a component. These will fail should the output of the component for that story change.

In addition it is encouraged to write unit tests for interactive or complex components. See the guide to [testing x-dash components] for more information.

[Jest]: https://jestjs.io/
[Enzyme]: http://airbnb.io/enzyme/
[testing x-dash components]: /docs/components/testing


## Publishing

All x-dash components and packages will be published on the [npm registry] under the `@financial-times` organisation. Components in the `master` or current `development` branches of x-dash will all be published concurrently with the same version number. Experimental components may be published with an unstable version number using a [prerelease tag].

[npm registry]: https://www.npmjs.com/
[prerelease tag]: https://github.com/Financial-Times/x-dash/blob/master/release-guidelines.md
