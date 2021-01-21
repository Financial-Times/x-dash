# x-live-blog-wrapper

This module displays a list of live blog posts using `x-live-blog-post` component. It also connects to an event stream which provides updates for the list. Based on these update events this component will add, remove and update `x-live-blog-post` components in the list.


## Installation

This module is supported on Node 12 and is distributed on npm.

```bash
npm install --save @financial-times/x-live-blog-wrapper
```

The [`x-engine`][engine] module is used to inject your chosen runtime into the component. Please read the `x-engine` documentation first if you are consuming `x-` components for the first time in your application.

[engine]: https://github.com/Financial-Times/x-dash/tree/master/packages/x-engine


## Usage

The components provided by this module are all functions that expect a map of [properties](#properties). They can be used with vanilla JavaScript or JSX (If you are not familiar check out [WTF is JSX][jsx-wtf] first). For example if you were writing your application using React you could use the component like this:

```jsx
import React from 'react';
import { LiveBlogWrapper } from '@financial-times/x-live-blog-wrapper';

// A == B == C
const a = LiveBlogWrapper(props);
const b = <LiveBlogWrapper {...props} />;
const c = React.createElement(LiveBlogWrapper, props);
```

All `x-` components are designed to be compatible with a variety of runtimes, not just React. Check out the [`x-engine`][engine] documentation for a list of recommended libraries and frameworks.

[jsx-wtf]: https://jasonformat.com/wtf-is-jsx/

### Client side rendering
This component can be used at the client side. To access the actions, a function needs to be passed into the actionsRef property of the LiveBlogWrapper element.

```jsx
import { LiveBlogWrapper } from '@financial-times/x-live-blog-wrapper';

const actionsRef = actions => {
    // Use actions to insert, update and delete live blog posts
};

<LiveBlogWrapper articleUrl="https://www.ft.com/content/live_blog_package_uuid"
    showShareButtons={true}
    id="live-blog-wrapper"
    posts={posts}
    actionsRef={actionsRef}
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
import { hydrate } from '@financial-times/x-interaction';

hydrate();
```

### Live updates
This component exports a function named `listenToLiveBlogEvents` which is used for listening to client side live blog updates. These updates come in the form of server sent events sent by `next-live-event-api`.

This function is used in slightly different ways when rendering the component at the client side vs rendering it at the server side.

#### Client side rendering
A reference to the actions object should be passed as an argument when calling this function for a client side rendered component.
```jsx
import { LiveBlogWrapper, listenToLiveBlogEvents } from '@financial-times/x-live-blog-wrapper';

const actionsRef = actions => {
    listenToLiveBlogEvents({
          liveBlogWrapperElementId: 'live-blog-wrapper',
          liveBlogPackageUuid: 'package-uuid',
          actions // for client side rendered component only
    });
};

<LiveBlogWrapper articleUrl="https://www.ft.com/content/live_blog_package_uuid"
    showShareButtons={true}
    id="live-blog-wrapper"
    posts={posts}
    actionsRef={actionsRef}
    />
```

#### Server side rendering
This function should be called after hydrating the component if it is rendered at the server side.

Server side:
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

Client side:
```js
import { hydrate } from '@financial-times/x-interaction';
import { listenToLiveBlogEvents } from '@financial-times/x-live-blog-wrapper';

hydrate();
listenToLiveBlogEvents({
      liveBlogWrapperElementId: 'live-blog-wrapper',
      liveBlogPackageUuid: 'package-uuid'
});
```

### Client side events
This component dispatches the following client side events to notify the consuming app about live updates. Consuming apps typically use these events to initialise Origami components on the newly rendered markup.
```jsx
<LiveBlogWrapper articleUrl="https://www.ft.com"
    showShareButtons={true}
    id="x-dash-element-id"
    posts={posts}
    serialiser={serialiser} />
```

```js
...

listenToLiveBlogEvents();

const wrapperElement = document.querySelector(
      `[data-live-blog-wrapper-id="x-dash-element-id"]`
);

wrapperElement.addEventListener('LiveBlogWrapper.INSERT_POST',
      (ev) => {
            const { post } = ev.detail;

            // post object contains data about a live blog post
            // post.postId can be used to identify the newly rendered
            // LiveBlogPost element
      });

### Properties

Feature          | Type   | Notes
-----------------|--------|----------------------------
`articleUrl`  | String | URL of the live blog - used for sharing
`showShareButtons`  | Boolean | if `true` displays social media sharing buttons in posts
`posts`  | Array | Array of live blog post data
`id` | String | **(required)** Unique id used for identifying the element in the document.


## Configuring the `next-live-event-api` endpoint URL.

If you want to configure the URL for `next-live-event-api`, add the following plugin in your Webpack configuration file:

```javascript
new webpack.DefinePlugin({
      LIVE_EVENT_API_URL: JSON.stringify('http://localhost:3003')
})
```