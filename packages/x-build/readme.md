# x-build

Common build tools for x-dash components and consumers of x-dash components

## Remit

x-build should:

- Bundle JSX into something usable without a runtime
- Bundle JSX into a JSX bundle consumable by users of (p)react
- Handle injecting the JSX function into things (whatever flavour of `React.createElement` the app is using)
- Compile out things that will never be needed by apps (Typescript types etc.)

## Usage (for consuming components)

##### WIP/wishful thinking

### Node.js require hook

Run `node` with `-r @financial-times/x-build/register`, or add `require('@financial-times/x-build/register')` early on in your entry point. Requiring an x-dash component will give you the appropriate flavour depending on your [config](#configuration).

### Babel preset

Add `@financial-times/x-build/babel` to `presets` in your `.babelrc`.

### Webpack loader

Add `@financial-times/x-build/webpack` to your Webpack config. It's easiest to add a rule targeting modules that start with `@financial-times/x-`, e.g.:

```js
{
	module: {
		rules: [{
			test: /^@financial-times\/x-/,
			loader: '@financial-times/x-build/webpack',
		}],
	},
}
```

## Usage (for building components)

Run `x-build compile`. `x-build` will compile your TypeScript files into JSX and TypeScript declaration files, as well as a zero-runtime bundled version for use in script tags.

## Configuration

By default, `x-build` infers things from your project's environment to decide what flavour of component to give you. If it's got something wrong, you can explicitly configure it using a Yaml file.

### `x-build init`

Creates an `x-build.yml` with your current inferred settings.

### `x-build.yml`

Specify one of the top-level keys `jsx`, `handlebars` or `web-components` to choose your component flavour. Each flavour has a few options:

```yaml
jsx:
  pragma: React.createElement
```
