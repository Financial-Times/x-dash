# x-live-blog-wrapper

This module displays a list of live blog posts using `x-live-blog-post` component. It also connects to an event stream which provides updates for the list. Based on these update events this component will add, remove and update `x-live-blog-post` components in the list.

## Installation

This module is supported on Node 12 and is distributed on npm.

```bash
npm install --save @financial-times/x-live-blog-wrapper
```

The [`x-engine`][engine] module is used to inject your chosen runtime into the component. Please read the `x-engine` documentation first if you are consuming `x-` components for the first time in your application.

[engine]: https://github.com/Financial-Times/x-dash/tree/HEAD/packages/x-engine

## Usage

The components provided by this module are all functions that expect a map of [properties](#properties). They can be used with vanilla JavaScript or JSX (If you are not familiar check out [WTF is JSX][jsx-wtf] first). Also worth noting, this component handles visibility tracking when passed `postTrackerConfig` property. The `postTrackerConfig` property contains the follow fields:

- onEntersViewport: Callback function with an event parameter
- OnRead: Callback function with an event parameter
- OnError: Callback function with an event parameter
- usePostTracker: Boolean. When set to `true` LiveBlogWrapper component creates and manages an instance of PostTracker and reports read, view, error events.
  All fields are required to use post tracking.

For example if you were writing your application using React you could use the component like this:

```jsx
import React from 'react';
import { LiveBlogWrapper } from '@financial-times/x-live-blog-wrapper';

// example props. Not exhaustive but shows use of tracking
const props = {
    posts: [],
    id: 'live-blog-wrapper',
    articleUrl: `https://www.ft.com/content/${id}`,
    showShareButtons: true,
    postTrackerConfig: {
        onEntersViewport: (event) => console.log(event, 'view'),
        onRead: (event) => console.log(event, 'read'),
        onError: (event) => console.log(event, 'error'),
        usePostTracker: true,
    }
}

// A == B == C
const a = LiveBlogWrapper(props);
const b = <LiveBlogWrapper {...props} />;
const c = React.createElement(LiveBlogWrapper, props);
```

All `x-` components are designed to be compatible with a variety of runtimes, not just React. Check out the [`x-engine`][engine] documentation for a list of recommended libraries and frameworks.

[jsx-wtf]: https://jasonformat.com/wtf-is-jsx/

The `x-live-blog-wrapper` component also exports `PostTracker`, a class used to track post visibility. It reports a read and a view event for individual posts in the `LiveBlogWrapper` component. If you choose to handle post tracking yourself, this class should be used as an alternative.

```js
import { PostTracker } from '@financial-times/x-live-blog-wrapper'

const onEntersViewPort = (event) => {} // Enrich event with app context and report to tracking medium.
const onRead = (event) => {} // Enrich event with app context and report to tracking medium.
const onError = (event) => {} // Enrich event with app context and report to tracking medium.
const liveBlogPackageId = '00000-00000-00000-00000'

/**
 * @type {import('@financial-times/x-live-blog-wrapper').PostTracker.PostTrackerConfig}
 */
let config = {
  query: 'article[data-trackable="live-post"]', // required
  minMillisecondsToReport: 5000,
  returnVisibleElement: true,
  observerUpdateEventString: 'LiveBlogWrapper.INSERT_POST', // required
  liveBlogWrapperQuery: `div[data-live-blog-wrapper-id="${liveBlogPackageId}"]`, // required, where id = liveblogpackage.id
  liveBlogWrapper: this.props.liveBlogWrapperElementRef
    ? this.props.liveBlogWrapperElementRef.current
    : undefined,
  onEntersViewport: (event) => onEntersViewport(event), // required
  onRead: (event) => onRead(event), // required
  onError: (event) => onError(event) // required
}
const tracker = new PostTracker(config)
```

### Client side rendering

This component can be used at the client side.

```jsx
import { LiveBlogWrapper } from '@financial-times/x-live-blog-wrapper'

;<LiveBlogWrapper
  articleUrl="https://www.ft.com/content/live_blog_package_uuid"
  showShareButtons={true}
  id="live-blog-wrapper"
  posts={posts}
/>
```

### Server side rendering and hydrating

When rendering this component at the server side, hydration data must be rendered to the document using `Serialiser` and `HydrationData` components which are provided by `x-interaction`.

To successfully hydrate this component at the client side, the `id` property **must** be provided when rendering it at the server side. `x-interaction` will add this id to the markup as a `data-x-dash-id` attribute. This property can later be used to identify the markup.

The consuming app needs to ensure that the `id` is unique.

```jsx
import { Serialiser, HydrationData } from '@financial-times/x-interaction';
import { LiveBlogWrapper } from '@financial-times/x-live-blog-wrapper';

const serialiser = new Serialiser();

<LiveBlogWrapper articleUrl="https://www.ft.com/content/live_blog_package_uuid"
    showShareButtons={true}
    id="live-blog-wrapper"
    posts={posts}
    serialiser={serialiser} />
<HydrationData serialiser={serialiser} />
```

To hydrate this component at the client side, use `hydrate()` function provided by `x-interaction`.

```js
import { hydrate } from '@financial-times/x-interaction'

hydrate()
```

### Inserting posts on the client side

When live updates come in you can insert a new post by dispatching an action to the component's wrapper.

Client side:

```js
import { hydrate } from '@financial-times/x-interaction';

hydrate();

const wrapperElement = document.querySelector(
    `[data-live-blog-wrapper-id="x-dash-element-id"]`
);

const post = {
    id: '00000000-0000-0000-0000-000000000000',
    ...
};

const action = 'insert-post';
// wrapperElement must be the last argument.
const args = [
    post,
    wrapperElement
];

wrapperElement.dispatchEvent(
    new CustomEvent('x-interaction.trigger-action', {
        detail: { action, args },
        bubbles: true
    })
);
```

### Client side events

This component dispatches the following client side events to notify the consuming app about live updates. Consuming apps typically use these events to initialise Origami components on the newly rendered markup.

```jsx
<LiveBlogWrapper
  articleUrl="https://www.ft.com"
  showShareButtons={true}
  id="x-dash-element-id"
  posts={posts}
  serialiser={serialiser}
/>
```

```js
...

const wrapperElement = document.querySelector(
      `[data-live-blog-wrapper-id="x-dash-element-id"]`
);

wrapperElement.addEventListener('LiveBlogWrapper.INSERT_POST',
      (event) => {
            const { post } = event.detail;

            // post object contains data about a live blog post
            // post.id can be used to identify the newly rendered
            // LiveBlogPost element
      });
```

### Properties

| Feature            | Type    | Notes                                                                      |
| ------------------ | ------- | -------------------------------------------------------------------------- |
| `articleUrl`       | String  | URL of the live blog - used for sharing                                    |
| `showShareButtons` | Boolean | if `true` displays social media sharing buttons in posts                   |
| `posts`            | Array   | Array of live blog post data                                               |
| `id`               | String  | **(required)** Unique id used for identifying the element in the document. |
| `renderRichText`   | Component | A component to use for rendering structured content, e.g. `RichText` from `cp-content-pipeline-ui`. Required when rendering with data from `cp-content-pipeline-api`.

## Configuring the `next-live-event-api` endpoint URL.

If you want to configure the URL for `next-live-event-api`, add the following plugin in your Webpack configuration file:

```javascript
new webpack.DefinePlugin({
  LIVE_EVENT_API_URL: JSON.stringify('http://localhost:3003')
})
```
