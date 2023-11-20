<h1 align="center">
	<img src="https://user-images.githubusercontent.com/271645/38416861-1e6c6202-398e-11e8-907c-8c199a03988a.png" width="200" alt=""><br>
	x-dash
	<a href="https://circleci.com/gh/Financial-Times/x-dash/tree/main">
		<img alt="Build Status" src="https://circleci.com/gh/Financial-Times/x-dash/tree/main.svg?style=svg">
	</a>
</h1>

x-dash is a monorepo of shared front-end components for FT.com and the FT Apps.

### ⚠️ The x-dash monorepo is deprecated. ℹ️ x-dash _components_ are still supported and maintained.

New components **should not** be added to this monorepo. Existing components **continue to be supported** and receive new features and bug fixes. In 2024 we will gradually be sunsetting the monorepo and finding new homes for the components and developer tooling.

## Installing x-dash

### Requirements

To get started with x-dash, you'll need to make sure you have the following software tools installed.

1. [Git](https://git-scm.com/)
2. [Node.js](https://nodejs.org/en/) (version 16)
3. [npm](http://npmjs.com/) (versions 7 or 8)

Please note that x-dash has only been tested in Mac and Linux environments. If you are on a Mac you may find it easiest to install the [Command Line Tools](https://developer.apple.com/download/more/) package which includes Git.

#### Recommended

To aid the development of interactive components with Storybook it is recommended to install the React Developer Tools for your browser. These addons aid debugging by displaying the rendered component tree and provide access to view and edit their properties:

- [React Developer Tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [React Developer Tools for Firefox](https://addons.mozilla.org/en-GB/firefox/addon/react-devtools/)


### Project setup

1. Clone the x-dash Git repository and change to the new directory that has been created:

    ```bash
    git clone git@github.com:financial-times/x-dash
    cd x-dash
    ```

2. Install all of the project dependencies (this may take a few minutes if you are running this for the first time):

    ```bash
    npm install
    ```

3. Build the current set of x-dash components and start Storybook to view:

    ```bash
    npm run build
    npm run start-storybook
    ```

## Working with x-dash

The project repository is a monorepo which means all of the tools, packages and components are kept in one place and can be worked upon concurrently.


### Repository structure

The repository groups related code together in directories. UI components are stored in the `components` directory, documentation files in the `docs` directory, additional public packages in the `packages` directory.

```
├ components/
│  └ x-component/
│    ├ readme.md
│    └ package.json
├ packages/
│  └ x-package/
│    ├ readme.md
│    └ package.json
├ readme.md
└ package.json
```

### Using Storybook

[Storybook] is a development environment and showcase for UI components. It makes working on and sharing UI components easier by providing a richly configurable environment.

After installing x-dash you can start Storybook by running the following command from the repository root:

```sh
npm run start-storybook
```

This command will start a server running on [local.ft.com:9001] and generate an application presenting all of the components configured to use it. Changes to these components can be updated in real-time speeding up the development process.

Data properties passed to these component may also be configured in-situ and these changes will be reflected in the URL making it possible to share specific configurations.

[Storybook]: https://storybook.js.org/
[local.ft.com:9001]: http://local.ft.com:9001/


## Coding standards

The best way to ensure you stick to the x-dash code style is to make your work consistent with the code around it. We also provide a [Prettier] configuration to automatically format files and run [ESLint] before any tests. See the [contribution guide] for more information.

[Prettier]: https://prettier.io/
[ESLint]: https://eslint.org/
[contribution guide]: https://github.com/Financial-Times/x-dash/blob/HEAD/contribution.md

For more in-depth information visit the [Wiki](https://github.com/Financial-Times/x-dash/wiki)
