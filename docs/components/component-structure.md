# Component structure

There is no formal specification for x-dash components. However, components do follow loose conventions, and making sure your component follows the same conventions means it will integrate more smoothly with the rest of the x-dash ecosystem, making your life a bit easier.

An example of a component that abides by these conventions is [`x-teaser`](https://github.com/financial-times/x-dash/tree/master/components/x-teaser).

## Syntax

x-dash components are made up of functions that return JSX elements. These are known as [Functional Components](https://reactjs.org/docs/components-and-props.html#functional-and-class-components) in React.

Each component should be in a separate file, with the name of the component in `PascalCase` as the filename and `.jsx` as the extension, for example `LiveBlogStatus.jsx`.

The `main` entry point of the component package should be the main component file itself, which should be named in the same format as all component files, instead of `index.js` or similar. It should export the main component as a named export, not `default`.

If a component is made up of many sub-components, it should export the sub-components used to assemble the main component as named exports alongside the main component.

## Compatibility

Because components are intended to work across varying environments, try to be as compatible as possible. In particular, don't do anything browser-specific, such as global event handlers or loading styles or scripts dynamically, or Node.js-specific, such as filesystem access.
