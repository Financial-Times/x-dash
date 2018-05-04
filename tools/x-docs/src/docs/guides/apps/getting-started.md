## Very quick start

1. Install the component you want to use

    ```bash
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
    res.send(markup);
    ```

## Slightly slower start

Read the [Full Setup](/tools/x-docs/src/docs/guides/apps/setup.md) guide next.
