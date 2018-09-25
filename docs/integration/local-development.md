# Local development with x-dash

When developing an x-dash component it is recommended to use Storybook but it can still be useful to see it in the context of a real app.


## Prerequisites

This guide assumes that:

  - Your application is set up according to the [setup guide]
  - You have x-dash set up for development according to the [installation guide]

The examples are based upon the following directory structure:

```
├ projects/
│  ├ app/
│  └ x-dash/
└
```

[setup guide]: setup
[installation guide]: ../get-started/installation


## Using relative install

As an example, we'll install the [x-teaser] component into an app. In the application folder run install using the relative path from the current directory to the component:

```sh
npm install --save ../x-dash/components/x-teaser
```

If your application previously specified the component as a dependency then you should see that in the version specifier in the package manifest has changed to the path that you specified, e.g. `file:../x-dash/components/x-teaser`. The package will have been installed into the `node_modules` directory as a symbolic link to the folder within `x-dash`.

Using the `file:` version specifier any subsequent runs of `npm install` will continue to work so long as the files are kept in the correct locations. Otherwise, npm will return this error:

```
npm ERR! code ENOLOCAL
npm ERR! Could not install from "../x-dash/components/x-teaser" as it does not contain a package.json file.
```

If you encounter this error, ensure that x-dash is set up correctly in the parent folder of your app, or reinstall `x-teaser` from the npm registry using `npm install --save @financial-times/x-teaser`.

[x-teaser]: ../../components/x-teaser


## Avoid linking

Usually, using a locally-installed version of a package is a use case for `npm link`. In practice, we have found it to be brittle, causing problems with peer dependencies and nested transitive dependencies. Using relative `npm install` treats the installed package as any other, ensuring your `node_modules` directory has the expected structure.
