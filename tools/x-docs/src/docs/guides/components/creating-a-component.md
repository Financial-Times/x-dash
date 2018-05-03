# Creating a new component

To create a component, start the development server with `npm start`. Choose "Create a new package", select the `components` folder to put it in, and enter the component's name. The script creates the new folder and initialises it with a `package.json` file. A shortcut for this is `npm start -- create --name 'component-name' --folder 'components'`.

It's recommended, but not required, that all x-dash components and packges are in the `@financial-times/` [npm scope](https://docs.npmjs.com/misc/scope), and begin with `x-`. You'll need to include these when entering the package name, for example `@financial-times/x-foo`.

## Component structure
