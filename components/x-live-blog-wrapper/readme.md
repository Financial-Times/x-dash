# x-liveblog-wrapper

This module displays a list of live blog posts using `x-live-blog-post` component. Also handles live updates on the live blog.   


## Installation

This module is compatible with Node 10+ and is distributed on npm.

```bash
npm install --save @financial-times/x-liveblog-wrapper
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
This component exports a function named `listenToLiveBlogEvents` which is used for listening to client side live blog updates. This function should be called after hydrating the component if it is rendered at the server side. 
```js
import { hydrate } from '@financial-times/x-interaction';
import { listenToLiveBlogEvents } from '@financial-times/x-live-blog-wrapper';

hydrate();
listenToLiveBlogEvents();
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
      `[data-x-dash-id="x-dash-element-id"]`
);

wrapperElement.addEventListener('LiveBlogWrapper.INSERT_POST', 
      (ev) => {
            const { post } = ev.detail;

            // post object contains data about a live blog post
            // post.postId can be used to identify the newly rendered
            // LiveBlogPost element
      });

document.addEventListener('LiveBlogWrapper.DELETE_POST', 
      (ev) => {
            const { postId } = ev.detail;

            // postId can be used to identify the deleted
            // LiveBlogPost element
      });

document.addEventListener('LiveBlogWrapper.UPDATE_POST', 
      (ev) => {
            const { post } = ev.detail;
      
            // post object contains data about a live blog post
            // post.postId can be used to identify the newly rendered
            // LiveBlogPost element
      });
```
### Properties

Feature          | Type   | Notes
-----------------|--------|----------------------------
`articleUrl`  | String | URL of the live blog - used for sharing
`showShareButtons`  | Boolean | if `true` displays social media sharing buttons in posts
`posts`  | Array | Array of live blog post data
