# x-live-blog-post

This module displays a live blog post with title, body, timestamp and share buttons.


## Installation

This module is supported on Node 12 and is distributed on npm.

```bash
npm install --save @financial-times/x-live-blog-post
```

The [`x-engine`][engine] module is used to inject your chosen runtime into the component. Please read the `x-engine` documentation first if you are consuming `x-` components for the first time in your application.

[engine]: https://github.com/Financial-Times/x-dash/tree/HEAD/packages/x-engine


## Usage

The components provided by this module are all functions that expect a map of [properties](#properties). They can be used with vanilla JavaScript or JSX (If you are not familiar check out [WTF is JSX][jsx-wtf] first). For example if you were writing your application using React you could use the component like this:

```jsx
import React from 'react';
import { LiveBlogPost } from '@financial-times/x-live-blog-post';

// A == B == C
const a = LiveBlogPost(props);
const b = <LiveBlogPost {...props} />;
const c = React.createElement(LiveBlogPost, props);
```

All `x-` components are designed to be compatible with a variety of runtimes, not just React. Check out the [`x-engine`][engine] documentation for a list of recommended libraries and frameworks.

[jsx-wtf]: https://jasonformat.com/wtf-is-jsx/

### Properties

Deprecated properties should only be used when data comes from the Wordpress CMS.
Once we decommission live blogs powered by Wordpress these properties can be removed.

Feature             | Type   | Notes
--------------------|--------|----------------------------
`id`                | String | Unique id to reference the content
`postId`            | String | Deprecated - Unique id to reference the content
`title`             | String | Title of the content
`bodyHTML`          | String | Body of the content, if data is from next elasticsearch
`body`              | Object | Structured Body of the content, if data is from `cp-content-pipeline-api`
`byline`            | String or Object | Byline for the post, sometimes used to render the author's name. Will be an object if data is from `cp-content-pipeline-api`
| `renderRichText`  | Function | A component to use for rendering structured content, e.g. `RichText` from `cp-content-pipeline-ui`. Required when rendering with data from `cp-content-pipeline-api`.
`content`           | String | Deprecated - Body of the content
`isBreakingNews`    | Bool   | When `true` displays "breaking news" tag
`publishedDate`     | String | ISO timestamp of publish date
`publishedTimestamp`| String | Deprecated - ISO timestamp of publish date
`articleUrl`        | String | Url of the main article that includes this post
`showShareButtons`  | Bool   | default: `false` - Shows social media share buttons when `true`
`backToTop`                | String or Function   | Shows the back to top link at the bottom of posts and manages navigating to `selected top` with a javascript function or a hashed href (string). If this prop is a string it will rely on standard browser behaviour to navigate to the element `id` provided that represents the top. If this prop is a function then that function should control the experience of navigating/scrolling to the top position. When using a function please call event.preventDefault() at the top level.
