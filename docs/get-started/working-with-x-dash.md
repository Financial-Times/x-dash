# Working with x-dash

The project repository is a monorepo. This means all of the tools, public packages and components are kept in one place and can be worked upon concurrently.


## Repository structure

The repository uses a directory structure to group related code together. UI components are stored in the `components` directory, documentation files in the `docs` directory, additional public packages in the `packages` directory and tools aid working with x-dash in the `tools` directory.

```
├ components/
│  └ x-component/
│    ├ readme.md
│    └ package.json
├ docs/
│  └ page.md
├ packages/
│  └ x-package/
│    ├ readme.md
│    └ package.json
├ tools/
│  ├ x-docs/
│  │ └ package.json
│  └ x-storybook/
│    └ package.json
├ readme.md
└ package.json
```


## Writing documentation

The documentation you're reading right now is generated from a Markdown file stored in the `docs` directory. Other pages to show the packages and components are created dynamically using information inferred from the repository.

This website is stored in the `tools/x-docs` directory and is built using the static site generator [Gatsby](https://gatsbyjs.org). You don't need to learn Gatsby to get started writing documentation!

Once you have [installed] the x-dash project you can run this command from the repository root to build and run the documentation website:

```sh
npm run start-docs
```

Using this command the documentation site will be generated and start a server running on [local.ft.com:8000]. Whilst the server is running all of the files used as data sources will be watched and the website will automatically update when they change.

[installed]: /docs/getting-started
[local.ft.com:8000]: http://local.ft.com:8000/


## Using Storybook

[Storybook] is a development environment and showcase for UI components. It has been included to make working on and sharing UI components easier by providing a rich configurable environment.

After installing x-dash you can start storybook by running this command from the repository root:

```sh
npm run start-storybook
```

This command will start a server running on [local.ft.com:9001] and generate an application presenting all of the components configured to use it. Changes to these components can be updated in real-time speeding up the development process.

Data properties passed to these component may also be configured in-situ and these changes will be reflected in the URL making it possible to share specific configurations.

[Storybook]: https://storybook.js.org/
[local.ft.com:9001]: http://local.ft.com:9001/
