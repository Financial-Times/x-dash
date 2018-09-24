# Creating components

To create a new component, you can start by running the `blueprint` script and providing a component name. This script will initialise a skeleton component with the required files including a readme, package manifest and basic source files.

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
└ rollup.js
```

All JavaScript and CSS source files should be stored in the `src` directory, Storybook configuration for the component must be maintained in the `stories` directory. Every package in x-dash must have a readme and a package manifest and public packages must include a `.npmignore` file.
