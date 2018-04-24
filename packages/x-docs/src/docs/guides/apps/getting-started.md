## Very quick start

1. Install the component you want to use

    ```
    npm install --save @financial-times/x-teaser
    ```

2. Import the component somewhere

    ```js
    const {Teaser} = require('@financial-times/x-teaser');
    ```

3. Pass some data to it

    ```js
    const markup = Teaser({title: 'Hello world'});
    ```

4. Do something with the output

    ```js
    element.innerHTML = markup;
    ```

## Slightly slower start

### Using as a React (et cetera) component

Add an `x-dash` stanza to your app's `package.json`, which tells components what runtime to use.

For React, the least you'll need is:

```json
{
  "x-dash": {
    "engine": {
      "browser": {
        "runtime": "react",
        "factory": "createElement"
      }
    }
  }
}
```

Then when you import a component, you can use it with React:

```jsx
const React = require('react');
const ReactDOM = require('react-dom');
const {Teaser} = require('@financial-times/x-teaser');

ReactDOM.render(
  <Teaser title='Hello world' />,
  document.querySelector('#target')
);
```

For more about configuring the component runtime, see the [x-engine documentation](/packages/x-engine).

### Enable component features

Each component has a set of features, which are parts of the component that can be toggled on or off. By default, most of these are disabled, and must be explicitly opted in to.

In the case of the Teaser component, to show an image, you must enable it as well as passing in the image data:

```js
Teaser({
  title: 'Hello world',
  image: {
    url: 'https://example.com/foo.jpg'
  },
  showImage: true
});
```

### Use component presets

Because enabling toggles can become repetetive, and to make use cases clearer, some components export presets.

The Teaser component has a `Small` preset, enabling the "title", "meta" and "status" elements (which show title, concept tags and live blog status & article timestamp respectively):

```js
const {Teaser, presets} = require('@financial-times/x-teaser');

Teaser({
  ...Teaser.presets.Small,
  title: 'Hello world',
  publishedDate: new Date(),
  concept: {
    url: '/brand',
    prefLabel: 'Brand'
  }
});
```

This example uses the [ES2018 Object Spread](https://github.com/tc39/proposal-object-rest-spread) syntax.
