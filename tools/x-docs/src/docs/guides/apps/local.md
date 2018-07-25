# Using Locally-installed x-dash

When developing an x-dash component, although we recommend using the Component Explorer to preview your component, it's sometimes useful to see it in the context of a real app.

## Prerequisites

This guide assumes that:

  - your app is set up according to the [app setup guide](/tools/x-docs/src/docs/guides/apps/setup.md)
  - you have x-dash set up for development according to the [component setup guide](/tools/x-docs/src/docs/guides/components/setup.md)
  - the folders for your app and x-dash are in the same parent directory

## Using relative `npm install`

As an example, we'll install [`x-teaser`](/components/x-teaser/readme.md) into an app. With your app and x-dash set up as above, in the folder for your app, run `npm install --save ../x-dash/components/x-teaser`.

If you had `x-teaser` previously installed from `npm`, you should see that in your `package.json`, the version specifier has changed to `file:../x-dash/components/x-teaser`. The package will have been installed into `node_modules` as a symbolic link to the folder within `x-dash`.

While the `file:` version specifier, subsequent runs of `npm install` will work as long as the folders are kept in the correct locations. Otherwise, npm will return this error:

```
npm ERR! code ENOLOCAL
npm ERR! Could not install from "../x-dash/components/x-teaser" as it does not contain a package.json file.
```

If you encounter this error, ensure that x-dash is set up correctly in the parent folder of your app, or reinstall `x-teaser` from the npm registry using `npm install --save @financial-times/x-teaser`.

### Avoid `npm link`

Usually, using a locally-installed version of a package is a use case for `npm link`. In practice, we have found it to be brittle, causing problems with peer dependencies and nested transitive dependencies. Using relative `npm install` treats the installed package as any other, ensuring your `node_modules` has the expected structure.
