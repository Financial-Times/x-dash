# Application setup

Components authored with x-dash are authored using [JSX] and are designed to be compatible with a variety of runtimes to make integrating them into your application as flexible as possible. They can be used with any React-like library, such as Preact or Inferno, or rendered statically. They can also be integrated with Handlebars using the [x-handlebars package].

[JSX]: https://jasonformat.com/wtf-is-jsx/
[x-handlebars package]: /packages/x-handlebars


## Choosing a runtime

There are a number of JavaScript tools and frameworks which support JSX. The most well known of these is [React] and its derivitives including [Preact] and [Inferno]. These tools all implement a similar feature set for rendering interactive interfaces. There are also tools able to render JSX to static HTML such as [Hyperons] and [VDO] which may be a good choice when integrating x-dash components into an existing server-side rendered app.

When building interactive interfaces for the client-side it is recommended to use Preact as this is already in use around the FT. For rendering static HTML on the server it is recommended to use Hyperons because it has excellent performance.

[React]: https://reactjs.org/
[Preact]: https://preactjs.com/
[Inferno]: https://infernojs.org/
[Hyperons]: https://github.com/i-like-robots/hyperons
[VDO]: https://www.npmjs.com/package/vdo


## Installing components

Components should be installed and added to your application's dependencies using [npm]. For example, to install the [x-teaser component] you would run:

```
npm install --save @financial-times/x-teaser
```

_Please note: Remember that you will also need to install your chosen runtime!_

[npm]: https://npmjs.org
[x-teaser component]: /components/x-teaser


## Configuration

Because x-dash components cannot interface with the runtime directly a consolidation library named [x-engine] is used to connect them. You must provide x-engine with some configuration added to your application's `package.json` to instruct it how to load the runtime. For example to use the Hyperons module to render x-dash components on the server you may add this:

```json
{
  "x-dash": {
    "engine": {
      "server": "hyperons"
    }
  }
}
```

Please refer to the the [x-engine documentation] for further configuration information.

[x-engine]: /packages/x-engine
[x-engine documentation]: /packages/x-engine


## Rendering

JSX source code is transpiled to a set of function calls for each element. These function calls will usually output a framework specific representation of each element which builds up a data structure describing what to render. Whichever runtime you choose it will provide a method to transform this data structure into HTML. You must call this render method yourself in your application.

For example, if you are using React you may render an x-dash component like this in your client-side code:

```jsx
const React = require('react');
const ReactDOM = require('react-dom');
const { Teaser } = require('@financial-times/x-teaser');

ReactDOM.render(
  <Teaser title='Hello world' />,
  document.querySelector('#target')
);
```

You can also access the x-engine package directly in your own code which may be convenient if you think you may change the runtime in future. For example:

```jsx
const { render } = require('@financial-times/x-engine');
const { Teaser } = require('@financial-times/x-teaser');

// JSX syntax is sugar for function calls so it is not required!
const html = render(Teaser({ title: 'Hello World' });
```


### Use component presets

Components which have many configigurable properties may expose a collection `presets` which are groups of ready configured properties for common use-cases. These can be mixed into your existing data properties to make your code less repetitive.

For example the x-teaser component can be configured in many different ways and [includes several presets]:

```js
const { Teaser, presets } = require('@financial-times/x-teaser');

Teaser({
  ...presets.Hero,
  ...teaserData,
});
```

[includes several presets]: /components/x-teaser#presets
