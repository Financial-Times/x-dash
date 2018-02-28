# x-build

Common build tools for x-dash components and consumers of x-dash components

## Remit

x-build should:

- Bundle JSX into something usable without a runtime
- Bundle JSX into a JSX bundle consumable by users of (p)react
- Handle injecting the JSX function into things (whatever flavour of `React.createElement` the app is using)
- Compile out things that will never be needed by apps (Typescript types etc.)

## Usage

##### WIP/wishful thinking

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

## Thoughts/scratchpad

```typescript
import {configureBuild} from 'x-build';
import * as preact from 'preact';

configureBuild(preact); // tells x-build to use Preact's `h`
```
