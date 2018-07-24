---
order: 2
---

## Working on components

You've been through the [quick start guide](/tools/x-docs/src/docs/guides/components/getting-started.md), and you want to make your first change to x-dash. This guide will take you through the process for working on x-dash components, demoing and testing your changes, and getting them merged and released.


## Component development process

Open the repository in your editor and [have a look around](#getting-around-the-monorepo). While the component workbench is running, whenever you make a change, it will update without a reload. This way, you can quickly verify your changes in the browser.

### Conventions for components

x-dash's tools are built around a [set of conventions](/tools/x-docs/src/docs/guides/components/conventions.md) that components should follow. While you can write a component that doesn't follow the conventions, keeping to them will make the development process easier, and make the component easier to use for more consumers.

### The review process

When it's time to make a Pull Request for your changes, request a review from the [`financial-times/x-dash` Github team](https://github.com/orgs/Financial-Times/teams/x-dash). Before the Pull Request is merged, two developers must approve it: one from Next, and one from the Apps team.

This process is probably more restrictive than you're used to. x-dash components should work across a wide range of environments, so we need to make sure the changes you're making are compatible.

We encourage you to open the Pull Request as soon as possible so you can get early feedback. You could even open a Pull Request with an empty commit to start the discussion:

```bash
git checkout master -b cool-new-feature
git commit --allow-empty -m "intent to implement: cool new feature"
git push -u origin cool-new-feature
```

## Getting around the monorepo

A monorepo is a single source code repository containing multiple packages. In our case, it's [a Git repository](https://github.com/financial-times/x-dash) with several npm packages. Some are private, meaning they're not published to the npm repository. For example, this documentation website is a package called `x-docs`, but it doesn't make sense to publish the docs to npm.

There are three categories of package: Components, Packages, and Tools.

### [Components](/components)

Components, such as [`x-teaser`](/components/x-teaser), are the part of x-dash most people will be using and developing on directly. They're the templates and markup that apps can include.

### [Packages](/packages)

These are the nuts and bolts of x-dash, including the libraries that enable Components to work across multiple frameworks and runtimes. They're designed to be simple and stable, and so for the most part developers won't need to do anything with them directly.

### Tools

These are the things you'll use to help you develop x-dash components, including the [component explorer](/storybook) and this documentation. They run as part of the development interface, so you won't need to run them directly or know how they work to use them for components.

## Writing tests & demos

If you've added some new functionality to a component and you want to hook it up to the component explorer, you'll need to write a story file. A story is a module that specifies the data and controls for a single use case of a component. Create a file in the `/components/your-components/stories` folder, add it to the `stories` array in `/components/your-components/stories/index.js`.

Your component's story will be automatically included in the documentation demos and the snapshot tests. You'll also need to add it to the component explorer. Add your new component as a dependency of `x-workbench` then add `require('@financial-times/x-my-new-component'),` to [register-components.js](/tools/x-workbench/register-components.js).

Snapshot tests are run over every story of every component, and test the output of the JSX template against a snapshot file committed to the repository. When you first create a story or component, its snapshots won't exist, and your tests will fail. You'll need to generate and commit its snapshots by running:

```bash
npm test
git add __tests__/__snapshots__/snapshots.test.js.snap
git commit -m "create snapshots for new story foo"
```

### Updating snapshots

If you make a change to a component that means its snapshots are out of date, you'll need to regenerate the snapshots. Run:

```bash
npm test -- --updateSnapshot
```

and review the changes to the file `__tests__/__snapshots__/snapshots.test.js.snap`. Make sure the only changes are those you expected! When you're satisfied the snapshots are up to date, commit the file.

Read more about snapshot testing on the [Jest documentation](https://facebook.github.io/jest/docs/en/snapshot-testing.html).

### The story module formats

The component explorer is based on [Storybook](https://storybook.js.org/), with x-dash's own reusable specification format for stories.

#### index.js

A component's `stories/index.js` must export:

| Property | Usage |
|-|-|
| `package` | A reference to the `package.json` of the component (i.e. `exports.package = require('../package.json')`) |
| `component` | A reference to the main entry JSX function in your component |
| `stories` | An array of [story modules](#story-modules), which must be explicit calls to `require` with static paths (that is, you cannot dynamically generate the list of stories to `require`) |
| `knobs` | A [knobs](#knobsjs) specification, which must be an explict `require` call, usually to a file called `knobs.js` |

Additionally, it may also export:

| Property | Usage |
|-|-|
| `dependencies` | An Origami dependencies object, for loading CSS from the [Origami Build Service](https://www.ft.com/__origami/service/build/v2/). Each entry in the object is of the form `"o-component": "semver"`, e.g. `"o-fonts": "^3.0.0"` |

#### Story modules

Each module listed in the `stories` array must export:

| Property | Usage |
|-|-|
| `title` | The name of the story for navigation |
| `data` | A data object that will be passed to the component specified in [`index.js`](#indexjs) for this story |
| `knobs` | An array of knob names to include in this story |
| `m` | A reference to the internal `module` object for this module (that is, `exports.m = module;`). This exposes Webpack internals to Storybook to enable Hot Reloading of the story |
| `fetchMock` | A function passed [fetchMock](http://www.wheresrhys.co.uk/fetch-mock/) as an argument to mock http requests. `story.fetchMock = (fetchMock) => { fetchMock.get('https://api', {...fake response...}) }` |

#### knobs.js

A story's ["Knobs"](https://github.com/storybooks/storybook/tree/master/addons/knobs) are properties that can be live-edited within the component explorer, to demonstrate variations of a component and how it behaves with different sets of data.

knobs.js must export a function, which will be called with the base data for the story and a reference to the [Storybook Knobs API](https://github.com/storybooks/storybook/tree/master/addons/knobs#available-knobs).  must return an object containing functions that return a knob. Don't install and import the Knobs addon yourself; it's unlikely to work across packages, so the compoenent explorer provides all components a single instance.
