# Local development with x-dash

When developing an x-dash component it is recommended to use Storybook but it can still be useful to see it in the context of a real app.


## Prerequisites

This guide assumes that:

  - You have a ready to run Node.js application
  - You have x-dash set up for development according to the [installation guide]

The examples are based upon the following directory structure:

```
├ projects/
│  ├ your-application/
│  └ x-dash/
```

[installation guide]: /docs/get-started/installation


## Installing local components

As an example, we'll install the [x-teaser] component into an app. In the application folder run the `npm install` command using the relative path from the current directory to the required component:

```sh
npm install --save ../x-dash/components/x-teaser
```

If your application previously specified the component as a dependency then you should see that the version specifier in the package manifest has now changed to the path that you specified prefixed with the `file:` protocol. The component should now have been installed into the `node_modules` directory as a symbolic link to within `x-dash`.

Using the `file:` version specifier for subsequent runs of `npm install` will continue to work so long as the files are kept in the correct locations. Otherwise, npm will return this error:

```
npm ERR! code ENOLOCAL
npm ERR! Could not install from "../x-dash/components/x-teaser" as it does not contain a package.json file.
```

If you encounter this error, ensure that x-dash is set up correctly in the parent folder of your app, or reinstall `x-teaser` from the npm registry using `npm install --save @financial-times/x-teaser`.

[x-teaser]: /components/x-teaser


## Avoid linking

Usually, using a locally-installed version of a package is a use case for `npm link`. In practice, we have found it to be brittle, causing problems with peer dependencies and nested transitive dependencies. Using relative `npm install` treats the installed package as any other, ensuring that your `node_modules` directory has the expected structure.
