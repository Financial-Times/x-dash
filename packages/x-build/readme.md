# x-build

Common build tools for x-dash components and consumers of x-dash components

## Remit

x-build should:

- Bundle JSX into something usable without a runtime
- Bundle JSX into a JSX bundle consumable by users of (p)react
- Handle injecting the JSX function into things (whatever flavour of `React.createElement` the app is using)
- Compile out things that will never be needed by apps (Typescript types etc.)

## Thoughts

```typescript
import {configureBuild} from 'x-build';
import * as preact from 'preact';

configureBuild(preact); // tells x-build to use Preact's `h`
```
